import "./styles/game.css";
import "./styles/tokens.css";
import "./styles/main.css";
import "./styles/home.css";

type GameCardProps = {
  name: string;
  imageSrc: string;
  altText: string;
};

export default function GameCard({ name, imageSrc, altText }: GameCardProps) {
  return (
    <div className="game">
      <div className="img-wrapper">
        <img src={imageSrc} alt={altText} />
      </div>
      <p>{name}</p>
    </div>
  );
}
