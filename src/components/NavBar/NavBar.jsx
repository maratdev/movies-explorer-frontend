import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => (
  <nav className="NavBar">
    <Link className="NavBar__link" to="#">Регистрация</Link>
    <Link className="NavBar__link NavBar__link_btn" to="/">Войти</Link>
  </nav>
);

export default NavBar;
