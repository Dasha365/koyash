import { useState } from 'react';

import styles from './QuizScreen2.module.css';

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
      <label className={styles.option} key={option}>
        <input
          className={styles.optionInput}
          type="checkbox"
          checked={isChecked}
          onChange={() => handleOptionChange(option)}
        />
        <span className={styles.customCheckbox} aria-hidden="true" />
        <span className={styles.optionText}>{option}</span>
      </label>
    );
  };

  return (
    <main className={styles.viewport}>
      <section className={styles.screen} aria-label="Анкета Koyash">
        <img className={styles.logo} src={logo} alt="Koyash" />

        <div className={styles.topLineBase} />
        <img
          className={styles.topLineProgress}
          src={progressLine}
          alt=""
          aria-hidden="true"
        />

        <img
          className={styles.sceneProblems}
          src={sceneProblems}
          alt="Открытая тетрадка с заметками"
        />

        <p className={styles.noteText}>{noteText}</p>
        <p className={styles.bodyText}>{text}</p>
        <h1 className={styles.title}>{title}</h1>

        <div className={styles.optionsLeft}>{leftOptions.map(renderOption)}</div>
        <div className={styles.optionsRight}>{rightOptions.map(renderOption)}</div>

        <button
          className={`${styles.button} ${styles.buttonBack}`}
          type="button"
          onClick={onBack}
        >
          Назад
        </button>
        <button
          className={`${styles.button} ${styles.buttonNext}`}
          type="button"
          onClick={onNext}
        >
          Дальше →
        </button>
        <img className={styles.decorCloud} src={decorCloud} alt="" aria-hidden="true" />
      </section>
    </main>
  );
}
