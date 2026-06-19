import './QuizScreen1.css';
import logo from '../../assets/quiz/logo.png';
import sceneOpening from '../../assets/quiz/scene-opening.png';
import decorLeaf from '../../assets/quiz/decor-leaf.png';
import heart from '../../assets/quiz/heart.png';

const title = `Ты заходишь в уютный дом.\nПахнет травяным чаем. В окно\nмягко заглядывает солнце.`;

const text = `— Заходи, солнышко. Садись поудобнее, чай уже тёплый.\n\nЯ давно наблюдаю, как кожа реагирует на уход, погоду,\nстресс и новые средства. И знаешь, что я заметила?\nЧасто люди тратят деньги не на плохую косметику, а\nпросто не на свою.\nНе потому что делают что-то неправильно. Просто коже\nнужно немного внимания — и понятный подбор.\nДавай посмотрим, что подойдёт именно тебе. Несколько\nвопросов — и готово.`;

export default function QuizScreen1({ onNext, onBack }) {
  return (
    <main className="viewport">
      <section className="screen" aria-label="Стартовая страница Koyash">
        <img className="logo" src={logo} alt="Koyash" />
        <div className="topLine" />

        <img
          className="openingScene"
          src={sceneOpening}
          alt="Уютное окно, чай и солнце"
        />

        <h1 className="title">{title}</h1>
        <img className="heart" src={heart} alt="" aria-hidden="true" />

        <p className="bodyText">{text}</p>
        <img className="leaf" src={decorLeaf} alt="" aria-hidden="true" />

        <button className="button buttonBack" type="button" onClick={onBack}>
          Назад
        </button>
        <button className="button buttonNext" type="button" onClick={onNext}>
          Присесть за стол →
        </button>
      </section>
    </main>
  );
}