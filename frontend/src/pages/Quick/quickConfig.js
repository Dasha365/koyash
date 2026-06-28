import sceneAge from '../../assets/quiz/scene-age.png';
import sceneSkinType from '../../assets/quiz/scene-skin-type.png';
import sceneProblems from '../../assets/quiz/scene-problems.png';
import sceneBudget from '../../assets/quiz/scene-budget.png';
import sceneAllergens from '../../assets/quiz/scene-allergens.png';
import sceneImportance from '../../assets/quiz/scene-importance.png';
import sceneExperience from '../../assets/quiz/scene-experience.png';
import sceneIssues from '../../assets/quiz/scene-issues.png';
import decorCupLeaf from '../../assets/quiz/decor-cup-leaf.png';

export { buildRequest } from '../Quiz/quizConfig';

// Short quiz — Figma Prototype "Короткая анкета с картинками". Logo top-left,
// short helper text, no narrative/tip screens. Canvas 1307×738.

export const STEPS = [
  {
    id: 'age',
    type: 'input',
    questionStep: 1,
    question: 'Сколько тебе лет?',
    helper:
      'Возраст помогает учитывать разные задачи ухода. Есть уходовые средства для подростковой кожи, молодой кожи с акне, кожи с первыми возрастными изменениями и зрелой кожи.',
    placeholder: 'Введите возраст',
    scene: sceneAge,
    decor: [{ img: decorCupLeaf, x: 984, y: 398, w: 273, h: 324 }],
    fig: { scene: { x: 57, y: 67, w: 607, h: 607 }, head: { x: 637, y: 143, w: 420 }, helper: { x: 637, y: 217, w: 546 }, input: { x: 637, y: 398, w: 441 }, back: { x: 53, y: 650 }, next: { x: 637, y: 650 } },
  },
  {
    id: 'skin_type',
    type: 'single',
    questionStep: 2,
    question: 'Какая у тебя кожа?',
    helper:
      'Это самое важное, что я о тебе узнаю. Для жирной кожи нужны одни средства, для сухой — совсем другие. Если не уверена — выбери «Не знаю».',
    options: [
      { label: 'Жирная — блестит, поры заметны', value: 'oily' },
      { label: 'Сухая — бывает стянутость, шелушение', value: 'dry' },
      { label: 'Комбинированная — Т-зона жирная, щёки сухие', value: 'combination' },
      { label: 'Нормальная — в целом всё хорошо', value: 'normal' },
      { label: 'Чувствительная — легко реагирует на новые средства', value: 'sensitive' },
      { label: 'Не знаю — не уверена', value: 'unknown' },
    ],
    scene: sceneSkinType,
    fig: { scene: { x: 666, y: 67, w: 579, h: 579 }, head: { x: 58, y: 149, w: 560 }, helper: { x: 58, y: 256, w: 600 }, opts: { x: 64, y: 385, rowGap: 27 }, back: { x: 58, y: 610 }, next: { x: 635, y: 610 } },
  },
  {
    id: 'concerns',
    type: 'multi',
    max: 3,
    questionStep: 3,
    question: 'Выбери до трёх:',
    helper:
      'У каждой кожи свои потребности. Этот вопрос помогает понять, на какие задачи стоит обратить особое внимание при подборе ухода и какие средства могут быть наиболее полезны именно сейчас.',
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
    fig: { scene: { x: 711, y: 45, w: 543, h: 543 }, head: { x: 71, y: 179, w: 420 }, helper: { x: 71, y: 269, w: 660 }, opts: { x: 71, y: 416, rowGap: 47, cols: 2, col2x: 389 }, back: { x: 79, y: 650 }, next: { x: 557, y: 650 } },
  },
  {
    id: 'budget',
    type: 'single',
    questionStep: 4,
    question: 'На сколько ориентируемся?',
    helper:
      'Бюджет помогает подобрать средства, которые будут комфортны не только для кожи, но и для кошелька. Мы ориентируемся на примерную стоимость полного набора ухода, которого обычно хватает на 2–3 месяца.',
    options: [
      { label: 'До 3 500 ₽ — бюджетно и практично', value: 'low' },
      { label: '3 500 – 8 000 ₽ — средний сегмент', value: 'mid' },
      { label: 'От 8 000 ₽ — готова к более дорогим средствам', value: 'high' },
    ],
    scene: sceneBudget,
    fig: { scene: { x: 695, y: 133, w: 548, h: 548 }, head: { x: 71, y: 168, w: 654 }, helper: { x: 71, y: 290, w: 701 }, opts: { x: 71, y: 444, rowGap: 38 }, back: { x: 90, y: 650 }, next: { x: 444, y: 650 } },
  },
  {
    id: 'allergens',
    type: 'multi',
    questionStep: 5,
    question: 'Есть что-то, чего точно стоит избегать?',
    helper:
      'Некоторые компоненты подходят не всем. Этот вопрос помогает исключить средства с ингредиентами, которых вы предпочитаете избегать, и сделать рекомендации более комфортными для вас.',
    options: [
      { label: 'Отдушки', value: 'fragrance' },
      { label: 'Спирт в составе', value: 'alcohol' },
      { label: 'Силиконы', value: 'silicone' },
      { label: 'Кислоты (AHA/BHA)', value: 'acid' },
      { label: 'Нет, аллергий нет', value: null },
    ],
    scene: sceneAllergens,
    fig: { scene: { x: 766, y: 192, w: 466, h: 466 }, head: { x: 77, y: 165, w: 817 }, helper: { x: 77, y: 252, w: 700 }, opts: { x: 77, y: 400, rowGap: 40 }, back: { x: 85, y: 650 }, next: { x: 432, y: 650 } },
  },
  {
    id: 'values',
    type: 'multi',
    questionStep: 6,
    question: 'Что важно при выборе?',
    subQuestion: '(можно несколько)',
    helper:
      'У каждого свои предпочтения в уходе. Кто-то выбирает только самое необходимое, кому-то важно, чтобы средства были веганскими или не тестировались на животных. Эти ответы помогают подобрать рекомендации, которые будут ближе именно вам.',
    options: [
      { label: 'Минимализм — только самое основное', value: 'minimalism' },
      { label: 'Веган', value: 'vegan' },
      { label: 'Без тестов на животных', value: 'cruelty_free' },
      { label: 'Ничего из перечисленного', value: null },
    ],
    scene: sceneImportance,
    fig: { scene: { x: 707, y: 145, w: 550, h: 550 }, head: { x: 77, y: 163, w: 817 }, helper: { x: 77, y: 255, w: 791 }, opts: { x: 77, y: 410, rowGap: 47 }, back: { x: 77, y: 650 }, next: { x: 427, y: 650 } },
  },
  {
    id: 'experience',
    type: 'single',
    questionStep: 7,
    question: 'Как давно занимаешься уходом?',
    helper:
      'Опыт в уходе у всех разный. Кто-то только начинает знакомиться со своей кожей, а кто-то уже хорошо ориентируется в средствах и составах. Этот вопрос помогает подобрать рекомендации и объяснения в комфортном для вас формате.',
    options: [
      { label: 'Недавно начала — базовый уход или почти ничего', value: 'beginner' },
      { label: 'Уже разбираюсь — есть основной уход', value: 'intermediate' },
      { label: 'Давно и осознанно — читаю составы, знаю о чём к чему', value: 'expert' },
    ],
    scene: sceneExperience,
    fig: { scene: { x: 722, y: 108, w: 599, h: 599 }, head: { x: 72, y: 188, w: 660 }, helper: { x: 77, y: 287, w: 791 }, opts: { x: 77, y: 427, rowGap: 38 }, back: { x: 86, y: 642 }, next: { x: 478, y: 642 } },
  },
  {
    id: 'conditions',
    type: 'multi',
    questionStep: 8,
    question: 'Есть ли что-то из этого?',
    helper:
      'Некоторые состояния кожи и особенности организма могут влиять на выбор ухода. Эта информация помогает нам исключить неподходящие компоненты и подобрать рекомендации более бережно.',
    options: [
      { label: 'Беременность или кормление', value: 'pregnancy' },
      { label: 'Розацеа или купероз', value: 'rosacea' },
      { label: 'Дерматит или псориаз', value: 'dermatitis' },
      { label: 'Ничего из перечисленного', value: null },
    ],
    scene: sceneIssues,
    fig: { scene: { x: 618, y: 65, w: 633, h: 633 }, head: { x: 77, y: 120, w: 660 }, helper: { x: 77, y: 215, w: 659 }, opts: { x: 70, y: 367, rowGap: 47 }, back: { x: 72, y: 614 }, next: { x: 449, y: 614 } },
  },
];

export const TOTAL_QUESTION_STEPS = STEPS.filter((s) => s.questionStep).length;
