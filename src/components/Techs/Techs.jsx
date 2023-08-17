import './Techs.css';

const Techs = () => (
  <section className="Techs">
    <div className="Techs__wrap">
      <h2 className="Techs__title reset-txt">Технологии</h2>
      <h3 className="Techs__large-title reset-txt">7 технологий</h3>
      <p className="Techs__description">На курсе веб-разработки мы освоили технологии, которые применили в дипломном
        проекте.</p>
      <ul className="Techs__list reset-list reset-txt">
        <li className="Techs__list-item">HTML</li>
        <li className="Techs__list-item">CSS</li>
        <li className="Techs__list-item">JS</li>
        <li className="Techs__list-item">React</li>
        <li className="Techs__list-item">Git</li>
        <li className="Techs__list-item">Express.js</li>
        <li className="Techs__list-item">mongoDB</li>
      </ul>
    </div>

  </section>
);

export default Techs;