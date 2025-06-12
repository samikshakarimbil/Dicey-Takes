import StarIcon from "@mui/icons-material/Star";
import Header from "./Header";
import "./styles/tokens.css";
import "./styles/main.css";
import "./styles/review.css";

export default function Profile() {
  const reviews = [
    { game: "Catan", rating: 5, text: "Best game ever made" },
    { game: "Snakes & Ladders", rating: 1, text: "Worst game ever made" },
    { game: "Uno", rating: 3, text: "Okayest game ever made" },
  ];

  return (
    <>
      <Header />
      <div className="reviews">
        <h3 className="titleText">Your Reviews</h3>
        {reviews.map((review, i) => (
          <div key={i} className="review">
            <p className="username">{review.game}</p>
            <div className="star-rating">
              {Array.from({ length: review.rating }).map((_, idx) => (
                <StarIcon key={idx} />
              ))}
            </div>
            <p>{review.text}</p>
          </div>
        ))}
      </div>
    </>
  );
}
