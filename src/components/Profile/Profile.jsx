import './Profile.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Profile = () => {
  const [name] = useState('Виталий');
  const [email] = useState('pochta@yandex.ru');
  return (
    <main>
      <section className="Profile">
        <div className="Profile__wrap">
          <h1 className="Profile__title list">Привет, Виталий!</h1>
          <form className="Profile__form">
            <div className="Profile__labels">
              <label className="Profile__label">
                <span className="Profile__label-text">Имя</span>
                <input className="Profile__input" defaultValue={name} name="user" type="text" placeholder="Имя" required
                       minLength="1" maxLength="30"/>
              </label>
              <label className="Profile__label">
                <span className="Profile__label-text">E-mail</span>
                <input className="Profile__input" defaultValue={email} name="email" type="email"
                       placeholder="Email" required minLength="1" maxLength="50"/>
              </label>
            </div>
            <div className="Profile__btn-wrap">
              <button className="Profile__btn-edit" type="submit" aria-label="редактировать">Редактировать</button>
              <Link to="/">
                <button className="Profile__btn-edit Profile__btn-edit_exit" type="button"
                        aria-label="выход из аккаунта">Выйти из аккаунта
                </button>
              </Link>
            </div>
          </form>

        </div>
      </section>
    </main>
  );
};
export default Profile;
