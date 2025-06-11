import DarkModeToggle from "./DarkModeSwitch";
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header>
      <h1>Dicey Takes</h1>
      <DarkModeToggle/>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>
      </nav>
    </header>
  );
}
