import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/review.css";

interface Review {
  game: string;
  rating: number;
  text: string;
  user: string;
}

export default function ReviewPage() {
  const navigate = useNavigate();
  const [gameName, setGameName] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const handleSubmit = () => {
    if (!gameName || !rating || !reviewText) {
      alert("Please fill in all fields.");
      return;
    }

    const newReview: Review = {
      game: gameName,
      rating,
      text: reviewText,
      user: "mockUser3000", // Replace with actual user from login if needed
    };

    const existingReviews = JSON.parse(localStorage.getItem("reviews") || "[]");
    const updatedReviews = [...existingReviews, newReview];

    localStorage.setItem("reviews", JSON.stringify(updatedReviews));
    navigate("/");
  };

  return (
    <div className="review-container">
      <h2>Write a Review</h2>

      <div className="game-entry">
        <h3 className="title">Game</h3>
        <input
          placeholder="Enter name of game"
          value={gameName}
          onChange={(e) => setGameName(e.target.value)}
        />
      </div>

      <div className="rating-box">
        <h3 className="title">Your Rating</h3>
        <div className="star-rating">
          {[5, 4, 3, 2, 1].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: (hoverRating || rating) >= star ? "gold" : "gray",
                fontSize: "2rem",
              }}
              aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      <div className="review-area">
        <h3 className="title">Your Review</h3>
        <textarea
          placeholder="Enter review..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />
      </div>

      <div className="buttons">
        <button className="btn-submit" onClick={handleSubmit}>
          Submit
        </button>
        <button className="btn-cancel" onClick={() => navigate("/")}>
          Cancel
        </button>
      </div>
    </div>
  );
}
