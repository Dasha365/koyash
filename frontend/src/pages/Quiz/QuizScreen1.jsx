import './QuizScreen1.css';
import Stage from './Stage';
import logo from '../../assets/landing/logo.png';
import sceneOpening from '../../assets/quiz/scene-opening.png';
import decorLeaf from '../../assets/quiz/decor-leaf.png';
import heart from '../../assets/landing/heart.png';

const title = 'Ты заходишь в уютный дом. Пахнет травяным чаем. В окно мягко заглядывает солнце.';
const text = `— Заходи, солнышко. Садись поудобнее, чай уже тёплый.

Я давно наблюдаю, как кожа реагирует на уход, погоду, стресс и новые средства. И знаешь, что я заметила? Часто люди тратят деньги не на плохую косметику, а просто не на свою.
Не потому что делают что-то неправильно. Просто коже нужно немного внимания — и понятный подбор.
Давай посмотрим, что подойдёт именно тебе. Несколько вопросов — и готово.`;

export default function QuizScreen1({ onNext, onBack }) {
  return (
    <Stage>
      <div className="introRoot">
        <img className="introLogo" src={logo} alt="Koyash" />
        <div className="introTrack" />
        <img className="introScene" src={sceneOpening} alt="" aria-hidden="true" />
        <img className="introLeaf" src={decorLeaf} alt="" aria-hidden="true" />
        <h1 className="introTitle">{title}</h1>
        <img className="introHeart" src={heart} alt="" aria-hidden="true" />
        <p className="introBody">{text}</p>
        <button className="introBtn introBack" type="button" onClick={onBack}>
          Назад
        </button>
        <button className="introBtn introNext" type="button" onClick={onNext}>
          Присесть за стол →
        </button>
      </div>
    </Stage>
  );
}
