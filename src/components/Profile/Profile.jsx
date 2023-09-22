import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { saveDataInfo } from '../../utils/MainApi';
import useFormWithValidation from '../../hooks/useFormWithValidation';
import './Profile.css';
import { wrongValidation, successProfile } from '../../utils/constants';

const Profile = ({ currentUser, setServerInfo, serverInfo, fullLogout }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const {
    values, handleChange, errors, setValues,
  } = useFormWithValidation({
    user: '',
    email: '',
  });

  // --------------------- Проверка данных пользователя ---------------- /
  const regexEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  const regexName = /^[a-zA-Zа-яА-ЯёЁ\s_-]{2,}$/;

  useEffect(() => {
    if (regexName.test(values.user) && regexEmail.test(values.email)) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  }, [values]);

  // --------------------- Обновление данных пользователя ---------------- /
  const handleUpdateProfile = ({ user, email }) => {
    saveDataInfo(user, email)
      .then(() => {
        setServerInfo({ errorStatus: 'successProfile', text: successProfile });
        setTimeout(() => {
          setServerInfo('');
          setIsEditing(false);
        }, 1500);
      })
      .catch((err) => {
        if (err.message === '400') {
          setServerInfo({ errorStatus: 'wrongValidation', text: wrongValidation });
        }
      });
  };

  // --------------------- Иницализация данных пользователя ---------------- /
  useEffect(() => {
    if (currentUser.name && currentUser.email) {
      setValues({
        user: currentUser.name,
        email: currentUser.email,
      });
    }
  }, [currentUser]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (regexName.test(values.user) && regexEmail.test(values.email)) {
      handleUpdateProfile({
        user: values.user,
        email: values.email,
      });
    }
  };


  const handleOnSignOut = () => {
    fullLogout();
  };

  return (
    <main>
      <section className="Profile">
        <div className="Profile__wrap">
          <h1 className="Profile__title list">Привет, {currentUser.name}</h1>
          <form name="profile" className="Profile__form" onSubmit={handleSubmit}>
            <div className="Profile__labels">
              <label className="Profile__label">
                <span className="Profile__label-text">Имя</span>
                <input
                  onChange={handleChange}
                  className={`Profile__input${isEditing ? '_edit' : ''}`}
                  defaultValue={values.user || ''}
                  name="user"
                  type="text"
                  placeholder="Имя"
                  minLength='2'
                  maxLength='30'
                  required
                  autoFocus={true}
                  autoComplete="on"
                  disabled={!isEditing}
                />
              </label>
              <span className="Profile__label-text_err">{errors.user}</span>
              <label className="Profile__label">
                <span className="Profile__label-text">E-mail</span>
                <input
                  onChange={handleChange}
                  className={`Profile__input${isEditing ? '_edit' : ''}`}
                  defaultValue={values.email || ''}
                  name="email"
                  type="email"
                  placeholder="Email"
                  minLength="2"
                  maxLength="50"
                  required
                  disabled={!isEditing}
                  autoComplete="on"
                />
              </label>
              <span className="Profile__label-text_err">{errors.email}</span>
            </div>
            <p
              className={`Profile__label-text_${serverInfo.errorStatus === 'successProfile' ? 'ok' : 'info'}`}>{serverInfo.text}</p>
            <div className="Profile__btn-wrap">
              {
                isEditing
                  ? <button
                    onSubmit={handleSubmit}
                    className={`Profile__btn-edit${btnDisabled ? '_err' : ''}`}
                    type="submit"
                    aria-label="сохранить"
                    disabled={btnDisabled}
                  >Сохранить</button>
                  : <a
                    className="Profile__btn-edit"
                    aria-label="редактировать"
                    onClick={() => setIsEditing(!isEditing)}
                  >Редактировать</a>
              }

              <Link to="/">
                <button
                  className="Profile__btn-edit Profile__btn-edit_exit"
                  type="button"
                  onClick={handleOnSignOut}
                  aria-label="выход из аккаунта">
                  Выйти из аккаунта
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
