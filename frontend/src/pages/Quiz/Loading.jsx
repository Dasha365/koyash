import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Loading.css';
import Stage from './Stage';
import logo from '../../assets/landing/logo.png';
import sceneLoading from '../../assets/quiz/scene-loading.png';
import { buildRequest } from './quizConfig';

const LOADING_STEPS = [
  'Смотрю, что подойдёт именно тебе...',
  'Проверяю составы...',
  'Убираю лишнее...',
  'Собираю косметичку...',
  'Почти готово, солнышко...',
];

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export default function Loading({ answers }) {
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(0);
  const [progress, setProgress] = useState(8);

  useEffect(() => {
    LOADING_STEPS.forEach((_, i) => {
      setTimeout(() => {
        setVisibleCount(i + 1);
        setProgress(Math.round(((i + 1) / LOADING_STEPS.length) * 80) + 8);
      }, i * 650);
    });

    const request = buildRequest(answers);
    fetch(`${API_URL}/recommend`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    })
      .then((res) => {
        if (!res.ok) {
          if (res.status === 422) {
            return res.json().then((data) => {
              if (data?.detail?.error?.code === 'NO_PRODUCTS_AVAILABLE') return { noResults: true };
              throw new Error('API error');
            });
          }
          throw new Error('API error');
        }
        return res.json();
      })
      .then((data) => {
        setProgress(100);
        setTimeout(() => navigate('/results', { state: { results: data, answers } }), 550);
      })
      .catch(() => navigate('/results', { state: { error: true, answers } }));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Stage>
      <div className="loadRoot">
        <img className="loadLogo" src={logo} alt="Koyash" />
        <div className="loadTrack" />
        <div className="loadFill" style={{ width: `${(progress / 100) * 1307}px` }} />

        <span className="loadNote">Солнце собирает твои ответы в маленькие подсказки.</span>
        <img className="loadScene" src={sceneLoading} alt="" aria-hidden="true" />
        <h1 className="loadTitle">Подбираю уход именно для тебя...</h1>

        <ul className="loadSteps">
          {LOADING_STEPS.map((text, i) => (
            <li
              key={i}
              className={`loadStep${i < visibleCount ? ' visible' : ''}${i < visibleCount - 1 ? ' done' : ''}`}
            >
              — {text}
            </li>
          ))}
        </ul>

        <div className="loadBarTrack">
          <div className="loadBarFill" style={{ width: `${(progress / 100) * 513}px` }} />
        </div>
        <span className="loadPercent">{progress}%</span>
      </div>
    </Stage>
  );
}
