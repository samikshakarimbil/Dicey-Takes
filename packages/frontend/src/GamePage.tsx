import { useParams, Link } from "react-router-dom";
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

export default function GamePage(props: Readonly<IGameProps>) {
  const { gameName } = useParams<{ gameName: string }>();
  const game = props.games.find(
    (g) => g.title.toLowerCase() === gameName?.toLowerCase()
  );


  if (props.isLoading) return <p>Loading...</p>;
  if (props.hasError) return <p>Failed to load game.</p>;
  if (!game) return <h2>Game not found</h2>;

  console.log(game.image);

  
  return (
    <div>
      <Header />

      <div className="topsection">
        <Link to="/">
          <ArrowBackIcon />
        </Link>
        <Link to="/review">
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
                <p>{game.averageRating ?? "No rating yet"}</p>
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
        {game.reviews.length === 0 ? (
          <p>No reviews yet</p>
        ) : (
          game.reviews.map((r: any, i: number) => (
            <ReviewCard
              key={i}
              imageSrc={r.pfp}
              username={r.user}
              rating={r.rating}
              text={r.text}
            />
          ))
        )}
      </div>
    </div>
  );
}
