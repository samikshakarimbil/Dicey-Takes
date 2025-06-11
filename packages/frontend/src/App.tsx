import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import GamePage from './GamePage';
import Profile from './Profile';
import ReviewForm from './ReviewForm'
import { useEffect, useState } from 'react';
import { ValidRoutes } from "../../backend/src/shared/ValidRoutes.ts";
import type { IApiGameData } from '../../backend/src/shared/ApiGameData.ts';

export default function App() {
  const [game, setGameData] = useState<IApiGameData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  function fetchGames() {
    setIsLoading(true);
    fetch("/api/games")
      .then((res) => res.json())
      .then((data) => {
        setGameData(data);
        setHasError(false);
      })
      .catch((err) => {
        setHasError(true);
        console.error("Failed to fetch games: ", err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  useEffect(() => {
    fetchGames();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path={ValidRoutes.HOME} 
          element={
            <HomePage 
              games={game}
              isLoading={isLoading}
              hasError={hasError}
              />} />
        <Route path="/game/:gameName" element={<GamePage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path={ValidRoutes.REVIEWS} element={<ReviewForm />} />
      </Routes>
    </Router>
  );
}
