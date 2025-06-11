import StarIcon from '@mui/icons-material/Star';
import './styles/game.css'

type ReviewCardProps = {
  imageSrc: string;
  username: string;
  rating: number;
  text: string;
};

export default function ReviewCard({ imageSrc, username, rating, text }: ReviewCardProps) {
  return (
    <div className="review">
      <img src={imageSrc} alt="" />
      <p className="username">{username}</p>
      <div className="star-rating">
        {Array.from({ length: rating }).map((_, i) => (
          <StarIcon key={i} />
        ))}
      </div>
      <p>{text}</p>
    </div>
  );
}
