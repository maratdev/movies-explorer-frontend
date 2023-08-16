import './AboutProject.css';

const AboutProject = () => (<>
  <section className="AboutProject">
    <div className="AboutProject__wrap">
      <h2 className="AboutProject__title reset-txt">О проекте</h2>
      <div className="AboutProject__line"></div>
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
    </div>
  </section>
</>);

export default AboutProject;
