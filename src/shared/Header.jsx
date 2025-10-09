import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
        <hi className="logo"> React Boxing Game</hi>
        <nav>
            <ul className="nav-links">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/game">Game</Link>
                </li>
            </ul>   
        </nav>
    </header>
  );
}

export default Header;
