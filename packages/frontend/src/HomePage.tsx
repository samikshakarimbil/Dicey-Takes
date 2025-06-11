import Header from './Header';
import GameCard from './GameCard';
import './styles/tokens.css';
import './styles/main.css';
import './styles/home.css';

export default function HomePage() {
  const games = [
    { name: 'Catan', image: '/images/catan.jpg', alt: 'Catan box art', link: '/game/catan' },
    { name: 'Clue', image: '/images/Clue.jpg', alt: 'Clue box art', link: '/game/clue' },
    { name: 'Codenames', image: '/images/codenames.jpg', alt: 'Codenames box art', link: '/game/codenames' },
    { name: 'Monopoly', image: '/images/monopoly.jpg', alt: 'Monopoly box art', link: '/game/monopoly' },
  ];

  return (
    <div>
      <Header />
      <h2 className="titletext">Trending Games</h2>
      <div className="games">
        {games.map((game) => (
          <GameCard
            key={game.name}
            name={game.name}
            imageSrc={game.image}
            altText={game.alt}
            link={game.link}
          />
        ))}
      </div>
    </div>
  );
}
