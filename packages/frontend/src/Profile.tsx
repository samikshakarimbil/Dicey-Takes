import { useEffect, useState } from "react";
import Header from "./Header";
import StarIcon from "@mui/icons-material/Star";
import "./styles/tokens.css";
import "./styles/main.css";
import "./styles/review.css";

interface Review {
  user: string;
  game: string;
  rating: number;
  text: string;
  date: string;
}

interface ProfileProps {
  token: string;
}

export default function Profile({ token }: Readonly<ProfileProps>) {
   const [reviews, setReviews] = useState<Review[]>([]);
   const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserReviews() {
      try {
        const res = await fetch(`/api/reviews/me}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch reviews");
        const data = await res.json();
        setReviews(data);
      } catch (err) {
        console.error("Error loading reviews:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchUserReviews();
  }, []);

  

  return (
    <>
      <Header />
      <div className="reviews">
        <h3 className="titleText">Your Reviews</h3>
        {loading ? (
          <p>Loading reviews...</p>
        ) : reviews.length === 0 ? (
          <p>You haven’t written any reviews yet.</p>
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
              <p className="reviewDate">{new Date(review.date).toLocaleDateString()}</p>
            </div>
          ))
        )}
      </div>
    </>
  );
}
