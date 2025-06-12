import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./styles/review.css";
import { Rating } from "@mui/material";

interface ReviewFormProps {
  token: string;
}

export default function ReviewPage(props: ReviewFormProps) {
  const navigate = useNavigate();
  const { gameName } = useParams<{ gameName: string }>();

  const [rating, setRating] = useState<number | null>(0);
  const [reviewText, setReviewText] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!rating || !reviewText || !gameName) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      console.log(gameName);
      const response = await fetch(
        `/api/${encodeURIComponent(gameName)}/review`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${props.token}`,
          },
          body: JSON.stringify({
            rating,
            text: reviewText,
          }),
        }
      );
      

      if (!response.ok) {
        throw new Error("Failed to submit review");
      }

      navigate(`/game/${gameName}`);
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review.");
    }
  };

  return (
    <div className="review-container">
      <form onSubmit={handleSubmit}>
        <h2>Write a review for {gameName}</h2>

        <div className="rating-box">
          <h3 className="title">Your Rating</h3>
          <Rating
            name="rating"
            value={rating}
            onChange={(_, value) => setRating(value)}
            precision={1}
            size="large"
          />
        </div>

        <div className="review-area">
          <h3 className="title">Your Review</h3>
          <textarea
            placeholder="Enter review..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            required
          />
        </div>

        <div className="buttons">
          <button type="submit" className="btn-submit">
            Submit Review
          </button>
          <button
            type="button"
            className="btn-cancel"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
