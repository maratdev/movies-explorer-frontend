import './AboutProject.css';

const AboutProject = () => (
  <section className="AboutProject">
    <div className="AboutProject__wrap">
      <h2 className="AboutProject__title reset-txt">О проекте</h2>
      <ul className="AboutProject__items reset-list reset-txt">
        <li className="AboutProject__item">
          <h3 className="AboutProject__heading reset-txt">Дипломный проект включал 5 этапов</h3>
          <p className="AboutProject__paragraph reset-txt">Составление плана, работу над бэкендом, вёрстку,
            добавление функциональности и финальные доработки. </p>
        </li>
        <li className="AboutProject__item">
          <h3 className="AboutProject__heading reset-txt">На выполнение диплома ушло 5 недель</h3>
          <p className="AboutProject__paragraph reset-txt">У каждого этапа был мягкий и жёсткий дедлайн,
            которые нужно было соблюдать, чтобы успешно защититься.</p>
        </li>
      </ul>
      <div className="AboutProject__progress">
        <div className="AboutProject__backend">
          <span className="AboutProject__backend-duration">1 неделя</span>
          <span className="AboutProject__scheme-title">Back-end</span>
        </div>
        <div className="AboutProject__frontend">
          <span className="AboutProject__frontend-duration">4 недели</span>
          <span className="AboutProject__scheme-title">Front-end</span>
        </div>
      </div>
    </div>
  </section>
);

export default AboutProject;
