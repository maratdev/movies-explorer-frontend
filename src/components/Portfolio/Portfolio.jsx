import './Portfolio.css';
import arrow from '../../images/portfolio_arrow.svg';

const Portfolio = () => (
  <section className="Portfolio">
    <div className="Portfolio__wrap">
      <h2 className="Portfolio__title list">Портфолио</h2>
      <nav className="Portfolio__list">
        <a className="Portfolio__link" href="https://maratdev.github.io/how-to-learn/" target="_blank">
          <p className="Portfolio__text list">Статичный сайт</p> <img className="Portfolio__image" src={arrow}
                                                                      alt="Статичный сайт"/>
        </a>
        <a className="Portfolio__link" href="https://maratdev.github.io/russian-travel/" target="_blank">
          <p className="Portfolio__text list">Адаптивный сайт</p> <img className="Portfolio__image" src={arrow}
                                                                       alt="Адаптивный сайт"/>
        </a>
        <a className="Portfolio__link" href="https://voredev.nomoredomains.xyz/signin" target="_blank">
          <p className="Portfolio__text list">Одностраничное приложение</p> <img className="Portfolio__image"
                                                                                 src={arrow}
                                                                                 alt="Одностраничное приложение"/>
        </a>
      </nav>
    </div>

  </section>
);
export default Portfolio;
