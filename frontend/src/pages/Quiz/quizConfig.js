import sceneAge from '../../assets/quiz/scene-age.png';
import sceneSkinType from '../../assets/quiz/scene-skin-type.png';
import sceneSpf from '../../assets/quiz/scene-spf.png';
import sceneIssues from '../../assets/quiz/scene-issues.png';
import sceneBudget from '../../assets/quiz/scene-budget.png';
import sceneCleanser from '../../assets/quiz/scene-cleanser.png';
import sceneAllergens from '../../assets/quiz/scene-allergens.png';
import sceneImportance from '../../assets/quiz/scene-importance.png';
import sceneActives from '../../assets/quiz/scene-actives.png';
import sceneProblems from '../../assets/quiz/scene-problems.png';
import sceneExperience from '../../assets/quiz/scene-experience.png';
import decorCupLeaf from '../../assets/quiz/decor-cup-leaf.png';

// Main "story" quiz — Figma Prototype ("История"). Canvas 1307×738 (≈16:9),
// small logo top-left on every screen, note shown as a #f8e1c0 pill, tip
// highlight on the advice.png card. `fig` = exact Figma pixel geometry.

export const STEPS = [
  {
    id: 'age',
    type: 'input',
    questionStep: 1,
    note: 'Солнечный луч скользит по чашке с чаем.',
    noteBody:
      '— Большинство людей начинают замечать изменения кожи после 33. Но сам процесс начинается гораздо раньше: кожа постепенно медленнее восстанавливается и удерживает влагу. Поэтому возраст помогает мне понять, на какие механизмы стоит обратить внимание в первую очередь.',
    question: 'Сколько тебе лет?',
    placeholder: 'Введите возраст',
    scene: sceneAge,
    decor: [{ img: decorCupLeaf, x: 1037, y: 430, w: 220, h: 261 }],
    fig: {
      scene: { x: 57, y: 67, w: 607, h: 607 },
      notePill: { x: 637, y: 103, w: 425 }, narr: { x: 637, y: 185, w: 546 },
      head: { x: 637, y: 377, w: 420 }, input: { x: 637, y: 466, w: 441 },
      back: { x: 69, y: 627 }, next: { x: 653, y: 627 },
    },
  },
  {
    id: 'skin_type',
    type: 'single',
    questionStep: 2,
    note: 'Солнце подсвечивает маленькое зеркало на столе.',
    noteBody:
      '— Жирная кожа может быть обезвоженной, а сухая — одновременно чувствительной. Поэтому по ощущениям не всегда понятно, что ей действительно нужно. Чтобы не гадать и не советовать универсальные средства, сначала определим твой тип кожи.',
    question: 'Какая у тебя кожа?',
    options: [
      { label: 'Жирная — блестит, поры заметны', value: 'oily' },
      { label: 'Сухая — бывает стянутость, шелушение', value: 'dry' },
      { label: 'Комбинированная — Т-зона жирная, щёки сухие', value: 'combination' },
      { label: 'Нормальная — в целом всё хорошо', value: 'normal' },
      { label: 'Чувствительная — легко реагирует на новые средства', value: 'sensitive' },
      { label: 'Не знаю — не уверена', value: 'unknown' },
    ],
    scene: sceneSkinType,
    fig: {
      scene: { x: 610, y: 68, w: 644, h: 644 },
      notePill: { x: 56, y: 122, w: 507 }, narr: { x: 56, y: 195, w: 659 },
      head: { x: 71, y: 330, w: 460 },
      opts: { x: 71, y: 416, rowGap: 27 },
      back: { x: 60, y: 647 }, next: { x: 637, y: 647 },
    },
  },
  {
    id: 'tip_spf',
    type: 'tip',
    noteLabel: 'Вот тебе интересный факт',
    title: 'SPF — каждый день',
    body: 'Даже если за окном облачно, ультрафиолет всё равно влияет на кожу. Крем с SPF 30–50 помогает защищать кожу от фотостарения, пигментации и поддерживать ровный тон.',
    highlight: 'Наноси SPF последним шагом утреннего ухода',
    scene: sceneSpf,
    fig: {
      scene: { x: 50, y: 129, w: 571, h: 571 },
      notePill: { x: 637, y: 181, w: 334 },
      title: { x: 639, y: 255, w: 420 }, heart: { x: 928, y: 225, w: 100 }, body: { x: 639, y: 340, w: 546 },
      advice: { x: 621, y: 439, w: 599, h: 162 }, highlight: { x: 661, y: 470, w: 540 },
      back: { x: 69, y: 659 }, next: { x: 637, y: 659 },
    },
  },
  {
    id: 'concerns',
    type: 'multi',
    max: 3,
    questionStep: 3,
    note: 'Солнечный луч листает открытую тетрадь с заметками.',
    noteBody:
      'У каждой кожи свои потребности. Этот вопрос помогает понять, на какие задачи стоит обратить особое внимание при подборе ухода и какие средства могут быть наиболее полезны именно сейчас.',
    question: 'Выбери до трёх:',
    options: [
      { label: 'Акне и высыпания', value: 'acne' },
      { label: 'Морщины и потеря упругости', value: 'aging' },
      { label: 'Жирный блеск', value: 'oiliness' },
      { label: 'Пигментация и неровный тон', value: 'pigmentation' },
      { label: 'Сухость и шелушение', value: 'dryness' },
      { label: 'Чувствительность и покраснения', value: 'sensitivity' },
      { label: 'Расширенные поры', value: 'pores' },
      { label: 'Ничего конкретного — просто хочу базовый уход', value: null },
    ],
    scene: sceneProblems,
    fig: {
      scene: { x: 714, y: 62, w: 543, h: 543 },
      notePill: { x: 58, y: 162, w: 607 }, narr: { x: 71, y: 217, w: 660 },
      head: { x: 71, y: 360, w: 420 },
      opts: { x: 77, y: 442, rowGap: 47, cols: 2, col2x: 395 },
      back: { x: 79, y: 650 }, next: { x: 557, y: 650 },
    },
  },
  {
    id: 'budget',
    type: 'single',
    questionStep: 4,
    note: 'Солнце мягко освещает стол, чашку и аккуратно разложенные баночки.',
    noteBody:
      '— Любопытно, что стоимость средства часто определяется не ингредиентами, а упаковкой, маркетингом и брендом. Один и тот же актив может встречаться и в обычном креме, и в люксовом. Поэтому бюджет помогает мне сузить поиск, а не оценить качество ухода.',
    question: 'На сколько ориентируемся?',
    options: [
      { label: 'Бюджетно · до 1 000 ₽/шт · набор ≈ 4 000 ₽', value: 'low' },
      { label: 'Средний · 1 000–3 000 ₽/шт · набор ≈ 9 000 ₽', value: 'mid' },
      { label: 'Премиум · от 3 000 ₽/шт · набор ≈ от 12 000 ₽', value: 'high' },
    ],
    scene: sceneBudget,
    fig: {
      scene: { x: 676, y: 144, w: 548, h: 548 },
      notePill: { x: 71, y: 169, w: 705 }, narr: { x: 81, y: 236, w: 701 },
      head: { x: 71, y: 375, w: 654 },
      opts: { x: 90, y: 483, rowGap: 38 },
      back: { x: 90, y: 650 }, next: { x: 444, y: 650 },
    },
  },
  {
    id: 'tip_cleanser',
    type: 'tip',
    noteLabel: 'Вот тебе ещё один полезный совет',
    title: 'Очищение без скраба',
    body: 'Слишком агрессивное очищение может нарушить защитный барьер кожи. Лучше выбирать мягкие средства, которые убирают загрязнения, но не оставляют ощущения стянутости.',
    highlight: 'Если после умывания хочется срочно нанести крем — очищение, скорее всего, слишком жёсткое',
    scene: sceneCleanser,
    fig: {
      scene: { x: 626, y: 61, w: 593, h: 593 },
      notePill: { x: 60, y: 176, w: 381 },
      title: { x: 59, y: 250, w: 560 }, heart: { x: 388, y: 220, w: 100 }, body: { x: 59, y: 317, w: 600 },
      advice: { x: 16, y: 408, w: 661, h: 179 }, highlight: { x: 60, y: 445, w: 560 },
      back: { x: 80, y: 650 }, next: { x: 449, y: 650 },
    },
  },
  {
    id: 'allergens',
    type: 'multi',
    questionStep: 5,
    note: 'Солнце медленно просматривает список ингредиентов в тетради.',
    noteBody:
      '— Большинство нежелательных реакций вызывает не сам уход, а отдельные компоненты в составе. Причём чувствительность может появиться даже к тому, что человек раньше спокойно использовал годами. Поэтому этот вопрос важно не пропустить.',
    question: 'Есть что-то, чего точно стоит избегать?',
    options: [
      { label: 'Отдушки', value: 'fragrance' },
      { label: 'Спирт в составе', value: 'alcohol' },
      { label: 'Силиконы', value: 'silicone' },
      { label: 'Кислоты (AHA/BHA)', value: 'acid' },
      { label: 'Нет, аллергий нет', value: null },
    ],
    scene: sceneAllergens,
    fig: {
      scene: { x: 770, y: 226, w: 487, h: 487 },
      notePill: { x: 50, y: 162, w: 580 }, narr: { x: 71, y: 210, w: 640 },
      head: { x: 71, y: 320, w: 820 },
      opts: { x: 77, y: 405, rowGap: 40 },
      back: { x: 85, y: 650 }, next: { x: 432, y: 650 },
    },
  },
  {
    id: 'values',
    type: 'multi',
    questionStep: 6,
    note: 'На столе появляются разные баночки — минималистичные и не очень.',
    noteBody:
      '— Исследования показывают, что люди гораздо реже пропускают уход, если он состоит из небольшого количества простых шагов. Поэтому минимализм в уходе — это не лень, а то, к чему действительно стоит стремиться.',
    question: 'Что важно при выборе?',
    subQuestion: '(можно несколько)',
    options: [
      { label: 'Минимализм — только самое основное', value: 'minimalism' },
      { label: 'Веган', value: 'vegan' },
      { label: 'Без тестов на животных', value: 'cruelty_free' },
      { label: 'Ничего из перечисленного', value: null },
    ],
    scene: sceneImportance,
    fig: {
      scene: { x: 707, y: 135, w: 550, h: 550 },
      notePill: { x: 56, y: 162, w: 724 }, narr: { x: 71, y: 217, w: 745 },
      head: { x: 71, y: 323, w: 820 },
      opts: { x: 77, y: 410, rowGap: 47 },
      back: { x: 77, y: 650 }, next: { x: 427, y: 650 },
    },
  },
  {
    id: 'tip_actives',
    type: 'tip',
    noteLabel: 'Ещё один полезный совет по уходу',
    title: 'Активы — постепенно',
    body: 'Ретинол, кислоты и витамин С лучше вводить не все сразу. Начинай с одного активного средства, используй его 2–3 раза в неделю и наблюдай за реакцией кожи.',
    highlight: 'Новые средства лучше тестировать по одному —\nтак легче понять, что действительно подходит',
    scene: sceneActives,
    fig: {
      scene: { x: 50, y: 137, w: 558, h: 558 },
      notePill: { x: 637, y: 181, w: 334 },
      title: { x: 639, y: 255, w: 420 }, heart: { x: 962, y: 225, w: 100 }, body: { x: 639, y: 340, w: 546 },
      advice: { x: 601, y: 433, w: 636, h: 172 }, highlight: { x: 653, y: 465, w: 540 },
      back: { x: 81, y: 650 }, next: { x: 637, y: 650 },
    },
  },
  {
    id: 'experience',
    type: 'single',
    questionStep: 7,
    note: 'Солнечные лучи падают на полку с аккуратно расставленными баночками.',
    noteBody:
      '— Некоторые ингредиенты работают по принципу тренировки: например, к ретинолу или кислотам нужно время, чтобы привыкнуть. Поэтому один и тот же уход может быть отличным выбором для опытного человека и слишком активным для новичка.',
    question: 'Как давно занимаешься уходом?',
    options: [
      { label: 'Недавно начала — базовый уход или почти ничего', value: 'beginner' },
      { label: 'Уже разбираюсь — есть основной уход', value: 'intermediate' },
      { label: 'Давно и осознанно — читаю составы, знаю о чём к чему', value: 'expert' },
    ],
    scene: sceneExperience,
    fig: {
      scene: { x: 730, y: 139, w: 565, h: 565 },
      notePill: { x: 62, y: 130, w: 765 }, narr: { x: 62, y: 205, w: 760 },
      head: { x: 71, y: 346, w: 660 },
      opts: { x: 77, y: 450, rowGap: 38 },
      back: { x: 86, y: 642 }, next: { x: 478, y: 642 },
    },
  },
  {
    id: 'conditions',
    type: 'multi',
    questionStep: 8,
    note: 'koyash становится мягче и внимательнее, будто приглушает свет.',
    noteBody:
      '— И последнее. Иногда коже нужен особый подход, и тогда я должна быть осторожнее в рекомендациях.',
    question: 'Есть ли что-то из этого?',
    options: [
      { label: 'Беременность или кормление', value: 'pregnancy' },
      { label: 'Розацеа или купероз', value: 'rosacea' },
      { label: 'Дерматит или псориаз', value: 'dermatitis' },
      { label: 'Ничего из перечисленного', value: null },
    ],
    scene: sceneIssues,
    fig: {
      scene: { x: 608, y: 86, w: 633, h: 633 },
      notePill: { x: 62, y: 162, w: 665 }, narr: { x: 71, y: 217, w: 659 },
      head: { x: 71, y: 346, w: 660 },
      opts: { x: 77, y: 436, rowGap: 47 },
      back: { x: 77, y: 650 }, next: { x: 454, y: 650 },
    },
  },
];

export const TOTAL_QUESTION_STEPS = STEPS.filter((s) => s.questionStep).length;

// ── request building ──────────────────────────────────────────────────────
const CONCERN_MAP = { pores: 'oiliness' };
const ALLERGEN_TOKENS = {
  fragrance: ['Fragrance'],
  alcohol: ['Alcohol', 'Alcohol Denat.', 'Benzyl Alcohol', 'Dichlorobenzyl Alcohol', 't-Butyl Alcohol'],
  silicone: [
    'Silicones', 'Dimethicone', 'Cyclopentasiloxane', 'Cyclotetrasiloxane',
    'Vinyl Dimethicone', 'Methyl Trimethicone', 'Caprylyl Methicone', 'Phenyl Trimethicone',
  ],
  acid: ['AHA+BHA', 'Glycolic Acid', 'Lactic Acid', 'Salicylic Acid', 'Mandelic Acid', 'Capryloyl Salicylic Acid'],
};

export function buildRequest(answers) {
  const concerns = [...new Set((answers.concerns || []).filter(Boolean).map((c) => CONCERN_MAP[c] || c))];
  const allergens = [...new Set((answers.allergens || []).filter(Boolean).flatMap((a) => ALLERGEN_TOKENS[a] || [a]))];
  const values = answers.values || [];
  const skinType = answers.skin_type && answers.skin_type !== 'unknown' ? answers.skin_type : null;
  return {
    budget: answers.budget || 'low',
    concerns,
    vegan: values.includes('vegan'),
    cruelty_free: values.includes('cruelty_free'),
    minimalism: values.includes('minimalism'),
    allergens,
    skin_type: skinType,
  };
}
