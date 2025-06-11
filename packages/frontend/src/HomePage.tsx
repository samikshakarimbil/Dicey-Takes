import Header from "./Header";
import GameCard from "./GameCard";
import "./styles/tokens.css";
import "./styles/main.css";
import "./styles/home.css";
import type { IApiGameData } from "../../backend/src/shared/ApiGameData.ts";
import { Link } from "react-router-dom";

interface IGameProps {
  games: IApiGameData[];
  isLoading: boolean;
  hasError: boolean;
}

export default function HomePage(props: IGameProps) {
  if (props.isLoading) return <><p>Loading...</p></>;
  if (props.hasError) return <><p>Something went wrong.</p></>;
  const gameElements = props.games.map((game) => (
    <div key={game._id} className="games">
      <Link to={"/games/" + game.title}>
        <GameCard
          key={game._id}
          name={game.title}
          imageSrc={game.image}
          altText={game.title}
        />
      </Link>
    </div>
  ));
  return(
    <main>
      <Header/>
      <h2 className="titletext">Trending games</h2>
      <div className="games">{gameElements}</div>
    </main>
  );
}
