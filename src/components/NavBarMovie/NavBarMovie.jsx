import { Link } from 'react-router-dom';
import MobileMenu from '../MobileMenu/MobileMenu.jsx';
import './NavBarMovie.css';

const NavBarMovie = () => (
  <>
    <div className="NavBarMovie">
      <nav className="NavBarMovie__nav">
        <Link className="NavBarMovie__link NavBarMovie__active" to="/movies">Фильмы</Link>
        <Link className="NavBarMovie__link" to="/saved-movies">Сохранённые фильмы</Link>
      </nav>
      <Link className="NavBarMovie__link NavBarMovie__btn" to="/profile">Аккаунт</Link>
    </div>
    <MobileMenu/>
  </>
);

export default NavBarMovie;
