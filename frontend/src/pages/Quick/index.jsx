import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuickStep from './QuickStep';
import Loading from '../Quiz/Loading';
import { STEPS, TOTAL_QUESTION_STEPS } from './quickConfig';
import sceneLoading from '../../assets/quiz/scene-loading.png';

const LOADING_STEP = STEPS.length + 1;

export default function Quick() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    age: '', skin_type: null, concerns: [], budget: null,
    allergens: [], values: [], experience: null, conditions: [],
  });

  useEffect(() => {
    [...STEPS.map((s) => s.scene), sceneLoading].forEach((src) => {
      if (src) { const img = new Image(); img.src = src; }
    });
  }, []);

  const setAnswer = (id, v) => setAnswers((p) => ({ ...p, [id]: v }));

  function goNext() {
    if (step >= STEPS.length) { setStep(LOADING_STEP); return; }
    setStep((s) => s + 1);
  }
  function goBack() {
    if (step === LOADING_STEP) return;
    if (step === 1) { navigate('/'); return; }
    setStep((s) => s - 1);
  }

  if (step === LOADING_STEP) return <Loading answers={answers} />;

  const current = STEPS[step - 1];
  if (!current) return null;
  const reached = STEPS.slice(0, step).filter((s) => s.questionStep).length;
  const progressPct = (reached / TOTAL_QUESTION_STEPS) * 100;

  return (
    <QuickStep
      step={current}
      answer={answers[current.id]}
      progressPct={progressPct}
      onChange={(v) => setAnswer(current.id, v)}
      onNext={goNext}
      onBack={goBack}
    />
  );
}
