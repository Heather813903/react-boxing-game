import { NavLink } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
        <h1 className="logo"> React Boxing </h1>
        <nav>
            <NavLink to="/" className="nav-link">
             Home 
             </NavLink>
            <NavLink to="/game" className="nav-link">
             Game
            </NavLink>
        </nav>
    </header>
  );
}

export default Header;
