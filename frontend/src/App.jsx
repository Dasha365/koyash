import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LandingPage } from './pages/Landing/LandingPage'
import Quiz from './pages/Quiz'
import Results from './pages/Results'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </BrowserRouter>
  )
}