import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuizScreen1 from './QuizScreen1';
import QuizStep from './QuizStep';
import Loading from './Loading';
import { STEPS } from './quizConfig';
import sceneLoading from '../../assets/quiz/scene-loading.png';

const INTRO_STEP = 0;
const LOADING_STEP = STEPS.length + 1;

export default function Quiz() {
  const navigate = useNavigate();
  const [step, setStep] = useState(INTRO_STEP);
  const [answers, setAnswers] = useState({
    age: '',
    skin_type: null,
    concerns: [],
    budget: null,
    allergens: [],
    values: [],
    experience: null,
    conditions: [],
  });

  // Warm the browser cache with every illustration up front so navigating
  // between steps swaps the image instantly instead of fetching it late.
  useEffect(() => {
    [...STEPS.map((s) => s.scene), sceneLoading].forEach((src) => {
      if (src) {
        const img = new Image();
        img.src = src;
      }
    });
  }, []);

  function setAnswer(stepId, value) {
    setAnswers((prev) => ({ ...prev, [stepId]: value }));
  }

  function goNext() {
    if (step === INTRO_STEP) {
      setStep(1);
      return;
    }
    if (step >= STEPS.length) {
      // last step done → loading
      setStep(LOADING_STEP);
      return;
    }
    setStep((s) => s + 1);
  }

  function goBack() {
    if (step === INTRO_STEP) {
      navigate('/');
      return;
    }
    if (step === LOADING_STEP) return;
    if (step === 1) {
      setStep(INTRO_STEP);
      return;
    }
    setStep((s) => s - 1);
  }

  // Intro
  if (step === INTRO_STEP) {
    return <QuizScreen1 onNext={goNext} onBack={goBack} />;
  }

  // Loading + API call
  if (step === LOADING_STEP) {
    return <Loading answers={answers} />;
  }

  // Quiz steps 1..STEPS.length (index in STEPS is step - 1)
  const currentStep = STEPS[step - 1];
  if (!currentStep) return null;

  // Progress advances on every screen (including tip-only screens), so the
  // bar keeps moving even when the step isn't a counted question.
  const progressPct = (step / STEPS.length) * 100;

  return (
    <QuizStep
      step={currentStep}
      answer={answers[currentStep.id]}
      progressPct={progressPct}
      onChange={(value) => setAnswer(currentStep.id, value)}
      onNext={goNext}
      onBack={goBack}
    />
  );
}
