import StarIcon from '@mui/icons-material/Star';
import Header from './Header';
import './styles/tokens.css';
import './styles/main.css';
import './styles/profile.css';

export default function Profile() {
  const likedGames = [
    './images/catan.jpg',
    './images/clue.jpg',
    './images/codenames.jpg',
    './images/monopoly.jpg',
  ];

  const reviews = [
    { game: 'Catan', rating: 5, text: 'Best game ever made' },
    { game: 'Snakes & Ladders', rating: 1, text: 'Worst game ever made' },
    { game: 'Uno', rating: 3, text: 'Okayest game ever made' },
  ];

  return (
    <>
      <Header />

      <div className="profile-container">
        <div className="profilecard">
          <img src="./images/pfp.jpg" alt="Profile picture" className="pfp" />
          <h2 className="display-name">Sammy</h2>
          <p className="username">@gamelover3000</p>
        </div>

        <div className="profilemain">
          <div className="section">
            <h3 className="section-title">Liked</h3>
            <div className="liked">
              {likedGames.map((src, i) => (
                <img key={i} src={src} alt="Liked game" className="likedgame" />
              ))}
            </div>
          </div>

          <div className="reviews">
            <h3>Reviews</h3>
            {reviews.map((review, i) => (
              <div key={i} className="review">
                <img src="/images/pfp.jpg" alt="Reviewer profile" />
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
        </div>
      </div>
    </>
  );
}
