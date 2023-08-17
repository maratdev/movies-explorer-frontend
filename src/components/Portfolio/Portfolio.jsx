import './Portfolio.css';
import arrow from '../../images/portfolio_arrow.svg';

const Portfolio = () => (
  <section className="Portfolio">
    <div className="Portfolio__wrap">
      <h2 className="Portfolio__title reset-txt">Портфолио</h2>
      <nav className="Portfolio__list">
        <a className="Portfolio__link" href="https://maratdev.github.io/how-to-learn/" target="_blank">
          <p className="Portfolio__text reset-txt">Статичный сайт</p> <img className="Portfolio__image" src={arrow}
                                                                           alt=""/>
        </a>
        <a className="Portfolio__link" href="https://maratdev.github.io/russian-travel/" target="_blank">
          <p className="Portfolio__text reset-txt">Адаптивный сайт</p> <img className="Portfolio__image" src={arrow}
                                                                            alt=""/>
        </a>
        <a className="Portfolio__link" href="https://maratdev.github.io/react-mesto-auth/" target="_blank">
          <p className="Portfolio__text reset-txt">Одностраничное приложение</p> <img className="Portfolio__image"
                                                                                      src={arrow} alt=""/>
        </a>
      </nav>
    </div>

  </section>
);
export default Portfolio;
