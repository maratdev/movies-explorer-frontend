import { Link } from 'react-router-dom';
import './NavBarMovie.css';

const NavBarMovie = () => (
  <div className="NavBarMovie">
    <nav className="NavBarMovie__nav">
      <Link className="NavBarMovie__link NavBarMovie__active" to="#">Фильмы</Link>
      <Link className="NavBarMovie__link" to="/">Сохранённые фильмы</Link>
    </nav>
    <Link className="NavBarMovie__link NavBarMovie__btn" to="/">Аккаунт</Link>
  </div>
);

export default NavBarMovie;
