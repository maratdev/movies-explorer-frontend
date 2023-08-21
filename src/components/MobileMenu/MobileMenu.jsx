import { Link } from 'react-router-dom';
import { useState } from 'react';
import './MobileMenu.css';

const MobileMenu = () => {
  const [checked, setChecked] = useState(false);
  return (
    <>
      <div className="MobileMenu">
        <button className={`MobileMenu__mobile-btn ${checked && 'active'}`} onClick={() => setChecked(!checked)}>
          <span></span>
        </button>
        <div className="MobileMenu__wrap">
          <nav className="MobileMenu__nav">
            <ul className="MobileMenu__list">
              <li className="MobileMenu__item"><Link className="MobileMenu__link" to="/">Главная</Link></li>
              <li className="MobileMenu__item"><Link className="MobileMenu__link MobileMenu__active" to="/movies">Фильмы</Link></li>
              <li className="MobileMenu__item"><Link className="MobileMenu__link" to="/moies">Сохранённые фильмы</Link></li>
            </ul>
            <Link className="MobileMenu__acc NavBarMovie__btn" to="/">Аккаунт</Link>
          </nav>
        </div>

      </div>
    </>
  );
};

export default MobileMenu;
