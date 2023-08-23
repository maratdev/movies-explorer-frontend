import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => (
  <nav className="NavBar">
    <Link className="NavBar__link" to="/signup">Регистрация</Link>
    <Link className="NavBar__link NavBar__link_btn" to="/signin">Войти</Link>
  </nav>
);

export default NavBar;
