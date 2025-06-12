import StarIcon from '@mui/icons-material/Star';
import './styles/review.css'

type ReviewCardProps = {
  username: string;
  rating: number;
  text: string;
};

export default function ReviewCard({ username, rating, text }: ReviewCardProps) {
  return (
    <div className="review">
      <p className="username">{username}</p>
      <div className="star-rating">
        {Array.from({ length: rating }).map((_, i) => (
          <StarIcon key={i} />
        ))}
      </div>
      <p className="reviewText">{text}</p>
    </div>
  );
}
