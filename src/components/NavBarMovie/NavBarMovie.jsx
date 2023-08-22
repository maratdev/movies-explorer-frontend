import { Link } from 'react-router-dom';
import MobileMenu from '../MobileMenu/MobileMenu.jsx';
import './NavBarMovie.css';

const NavBarMovie = () => (
  <>
    <div className="NavBarMovie">
      <nav className="NavBarMovie__nav">
        <Link className="NavBarMovie__link NavBarMovie__active" to="#">Фильмы</Link>
        <Link className="NavBarMovie__link" to="/">Сохранённые фильмы</Link>
      </nav>
      <Link className="NavBarMovie__link NavBarMovie__btn" to="/">Аккаунт</Link>
    </div>
    <MobileMenu/>
  </>
);

export default NavBarMovie;
