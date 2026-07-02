import { useLocation, useNavigate, Link } from 'react-router-dom';
import './Results.css';
import logo from '../../assets/landing/logo.png';
import heart from '../../assets/landing/heart.png';
import sceneLoading from '../../assets/quiz/scene-loading.png';

import bagCleanser from '../../assets/results/bag-cleanser.png';
import bagToner from '../../assets/results/bag-toner.png';
import bagSerum from '../../assets/results/bag-serum.png';
import bagCream from '../../assets/results/bag-cream.png';
import bagSpf from '../../assets/results/bag-spf.png';
import bagNightCream from '../../assets/results/bag-night-cream.png';
import bagNotFound from '../../assets/results/bag-not-found.png.png';

const STEP_IMG = {
  cleanse: bagCleanser,
  tone: bagToner,
  serum: bagSerum,
  moisturize: bagCream,
  spf: bagSpf,
  mask: bagNightCream,
  exfoliant: bagSerum,
};
const bagFor = (p) => (p.image_url ? p.image_url : STEP_IMG[p.routine_step] || bagNotFound);

// Russian step labels (capitalised + lowercase variant for the step line)
const STEP_RU = {
  cleanse: 'Очищение',
  tone: 'Тонизирование',
  serum: 'Сыворотка',
  moisturize: 'Увлажнение',
  spf: 'SPF-защита',
  exfoliant: 'Отшелушивание',
  mask: 'Маска',
};
const STEP_LOWER = {
  cleanse: 'очищение',
  tone: 'тонизирование',
  serum: 'сыворотка',
  moisturize: 'увлажнение',
  spf: 'SPF-защита',
  exfoliant: 'отшелушивание',
  mask: 'маска',
};

// Core: "Шаг 1 из 5 — очищение | Ежедневно". Occasional: "Маска | 1–2 раза в неделю".
function roleLine(p) {
  const step = p.routine_step;
  if (p.tier === 'core' && p.order_index != null) {
    return `Шаг ${p.order_index} из 5 — ${STEP_LOWER[step] || step} | ${p.frequency}`;
  }
  return `${STEP_RU[step] || step} | ${p.frequency}`;
}

const fmt = (n) => Number(n).toLocaleString('ru-RU');
const category = (j) => (j.what_it_does || []).join(' + ');

// backend links come without a scheme, e.g. "goldapple.ru/19000..."
function productHref(link) {
  if (!link) return null;
  return /^https?:\/\//i.test(link) ? link : `https://${link}`;
}

function NoResults({ onRetake }) {
  return (
    <div className="noResultsPage">
      <header className="nrHeader">
        <img className="nrLogo" src={logo} alt="Koyash" />
        <div className="nrBar" />
      </header>
      <img className="nrScene" src={sceneLoading} alt="" aria-hidden="true" />
      <div className="nrContent">
        <span className="nrNote">
          Я всё проверила, солнышко. Но точного совпадения пока не нашлось.
        </span>
        <h1 className="nrTitle">Ничего идеального не нашлось ♡</h1>
        <p className="nrText">
          По твоим ответам среди уходовой косметики не нашлось средств, которые подошли бы без
          компромиссов. Можно немного смягчить фильтры и попробовать снова.
        </p>
        <div className="nrActions">
          <button className="rBtnPrimary" type="button" onClick={onRetake}>
            Пройти заново
          </button>
          <Link to="/" className="rBtnGhost">
            Выйти
          </Link>
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product: p, justification: j }) {
  const href = productHref(p.link);
  return (
    <a
      className="rCard"
      href={href || undefined}
      target={href ? '_blank' : undefined}
      rel={href ? 'noopener noreferrer' : undefined}
    >
      <div className="rCardImg">
        <img src={bagFor(p)} alt="" />
      </div>
      <div className="rCardBody">
        <p className="rCardRole">{roleLine(p)}</p>
        <h3 className="rCardName">{p.name}</h3>
        <p className="rCardBrand">{p.brand}</p>
        <p className="rCardCategory">{category(j)}</p>
        {j.summary_ru && <p className="rCardWhy">{j.summary_ru}</p>}
        <div className="rCardFooter">
          <span className="rCardPrice">{fmt(p.price_rub)} ₽</span>
          {href && <span className="rCardLink">Перейти в магазин →</span>}
        </div>
      </div>
    </a>
  );
}

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const { results, error } = location.state || {};
  const handleRetake = () => navigate('/quiz');

  if (error || !results || results.noResults || !results.bag || results.bag.length === 0) {
    return <NoResults onRetake={handleRetake} />;
  }

  const { bag, meta } = results;

  return (
    <div className="rPage">
      {/* logo + full-width bar, same look as the quiz header */}
      <img className="rLogo" src={logo} alt="Koyash" />
      <div className="rTrack" />

      <div className="rWrap">
        <span className="rNote">Koyash кладёт перед тобой аккуратный листок с подборкой.</span>
        <p className="rNarrative">
          — Вот, солнышко. Это твоя косметичка. Я подобрала каждое средство под тебя — и сейчас
          объясню почему.
        </p>
        <h1 className="rTitle">
          Вот твоя косметичка
          <img className="rHeart" src={heart} alt="" aria-hidden="true" />
        </h1>

        <div className="rList">
          {bag.map((item) => (
            <ProductCard key={item.product.id} {...item} />
          ))}
        </div>

        <div className="rTotal">
          Сумма: <span className="sum">{fmt(meta.total_price_rub)} ₽</span>
        </div>
        <p className="rTotalNote">
          {'Цены ориентировочные и могут отличаться в магазине — актуальная цена по ссылке на товар.'}
        </p>
        {meta.note && <p className="rMetaNote">{meta.note}</p>}

        <div className="rActions">
          <button className="rBtnPrimary" type="button" onClick={handleRetake}>
            Пройти заново
          </button>
          <Link to="/" className="rBtnGhost">
            На главную
          </Link>
        </div>
      </div>
    </div>
  );
}
