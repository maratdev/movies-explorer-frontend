import { useLocation } from 'react-router-dom';
import './Footer.css';

const Footer = ({ date, visibleElement }) => {
  const { pathname } = useLocation();
  return (
    <>
      {
        !visibleElement && pathname !== '/profile' && pathname !== '/' && (
          <footer className="Footer">
            <div className="Footer__wrap">
              <h3 className="Footer__title list">Учебный проект Яндекс.Практикум х BeatFilm.</h3>
              <div className="Footer__container">
                <p className="Footer__author list">&copy; {date}</p>
                <ul className="Footer__nav list">
                  <li className="Footer__item">
                    <a className="Footer__link" href="https://practicum.yandex.ru/" target="_blank">Яндекс.Практикум</a>
                  </li>
                  <li className="Footer__item">
                    <a className="Footer__link" href="https://github.com/maratdev/movies-explorer-frontend"
                       target="_blank">Github</a>
                  </li>
                </ul>
              </div>
            </div>
          </footer>
        )
      }
    </>
  );
};
export default Footer;
