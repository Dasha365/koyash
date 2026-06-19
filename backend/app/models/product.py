from typing import Optional, Literal
from pydantic import BaseModel, Field


class Product(BaseModel):
    id: str
    name: str
    brand: str
    price_rub: float
    segment: str  # low/mid/high — used for segment-floor filter and upgrade logic
    vegan: bool
    cruelty_free: str
    routine_step: str
    tier: str
    order_index: Optional[int] = None
    concerns_addressed: list[str] = []
    allergens_norm: list[str] = []
    link: Optional[str] = None
    image_url: Optional[str] = None
    main_actives_short: list[str] = []
    functional_category: str = ""  # used for justification, not in ProductOut


class Justification(BaseModel):
    role: str               # "Шаг 1 из 5 — Очищение" / "2–3 раза в неделю — Отшелушивание"
    what_it_does: list[str] # first 2–3 phrases from functional_category (before first "(")
    key_actives: list[str]  # first 2–3 names from main_actives_short, translated to RU
    why_for_you: list[str]  # concern matches + vegan/CF/allergen flags
    summary_ru: Optional[str] = None  # why_for_you joined into one ready-to-display RU sentence


class ProductOut(BaseModel):
    """Public-facing product. No internal fields; routine_step/order_index live here only."""
    id: str
    name: str
    brand: str
    price_rub: float
    segment: str
    link: Optional[str] = None
    image_url: Optional[str] = None
    routine_step: str
    tier: str
    order_index: Optional[int] = None
    frequency: str
    concerns_addressed: list[str] = []
    main_actives_short: list[str] = []


class RecommendRequest(BaseModel):
    budget: Literal["low", "mid", "high"]
    concerns: list[str] = Field(default_factory=list)
    vegan: bool = False
    cruelty_free: bool = False
    minimalism: bool = False
    allergens: list[str] = Field(default_factory=list)


class BagItem(BaseModel):
    product: ProductOut
    concern_match: int
    justification: Justification


class RecommendMeta(BaseModel):
    total_price_rub: float
    budget: str
    note: Optional[str] = None
    empty_steps: list[str] = []  # core steps with zero candidates in any segment


class RecommendResponse(BaseModel):
    bag: list[BagItem]
    meta: RecommendMeta


def doc_to_product(doc: dict) -> Product:
    doc["id"] = str(doc.pop("_id"))
    return Product(**doc)
