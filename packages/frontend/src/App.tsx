import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import HomePage from "./HomePage";
import GamePage from "./GamePage";
import Profile from "./Profile";
import { LoginPage } from "./LoginPage.tsx";
import ReviewForm from "./ReviewForm";
import { ValidRoutes } from "../../backend/src/shared/ValidRoutes.ts";
import type { IApiGameData } from "../../backend/src/shared/ApiGameData.ts";
import { ProtectedRoute } from "./ProtectedRoutes.tsx";

function App() {
  const [game, setGameData] = useState<IApiGameData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [token, setToken] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === ValidRoutes.HOME && token) {
      fetchGames(token);
    }
  }, [location.pathname, token]);

  function fetchGames(authToken: string) {
    setIsLoading(true);
    fetch("/api/games", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Unauthorized or other fetch error");
        }
        return res.json();
      })
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
      });
  }

  function handleSetToken(newToken: string) {
    setToken(newToken);
    fetchGames(newToken);
    navigate("/");
  }

  return (
    <Routes>
      <Route
        path={ValidRoutes.HOME}
        element={
          <ProtectedRoute authToken={token}>
            <HomePage games={game} isLoading={isLoading} hasError={hasError} />
          </ProtectedRoute>
        }
      />

      <Route
        path={ValidRoutes.LOGIN}
        element={<LoginPage isRegistering={false} addToken={handleSetToken} />}
      />
      <Route
        path={ValidRoutes.REGISTER}
        element={<LoginPage isRegistering={true} addToken={handleSetToken} />}
      />

      <Route
        path={`${ValidRoutes.GAME}/:gameName`}
        element={
          <ProtectedRoute authToken={token}>
            <GamePage games={game} 
              isLoading={isLoading} 
              hasError={hasError} 
              token={token}
              />
          </ProtectedRoute>
        }
      />

      <Route
        path={ValidRoutes.PROFILE}
        element={
          <ProtectedRoute authToken={token}>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path={`${ValidRoutes.REVIEW}/:gameName`}
        element={
          <ProtectedRoute authToken={token}>
            <ReviewForm token={token} />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
