import './Promo.css';
import logo from "../../images/a.svg";
const Promo = () => (
  <section className="Promo">
    <div className="Promo__wrap">
      <h1 className="Promo__title list"> <img className="Promo__title_img" src={logo} alt="кинохлопушка"/> Movies Explorer | BeatFilm</h1>
      <p className="Promo__info">Сервис, в котором можно найти фильмы по запросу и сохранить в личном кабинете.</p>
    </div>
  </section>
);

export default Promo;
