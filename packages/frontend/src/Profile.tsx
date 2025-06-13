import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import StarIcon from "@mui/icons-material/Star";
import "./styles/tokens.css";
import "./styles/main.css";
import "./styles/review.css";

interface Review {
  _id?: string;
  user: string;
  game: string;
  rating: number;
  text: string;
}

interface ProfileProps {
  token: string;
}

export default function Profile({ token }: ProfileProps) {
  const { userId } = useParams<{ userId: string }>();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchReviews();
  }, [userId]);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch reviews");
      }

      const data = await response.json();
      setReviews(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="reviews">
        <h3 className="titleText">
          Your Reviews
        </h3>
        {loading ? (
          <p>Loading reviews...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : reviews.length === 0 ? (
          <p>You have not written any reviews yet.</p>
        ) : (
          reviews.map((review, i) => (
            <div key={i} className="review">
              <p className="username">
                <strong>{review.game}</strong>
              </p>
              <div className="star-rating">
                {Array.from({ length: review.rating }).map((_, idx) => (
                  <StarIcon key={idx} />
                ))}
              </div>
              <p className="reviewText">{review.text}</p>
              <p className="reviewDate">
              </p>
            </div>
          ))
        )}
      </div>
    </>
  );
}
