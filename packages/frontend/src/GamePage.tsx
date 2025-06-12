import { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import Header from "./Header";
import ReviewCard from "./ReviewCard";
import "./styles/tokens.css";
import "./styles/main.css";
import "./styles/game.css";
import type { IApiGameData } from "../../backend/src/shared/ApiGameData.ts";

// MUI icons
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import StarIcon from "@mui/icons-material/Star";
import GroupIcon from "@mui/icons-material/Group";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";

interface IGameProps {
  games: IApiGameData[];
  isLoading: boolean;
  hasError: boolean;
}

interface IReviewProps {
  user: string;
  rating: number;
  text: string;
  date: string;
}

export default function GamePage(props: Readonly<IGameProps>) {
  const { gameName } = useParams<{ gameName: string }>();
  const location = useLocation();
  const [reviews, setReviews] = useState<IReviewProps[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [currentGame, setCurrentGame] = useState<IApiGameData | null>(null);
  const [gameLoading, setGameLoading] = useState(false);
  
  const gameProps = props.games.find(
    (g) => g.title.toLowerCase() === gameName?.toLowerCase()
  );

  // Function to refetch current game data
  const refetchGameData = async () => {
    if (!gameName) return;
    
    setGameLoading(true);
    try {
      const res = await fetch(`/api/games`);
      if (!res.ok) throw new Error("Failed to fetch games");
      const allGames: IApiGameData[] = await res.json();
      const updatedGame = allGames.find(
        (g) => g.title.toLowerCase() === gameName.toLowerCase()
      );
      if (updatedGame) {
        setCurrentGame(updatedGame);
      }
    } catch (err) {
      console.error("Error refetching game data", err);
    } finally {
      setGameLoading(false);
    }
  };

  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await fetch(
          `/api/${encodeURIComponent(gameName!)}/reviews`
        );
        if (!res.ok) throw new Error("Failed to fetch reviews");
        const data = await res.json();
        setReviews(data);
      } catch (err) {
        console.error("Error loading reviews", err);
      } finally {
        setLoadingReviews(false);
      }
    }

    if (gameName) fetchReviews();
  }, [gameName, gameProps]);

  useEffect(() => {
    if (location.state?.reviewAdded) {
      refetchGameData();
      // Clear the state to prevent unnecessary refetches
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const game = currentGame || gameProps;

  if (props.isLoading) return <p>Loading...</p>;
  if (props.hasError) return <p>Failed to load game.</p>;
  if (!game) return <h2>Game not found</h2>;

  return (
    <div>
      <Header />

      <div className="topsection">
        <Link to="/">
          <ArrowBackIcon />
        </Link>
        <Link to={`/review/${encodeURIComponent(game.title)}`}>
          <button type="button">+ Review this game</button>
        </Link>
      </div>

      <div className="content">
        <div className="card">
          <h2>{game.title}</h2>
          <div className="desc">
            <div className="img-wrapper">
              <img src={game.image} alt={`Box art for ${game.title}`} />
            </div>
            <div className="desctext">
              <div className="desc-row">
                <StarIcon />
                <p>
                {gameLoading ? (
                    "Updating..."
                  ) : (
                    game.averageRating ?? "No rating yet"
                  )}
                  </p>
              </div>
              <div className="desc-row">
                <GroupIcon />
                <p>{game.players}</p>
              </div>
              <div className="desc-row">
                <AccessTimeIcon />
                <p>{game.playTime}</p>
              </div>
              <div className="desc-row">
                <PersonIcon />
                <p>{game.age}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h2>About</h2>
          <p>{game.description}</p>
        </div>
      </div>

      <div className="reviews">
        <h3>Reviews</h3>
        {loadingReviews ? (
          <p>Loading reviews...</p>
        ) : reviews.length === 0 ? (
          <p>No reviews yet</p>
        ) : (
          reviews.map((r, i) => (
            <ReviewCard
              key={i}
              username={r.user}
              rating={r.rating}
              text={r.text}
              imageSrc="/images/default.jpg"
            />
          ))
        )}
      </div>
    </div>
  );
}
