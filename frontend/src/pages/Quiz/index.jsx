import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import QuizScreen1 from './QuizScreen1';
import QuizScreen2 from './QuizScreen2';

export default function Quiz() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const goNext = () => setStep((s) => s + 1);

  const goBack = () => {
    if (step === 1) {
      navigate('/');
    } else {
      setStep((s) => s - 1);
    }
  };

  switch (step) {
    case 1:
      return <QuizScreen1 onNext={goNext} onBack={goBack} />;

    case 2:
      return <QuizScreen2 onNext={goNext} onBack={goBack} />;

    default:
      return <p>Следующий экран анкеты пока не готов</p>;
  }
}