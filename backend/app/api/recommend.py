from typing import Optional

from fastapi import APIRouter, HTTPException

from app.core.active_translations import translate_active
from app.core.database import get_database
from app.models.product import (
    BagItem,
    Justification,
    Product,
    ProductOut,
    RecommendMeta,
    RecommendRequest,
    RecommendResponse,
    doc_to_product,
)

router = APIRouter(tags=["recommend"])

# Segment search priority per requested budget: try the user's own segment
# first, then fall back to the nearest neighbour(s) on the low/mid/high scale.
# Explicit table (not arithmetic distance) so "mid" has an unambiguous order.
SEGMENT_PRIORITY: dict[str, list[str]] = {
    "low":  ["low", "mid", "high"],
    "mid":  ["mid", "low", "high"],
    "high": ["high", "mid", "low"],
}

CORE_STEPS = ["cleanse", "tone", "serum", "moisturize", "spf"]
OCCASIONAL_STEPS = ["exfoliant", "mask"]

# ---------------------------------------------------------------------------
# Justification dictionaries (§9)
# ---------------------------------------------------------------------------

STEP_ROLE_RU: dict[str, str] = {
    "cleanse":    "Очищение",
    "tone":       "Тонизирование",
    "serum":      "Сыворотка",
    "moisturize": "Увлажнение",
    "spf":        "SPF-защита",
    "exfoliant":  "Отшелушивание",
    "mask":       "Маска",
}

STEP_FREQUENCY: dict[str, str] = {
    "cleanse":    "Ежедневно",
    "tone":       "Ежедневно",
    "serum":      "Ежедневно",
    "moisturize": "Ежедневно",
    "spf":        "Ежедневно (утро)",
    "exfoliant":  "2–3 раза в неделю",
    "mask":       "1–2 раза в неделю",
}

CONCERN_PHRASE_RU: dict[str, str] = {
    "acne":         "Борется с акне и воспалениями",
    "oiliness":     "Контролирует жирность и матирует кожу",
    "pigmentation": "Осветляет пигментацию и выравнивает тон",
    "aging":        "Поддерживает упругость и снижает видимость морщин",
    "dryness":      "Обеспечивает интенсивное увлажнение",
    "sensitivity":  "Успокаивает и восстанавливает чувствительную кожу",
}

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------


def _concern_match(product: Product, concerns: set[str]) -> int:
    return len(set(product.concerns_addressed) & concerns)


def _to_out(p: Product) -> ProductOut:
    return ProductOut(
        id=p.id,
        name=p.name,
        brand=p.brand,
        price_rub=p.price_rub,
        segment=p.segment,
        link=p.link,
        image_url=p.image_url,
        routine_step=p.routine_step,
        tier=p.tier,
        order_index=p.order_index,
        frequency=STEP_FREQUENCY.get(p.routine_step, "По необходимости"),
        concerns_addressed=p.concerns_addressed,
        main_actives_short=[translate_active(a) for a in p.main_actives_short],
    )


def _build_justification(
    p: Product,
    concerns: set[str],
    req_vegan: bool,
    req_cruelty_free: bool,
    req_has_allergens: bool,
) -> Justification:
    step_name = STEP_ROLE_RU.get(p.routine_step, p.routine_step)
    if p.tier == "core" and p.order_index is not None:
        role = f"Шаг {p.order_index} из 5 — {step_name}"
    else:
        freq = STEP_FREQUENCY.get(p.routine_step, "По необходимости")
        role = f"{freq} — {step_name}"

    # what_it_does: comma-separated phrases from functional_category,
    # each trimmed at first "(" to strip concentration/detail notes
    what_it_does: list[str] = []
    for part in p.functional_category.split(","):
        phrase = part.split("(")[0].strip()
        if phrase:
            what_it_does.append(phrase)
    what_it_does = what_it_does[:3]

    key_actives = [translate_active(a) for a in p.main_actives_short[:3]]

    why: list[str] = []
    for concern in p.concerns_addressed:
        if concern in concerns and concern in CONCERN_PHRASE_RU:
            why.append(CONCERN_PHRASE_RU[concern])
    if req_vegan and p.vegan:
        why.append("Подходит для веганов")
    if req_cruelty_free and p.cruelty_free == "yes":
        why.append("Не тестируется на животных")
    if req_has_allergens:
        why.append("Без отмеченных тобой аллергенов")

    return Justification(
        role=role,
        what_it_does=what_it_does,
        key_actives=key_actives,
        why_for_you=why,
        summary_ru=". ".join(why) + "." if why else None,
    )


# ---------------------------------------------------------------------------
# Segment-aware step selection
# ---------------------------------------------------------------------------


def _pick_segment_candidates(
    pool: list[Product], step: str, tier: str, budget: str
) -> tuple[list[Product], Optional[str]]:
    """Search the requested segment first, then fall back to the nearest
    neighbour(s) per SEGMENT_PRIORITY.

    `pool` already has every hard filter applied (vegan, cruelty-free,
    allergens) before this runs, so falling back to another segment can
    never resurrect a product the user explicitly excluded — fallback only
    relaxes the segment, nothing else.
    """
    for segment in SEGMENT_PRIORITY[budget]:
        candidates = [
            p for p in pool
            if p.routine_step == step and p.tier == tier and p.segment == segment
        ]
        if candidates:
            return candidates, segment
    return [], None


def _apply_skin_preference(
    candidates: list[Product], skin_type: Optional[str]
) -> list[Product]:
    """Narrow an already segment- and hard-filtered candidate list to the most
    skin-appropriate tier:

      1. products tagged with the user's specific skin type, else
      2. products tagged "any".

    If neither exists, returns an empty list — the step is left empty rather
    than filled with a mismatched product (an empty basket then surfaces as
    "ничего не нашлось"). No effect when the user gave no skin type
    (None / "unknown"). This only narrows candidates that already passed the
    hard filters (vegan, cruelty-free, allergens) — those are never relaxed.
    """
    if not skin_type or skin_type == "unknown":
        return candidates
    specific = [p for p in candidates if skin_type in p.skintype]
    if specific:
        return specific
    return [p for p in candidates if "any" in p.skintype]


def _base_select(
    pool: list[Product], concerns: set[str], minimalism: bool, budget: str,
    skin_type: Optional[str] = None,
) -> tuple[list[Product], list[str], list[str]]:
    """Assemble the basket one routine step at a time.

    Returns (basket, missing_steps, substituted_steps). A step lands in at
    most one of missing_steps / substituted_steps: missing means no segment
    had a candidate at all (core steps only, same as before); substituted
    means a candidate was found, but not in the user's own requested segment.
    """
    basket: list[Product] = []
    missing: list[str] = []
    substituted: list[str] = []

    for step in CORE_STEPS:
        candidates, segment = _pick_segment_candidates(pool, step, "core", budget)
        # Skin-type preference applies *within* the found segment: keep the
        # user's own skin type, else "any". If nothing fits the skin type the
        # step is left empty (we don't fall back to a mismatched product).
        candidates = _apply_skin_preference(candidates, skin_type)
        if not candidates:
            missing.append(step)
            continue
        if segment != budget:
            substituted.append(step)

        # Ranking is orthogonal to the segment/skin fallback: within whichever
        # tier was found, sort by concern match first, price second.
        candidates.sort(key=lambda p: (-_concern_match(p, concerns), p.price_rub))

        if step == "serum" and len(concerns) >= 2 and len(candidates) >= 2:
            basket.extend(candidates[:2])
        else:
            basket.append(candidates[0])

    if not minimalism:
        for step in OCCASIONAL_STEPS:
            candidates, segment = _pick_segment_candidates(pool, step, "occasional", budget)
            candidates = _apply_skin_preference(candidates, skin_type)
            if not candidates:
                continue
            if segment != budget:
                substituted.append(step)

            candidates.sort(key=lambda p: (-_concern_match(p, concerns), p.price_rub))
            basket.append(candidates[0])

    return basket, missing, substituted


# ---------------------------------------------------------------------------
# Endpoint
# ---------------------------------------------------------------------------


@router.post("/recommend", response_model=RecommendResponse)
async def recommend(request: RecommendRequest):
    db = get_database()

    # Hard filters: vegan and cruelty-free (no segment filter here)
    query: dict = {}
    if request.vegan:
        query["vegan"] = True
    if request.cruelty_free:
        query["cruelty_free"] = "yes"  # "unknown" excluded per spec §4.3

    cursor = db["products"].find(query)
    all_products = [doc_to_product(doc) async for doc in cursor]

    # Allergen filter: case-insensitive, done in Python
    if request.allergens:
        allergens_lower = {a.lower() for a in request.allergens}
        pool = [
            p for p in all_products
            if not any(tok.lower() in allergens_lower for tok in p.allergens_norm)
        ]
    else:
        pool = all_products

    concerns_set = set(request.concerns)
    basket, missing_steps, substituted_steps = _base_select(
        pool, concerns_set, request.minimalism, request.budget, request.skin_type
    )

    if not basket:
        raise HTTPException(
            status_code=422,
            detail={
                "error": {
                    "code": "NO_PRODUCTS_AVAILABLE",
                    "message": "После применения фильтров не осталось товаров для формирования косметички.",
                }
            },
        )

    total = sum(p.price_rub for p in basket)
    notes: list[str] = []

    if missing_steps:
        missing_labels = ", ".join(STEP_ROLE_RU.get(s, s) for s in missing_steps)
        notes.append(f"Нет товаров для шагов: {missing_labels}")

    if substituted_steps:
        substituted_labels = ", ".join(STEP_ROLE_RU.get(s, s) for s in substituted_steps)
        notes.append(f"Шаги без точного совпадения по бюджету: {substituted_labels}")

    req_has_allergens = bool(request.allergens)

    bag: list[BagItem] = [
        BagItem(
            product=_to_out(p),
            concern_match=_concern_match(p, concerns_set),
            justification=_build_justification(
                p, concerns_set,
                request.vegan, request.cruelty_free, req_has_allergens,
            ),
        )
        for p in basket
    ]
    bag.sort(key=lambda item: (item.product.order_index is None, item.product.order_index or 0))

    return RecommendResponse(
        bag=bag,
        meta=RecommendMeta(
            total_price_rub=round(total, 2),
            budget=request.budget,
            note="; ".join(notes) if notes else None,
            empty_steps=missing_steps,
        ),
    )
