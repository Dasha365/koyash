import { useState } from 'react';

import logo from '../../assets/quiz/logo.png';
import progressLine from '../../assets/quiz/Line 3.png';
import decorCloud from '../../assets/quiz/decor-spot-cloud.png';
import sceneProblems from '../../assets/quiz/scene-problems.png';

const noteText = 'Солнечный луч ложится на открытую тетрадку с заметками.';

const text = `— Кожа редко решает проблемы по одной. Например, обезвоженность
может усиливать жирный блеск, а воспаление — делать поры заметнее.
Но если пытаться исправить всё сразу, уход часто становится слишком
агрессивным. Поэтому давай выберем задачи, которые важнее всего
именно сейчас.`;

const title = 'Выбери до трёх:';

const leftOptions = [
  'Акне и высыпания',
  'Жирный блеск',
  'Сухость и шелушение',
  'Расширенные поры',
];

const rightOptions = [
  'Морщины и потеря упругости',
  'Пигментация и неровный тон',
  'Чувствительность и покраснения',
  'Ничего конкретного — просто хочу базовый уход',
];

export default function QuizScreen2({ onNext, onBack }) {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionChange = (option) => {
    const isSelected = selectedOptions.includes(option);

    if (isSelected) {
      setSelectedOptions(
        selectedOptions.filter((selectedOption) => selectedOption !== option)
      );
      return;
    }

    if (selectedOptions.length < 3) {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const renderOption = (option) => {
    const isChecked = selectedOptions.includes(option);

    return (
      <label className="option" key={option}>
        <input
          className="optionInput"
          type="checkbox"
          checked={isChecked}
          onChange={() => handleOptionChange(option)}
        />
        <span className="customCheckbox" aria-hidden="true" />
        <span className="optionText">{option}</span>
      </label>
    );
  };

  return (
    <main className="viewport">
      <section className="screen" aria-label="Анкета Koyash">
        <img className="logo" src={logo} alt="Koyash" />

        <div className="topLineBase" />
        <img className="topLineProgress" src={progressLine} alt="" aria-hidden="true" />

        
        <img
          className="sceneProblems"
          src={sceneProblems}
          alt="Открытая тетрадка с заметками"
        />

        <p className="noteText">{noteText}</p>
        <p className="bodyText">{text}</p>
        <h1 className="title">{title}</h1>

        <div className="optionsLeft">{leftOptions.map(renderOption)}</div>
        <div className="optionsRight">{rightOptions.map(renderOption)}</div>

        <button className="button buttonBack" type="button" onClick={onBack}>
          Назад
        </button>
        <button className="button buttonNext" type="button" onClick={onNext}>
          Дальше →
        </button>
        <img className="decorCloud" src={decorCloud} alt="" aria-hidden="true" />
      </section>
    </main>
  );
}
