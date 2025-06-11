import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import GamePage from './GamePage';
import Profile from './Profile';
import ReviewForm from './ReviewForm'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/game/:gameName" element={<GamePage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/review" element={<ReviewForm />} />
      </Routes>
    </Router>
  );
}
