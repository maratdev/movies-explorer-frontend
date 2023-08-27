import './FormList.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';

const FormList = ({
  children, nameTitle, buttonText, nameForm,
  RegisterBtnTxt, RegisterBtnTxtLink, toLink,
}) => (
  <main>
    <section className="FormList">
      <div className="FormList__head">
        <Link to="/">
          <img src={logo} alt="логотип"/>
        </Link>
        <h1 className="FormList__title list">{nameTitle}</h1>
      </div>
      <form name={nameForm} className="FormList__form">
        <div className="FormList__labels">
          {children}
        </div>
        <button className="FormList__btn" type="submit" aria-label="Регистрация">{buttonText}</button>
      </form>
      <p className="FormList__txt list">{RegisterBtnTxt}
        <Link className="FormList__link" to={toLink}> {RegisterBtnTxtLink}</Link>
      </p>
    </section>
  </main>
);
export default FormList;
