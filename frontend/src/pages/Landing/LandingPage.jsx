import './style.css';
import { Link } from 'react-router-dom';

export function LandingPage() {
  return (
    <main className="landing">
      <p>Лендинг в разработке</p>
      <Link to="/quiz" className="landing__cta">
        Пройти анкету →
      </Link>
    </main>
  );
}