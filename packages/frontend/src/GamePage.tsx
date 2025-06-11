import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Header from './Header';
import ReviewCard from './ReviewCard';
import './styles/tokens.css';
import './styles/main.css';
import './styles/game.css';

// MUI icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import StarIcon from '@mui/icons-material/Star';
import GroupIcon from '@mui/icons-material/Group';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';

interface Review {
  game: string;
  rating: number;
  text: string;
  user: string;
  pfp: string; //temp
}

export default function GamePage() {
  const { gameName } = useParams(); // assumes /game/:gameName route
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("reviews") || "[]");
    const filtered = stored.filter((r: Review) => r.game.toLowerCase() === gameName?.toLowerCase());
    setReviews(filtered);
  }, [gameName]);

  const gameInfo = {
    title: gameName || "Unknown Game",
    players: "3-4 Players",
    time: "60-120 minutes",
    age: "10+",
    rating: "8.7 average rating",
    image: `/images/${gameName?.toLowerCase()}.jpg`,
    description: `Description for ${gameName}`,
  };

  return (
    <div>
      <Header />

      <div className="topsection">
        <a href="/">
          <ArrowBackIcon />
        </a>
        <a href="/review">
          <button type="button">+ Review this game</button>
        </a>
      </div>

      <div className="content">
        <div className="card">
          <h2>{gameInfo.title}</h2>
          <div className="desc">
            <div className="img-wrapper">
              <img src={gameInfo.image} alt="Box art" />
            </div>
            <div className="desctext">
              <div className="desc-row">
                <StarIcon />
                <p>{gameInfo.rating}</p>
              </div>
              <div className="desc-row">
                <GroupIcon />
                <p>{gameInfo.players}</p>
              </div>
              <div className="desc-row">
                <AccessTimeIcon />
                <p>{gameInfo.time}</p>
              </div>
              <div className="desc-row">
                <PersonIcon />
                <p>{gameInfo.age}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h2>About</h2>
          <p>{gameInfo.description}</p>
        </div>
      </div>

      <div className="reviews">
        <h3>Reviews</h3>
        {reviews.length === 0 ? (
          <p>No reviews yet</p>
        ) : (
          reviews.map((r, i) => (
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
