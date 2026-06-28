import './style.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Stage from '../Quiz/Stage';

import logo from '../../assets/landing/logo.png';
import mascot from '../../assets/landing/maskot.png';
import heart from '../../assets/landing/heart.png';
import problemNote from '../../assets/landing/problem-caption-note.png';
import cloudNote from '../../assets/landing/decor-cloud-note.png';
import problemArrow from '../../assets/landing/problem-arrow.png';
import lineHeart from '../../assets/landing/line-heart.png';
import lineHeart2 from '../../assets/landing/line-heart-2.png';
import hLineLeft from '../../assets/landing/horizontal-line-left.png';
import hLineRight from '../../assets/landing/horizontal-line-right.png';
import decorCream from '../../assets/landing/decor-cream.png';
import smear from '../../assets/landing/smear.png';
import aLeft from '../../assets/landing/analysis-decor-left.png';
import aMid from '../../assets/landing/analysis-decor-middle.png';
import aRight from '../../assets/landing/analysis-decor-right.png';
import ssLeft from '../../assets/landing/smart-selection-icon-left.png';
import ssMid from '../../assets/landing/smart-selection-icon-middle.png.png';
import ssRight from '../../assets/landing/smart-selection-icon-right.png';
import tIndependent from '../../assets/landing/trust-icon-independent.png';
import tProcess from '../../assets/landing/trust-icon-process.png';
import tLogic from '../../assets/landing/trust-icon-logic.png';
import tRespect from '../../assets/landing/trust-icon-respect.png';
import step1 from '../../assets/landing/step-icon-1.png';
import step2 from '../../assets/landing/step-icon-2.png';
import step3 from '../../assets/landing/step-icon-3.png';
import trustSun from '../../assets/landing/trust-sun.png';
import imagePhotoroom from '../../assets/landing/advice copy.png';

const Img = ({ src, x, y, w, h, cls = '', reveal = true }) => (
  <img
    className={`lAbs ${reveal ? 'reveal' : ''} ${cls}`.trim()}
    src={src}
    alt=""
    aria-hidden="true"
    style={{ left: x, top: y, width: w, height: h }}
  />
);
const T = ({ x, y, w, cls = 'lBody', align = 'left', reveal = true, style, children }) => (
  <p
    className={`lAbs ${reveal ? 'reveal' : ''} ${cls}`.trim()}
    style={{ left: x, top: y, width: w, textAlign: align, ...style }}
  >
    {children}
  </p>
);
const Btn = ({ x, y, onClick, children }) => (
  <button type="button" className="lBtn reveal" style={{ left: x, top: y }} onClick={onClick}>
    {children}
  </button>
);

// Section title sitting on a smear: text is centered (H+V) over the brush.
const SmearTitle = ({ x, y, w, h, flip = false, children }) => (
  <>
    <img
      className={`lAbs lSmear reveal${flip ? ' lFlip' : ''}`}
      src={smear}
      alt=""
      aria-hidden="true"
      style={{ left: x, top: y, width: w, height: h }}
    />
    <div className="lAbs lSmearTitle reveal" style={{ left: x, top: y, width: w, height: h }}>
      {children}
    </div>
  </>
);

export function LandingPage() {
  const navigate = useNavigate();
  const story = () => navigate('/quiz');
  const quick = () => navigate('/quick');

  // Custom eased scroll — smoother and gentler than native smooth behaviour,
  // with a duration that scales a little with distance so long jumps don't
  // feel rushed. Respects prefers-reduced-motion.
  const scrollTo = (id) => () => {
    const el = document.getElementById(id);
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const targetY = el.getBoundingClientRect().top + window.scrollY - 24;
    if (reduce) {
      window.scrollTo(0, targetY);
      return;
    }

    const startY = window.scrollY;
    const dist = targetY - startY;
    const duration = Math.min(1400, Math.max(650, Math.abs(dist) * 0.5));
    const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    let start = null;
    const step = (ts) => {
      if (start === null) start = ts;
      const p = Math.min(1, (ts - start) / duration);
      window.scrollTo(0, startY + dist * easeInOutCubic(p));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  useEffect(() => {
    const els = document.querySelectorAll('.landingCanvas .reveal');
    const io = new IntersectionObserver(
      (e) =>
        e.forEach((x) => {
          if (x.isIntersecting) {
            x.target.classList.add('in');
            io.unobserve(x.target);
          }
        }),
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // The three upper "Подобрать уход" buttons scroll to the choice section
  // (story vs quick) instead of jumping straight into a quiz.
  const toChoice = scrollTo('choice');

  return (
    <Stage w={1633} h={5601} mode="page">
      <div className="landingCanvas">
        <span id="top" className="lAbs" style={{ left: 0, top: 0, width: 1, height: 1 }} />
        <span id="how" className="lAbs" style={{ left: 0, top: 3500, width: 1, height: 1 }} />
        <span id="trust" className="lAbs" style={{ left: 0, top: 4200, width: 1, height: 1 }} />

        {/* Header */}
        <Img src={logo} x={165} y={-13} w={233} h={194} reveal={false} />
        <button
          type="button"
          className="lAbs lNav"
          style={{ left: 492, top: 47 }}
          onClick={scrollTo('top')}
        >
          О нас
        </button>
        <button
          type="button"
          className="lAbs lNav"
          style={{ left: 614, top: 47 }}
          onClick={scrollTo('how')}
        >
          Как это работает?
        </button>
        <button
          type="button"
          className="lAbs lNav"
          style={{ left: 836, top: 47 }}
          onClick={scrollTo('trust')}
        >
          Забота и Доверие
        </button>
        <Btn x={1153} y={40} onClick={toChoice}>
          Подобрать уход
        </Btn>

        {/* Hero */}
        <Img src={mascot} x={881} y={104} w={575} h={575} cls="lFloat" />
        <Img src={heart} x={618} y={240} w={135} h={135} cls="lHeart" />
        <p className="lAbs reveal lHeroTitle" style={{ left: 191, top: 181, width: 510 }}>
          Косметика должна <span className="accent">служить тебе</span>,<br />а не ты — косметике
        </p>
        <p className="lAbs reveal lHeroBody" style={{ left: 191, top: 407, width: 500 }}>
          <b>Koyash</b> — твой личный эксперт по уходу за кожей. Мы подбираем средства из того, что
          уже есть на рынке, и объясняем, почему они подойдут именно тебе.
        </p>
        <Btn x={191} y={573} onClick={toChoice}>
          Подобрать уход
        </Btn>

        {/* Cloud / problem */}
        <Img src={cloudNote} x={195} y={745} w={532} h={389} />
        <Img src={problemArrow} x={712} y={735} w={230} h={230} cls="lFloat" />
        <Img src={problemNote} x={920} y={711} w={457} h={457} />
        {/* heart-lines: line-heart under the cloud (left), line-heart-2 under the parchment (right) */}
        <Img src={lineHeart} x={300} y={902} w={320} h={70} cls="lLine" reveal={false} />
        <Img src={lineHeart2} x={1018} y={860} w={280} h={64} cls="lLine" reveal={false} />
        <T x={320} y={858} w={280} cls="lNote" align="center">
          С уходом бывает непросто, солнышко
        </T>
        <T x={293} y={955} w={334} align="center">
          Среди сотен средств и советов легко запутаться и сложно понять, что действительно подходит
          твоей коже.
        </T>
        <T x={1013} y={820} w={291} cls="lNote" align="center">
          Koyash помогает выбрать уход спокойнее
        </T>
        <T x={1013} y={914} w={278} cls="lNoteScript" align="center">
          Мы учитываем особенности твоей кожи, бюджет и предпочтения, а затем подбираем уход и
          объясняем каждый выбор простыми словами.
        </T>
        <Img src={decorCream} x={1187} y={969} w={244} h={244} />

        {/* Мы подбираем уходовые средства */}
        <SmearTitle x={405} y={1252} w={800} h={135} flip={false}>
          Мы подбираем уходовые средства
        </SmearTitle>
        <Img src={aLeft} x={210} y={1466} w={279} h={222} />
        <Img src={aMid} x={660} y={1447} w={285} h={249} />
        <Img src={aRight} x={1175} y={1447} w={267} h={268} />
        {/* vertical dashed dividers between the three columns */}
        <span className="lVDash" style={{ left: 575, top: 1470, height: 320 }} />
        <span className="lVDash" style={{ left: 1060, top: 1470, height: 320 }} />
        <T x={198} y={1715} w={264} cls="lAnalysisCap" align="center">
          Анализируя кожу и её особенности
        </T>
        <T x={671} y={1715} w={264} cls="lAnalysisCap" align="center">
          Изучая состав средств
        </T>
        <T x={1175} y={1715} w={264} cls="lAnalysisCap" align="center">
          Объясняя каждый выбор подробно
        </T>
        {/* line assets flanking the centered button */}
        <Img src={hLineLeft} x={184} y={1879} w={439} h={70} cls="lLine" reveal={false} />
        <Img src={hLineRight} x={987} y={1865} w={422} h={84} cls="lLine" reveal={false} />
        <Btn x={668} y={1879} onClick={toChoice}>
          Подобрать уход
        </Btn>

        {/* Умный подбор */}
        <SmearTitle x={194} y={2061} w={1180} h={165} flip>
          Koyash — это не просто нейросеть, а умный подбор ухода
        </SmearTitle>
        <Img src={ssLeft} x={206} y={2213} w={289} h={289} />
        <Img src={ssMid} x={656} y={2216} w={290} h={290} />
        <Img src={ssRight} x={1093} y={2225} w={289} h={289} />
        <T x={194} y={2491} w={314} cls="lCardTitle" align="center">
          Простые вопросы вместо сложных запросов
        </T>
        <T x={652} y={2492} w={314} cls="lCardTitle" align="center">
          Реальные средства вместо случайных рекомендаций
        </T>
        <T x={1098} y={2491} w={314} cls="lCardTitle" align="center">
          Обоснования вместо «просто попробуй»
        </T>
        <T x={182} y={2577} w={337} align="center">
          Не нужно подбирать формулировки для нейросети. Бережно проведём тебя через подбор шаг за
          шагом.
        </T>
        <T x={639} y={2577} w={337} align="center">
          Мы подбираем уход из существующих продуктов и исключаем варианты, которые тебе не
          подходят.
        </T>
        <T x={1086} y={2577} w={337} align="center">
          Каждая рекомендация сопровождается объяснением: зачем это средство нужно именно тебе.
        </T>

        {/* Без лишней сложности */}
        <SmearTitle x={182} y={2753} w={1210} h={175} flip={false}>
          Koyash помогает собрать уход без лишней сложности
        </SmearTitle>
        <Img src={tIndependent} x={141} y={3010} w={216} h={216} />
        <Img src={tProcess} x={835} y={2991} w={216} h={216} />
        <T x={370} y={3028} w={420} cls="lCardTitle">
          Независимый подбор
        </T>
        <T x={1074} y={3033} w={420} cls="lCardTitle">
          Спокойный процесс
        </T>
        <T x={370} y={3074} w={337}>
          Koyash не создаёт косметику и не привязан к одному бренду. Для нас важнее подобрать уход,
          который будет подходящим именно для твоей кожи.
        </T>
        <T x={1074} y={3086} w={358}>
          Подбор идёт шаг за шагом, без длинных форм и спешки. Мы задаём один вопрос за раз, чтобы
          тебе было легко, понятно и комфортно.
        </T>
        <Img src={tLogic} x={141} y={3200} w={239} h={239} />
        <Img src={tRespect} x={822} y={3200} w={239} h={239} />
        <T x={370} y={3243} w={420} cls="lCardTitle">
          Понятная логика
        </T>
        <T x={1070} y={3243} w={420} cls="lCardTitle">
          Уважение к условиям
        </T>
        <T x={370} y={3293} w={360}>
          К каждому средству есть спокойное объяснение: зачем оно в подборке, чем может быть полезно
          для кожи и как его лучше встроить в ежедневный уход.
        </T>
        <T x={1069} y={3296} w={368}>
          Koyash учитывает бюджет, аллергии, этические предпочтения и другие параметры, которые
          важны при выборе ухода.
        </T>

        {/* Как работает */}
        <SmearTitle x={207} y={3553} w={1160} h={135} flip>
          {'Как работает?\nОт нескольких ответов к понятному уходу'}
        </SmearTitle>
        <Img src={step1} x={245} y={3751} w={126} h={126} cls="lFloat" />
        <Img src={step2} x={708} y={3746} w={134} h={134} cls="lFloat" />
        <Img src={step3} x={1175} y={3740} w={148} h={148} cls="lFloat" />
        <T x={170} y={3880} w={300} cls="lCardTitleLg" align="center">
          Ты проходишь подбор
        </T>
        <T x={626} y={3882} w={304} cls="lCardTitleLg" align="center">
          Koyash отбирает средства
        </T>
        <T x={1093} y={3885} w={318} cls="lCardTitleLg" align="center">
          Ты получаешь косметичку
        </T>
        <T x={198} y={3943} w={232} align="center">
          Несколько вопросов о коже, аллергиях, бюджете и предпочтениях.
        </T>
        <T x={643} y={3943} w={288} align="center">
          Проанализируем ответы и оставим только те средства, которые тебе подходят.
        </T>
        <T x={1108} y={3943} w={289} align="center">
          Персональная подборка с объяснениями: зачем это нужно и как использовать.
        </T>

        {/* Почему доверять */}
        <SmearTitle x={304} y={4175} w={1020} h={132} flip>
          Почему Koyash можно доверять?
        </SmearTitle>
        <Img src={trustSun} x={174} y={4342} w={144} h={155} />
        <Img src={trustSun} x={825} y={4342} w={144} h={155} />
        <T x={318} y={4364} w={420} cls="lCardTitleLg">
          Мы не производим косметику
        </T>
        <T x={992} y={4364} w={420} cls="lCardTitleLg">
          Каждый выбор объясняется
        </T>
        <T x={318} y={4423} w={399}>
          Мы не ограничиваемся одним брендом, что позволяет выбирать уход, соответствующий твоей
          коже, а не определённой марке.
        </T>
        <T x={992} y={4423} w={475}>
          Мы не просто рекомендуем средства. Для каждого ты увидишь понятное объяснение, почему оно
          оказалось в подборке и какую задачу помогает решить.
        </T>
        <Img src={trustSun} x={166} y={4560} w={144} h={155} />
        <Img src={trustSun} x={825} y={4560} w={144} h={155} />
        <T x={322} y={4591} w={400} cls="lCardTitleLg">
          Учитываем ваши ограничения
        </T>
        <T x={992} y={4591} w={490} cls="lCardTitleLg">
          Рекомендации остаются осторожными
        </T>
        <T x={322} y={4643} w={394}>
          Бюджет, аллергии, предпочтения и этические параметры становятся частью подбора.
          Рекомендации остаются осторожными.
        </T>
        <T x={991} y={4643} w={476}>
          Koyash не обещает медицинского результата и не заменяет консультацию дерматолога. При
          кожных заболеваниях лучше обратиться к специалисту.
        </T>

        {/* CTA «Войти в историю» / «Быстрый подбор» — scroll target for the
            three upper "Подобрать уход" buttons. Offset a bit above so the
            heading isn't glued to the top edge. */}
        <span id="choice" className="lAbs" style={{ left: 0, top: 4700, width: 1, height: 1 }} />
        <Img src={imagePhotoroom} x={121} y={4752} w={1418} h={384} reveal={false} />
        <T x={219} y={4858} w={600} cls="lCardTitleLg">
          Окунись в мир ухода вместе с Koyash
        </T>
        <T x={219} y={4898} w={1111}>
          Нажми сюда, если хочешь войти в историю мира уходовой косметики вместе с Koyash и готова
          уделить чуть больше времени, чтобы познакомиться со своей кожей поближе.
        </T>
        <Btn x={219} y={4977} onClick={story}>
          Войти в историю
        </Btn>

        {/* Быстрый подбор */}
        <T x={219} y={5102} w={400} cls="lCardTitleLg">
          Быстрый подбор
        </T>
        <T x={219} y={5141} w={606}>
          Нажми сюда, если чувствуешь себя уверенно в мире ухода и готова сразу перейти к подбору
          средств.
        </T>
        <Btn x={218} y={5215} onClick={quick}>
          Подобрать уход
        </Btn>

        {/* Disclaimer */}
        <T x={219} y={5322} w={720} cls="lCardTitle">
          Koyash не делает медицинских заявлений об излечении
        </T>
        <T x={219} y={5364} w={971} style={{ fontSize: 16 }}>
          Рекомендации носят информационный характер и не являются медицинской консультацией; перед
          применением новых средств рекомендуется патч-тест; при кожных заболеваниях — консультация
          дерматолога.
        </T>

        {/* Footer */}
        <div className="lFootLine" style={{ top: 5490 }} />
        <Img src={logo} x={121} y={5501} w={108} h={90} reveal={false} />
        <T x={537} y={5532} w={560} cls="lFooter" align="center" reveal={false}>
          © 2026 Koyash. Персональный подбор косметики.
        </T>
        <span
          className="lAbs lFooter"
          style={{ left: 1407, top: 5526, width: 119, textAlign: 'center', cursor: 'pointer' }}
        >
          Контакты
        </span>
      </div>
    </Stage>
  );
}

export default LandingPage;
