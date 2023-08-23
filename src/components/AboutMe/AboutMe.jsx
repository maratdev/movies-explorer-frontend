import './AboutMe.css';
import pic from '../../images/pic__COLOR_pic.png';

const AboutMe = () => (
  <section className="AboutMe">
    <div className="AboutMe__wrap">
      <h2 className="AboutMe__title list">Студент</h2>
      <div className="AboutMe__content">
        <h3 className="AboutMe__large-title list">Виталий</h3>
        <p className="AboutMe__info list">Фронтенд-разработчик, 30 лет</p>
        <p className="AboutMe__description list">Я родился и живу в Саратове, закончил факультет экономики СГУ.
          У меня есть жена
          и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом.
          Недавно начал кодить. С 2015 года работал в компании «СКБ Контур».
          После того, как прошёл курс по веб-разработке,
          начал заниматься фриланс-заказами и ушёл с постоянной работы.
        </p>
        <a className="AboutMe__link" href="https://github.com/maratdev" target="_blank" rel="noreferrer">Github</a>
      </div>
      <img className="AboutMe__photo" src={pic} alt="фото разработчтка"/>
    </div>
  </section>);

export default AboutMe;
