import { useEffect, } from 'react';
import { useNavigate } from "react-router-dom"; // импортируем Routes
import FormList from '../FormList/FormList.jsx';
import FormComponent from '../FormComponent/FormComponent.jsx';
import { registerUser } from '../../utils/auth';
import useFormWithValidation from '../../hooks/useFormWithValidation';
import {
  duplicateEmailError,
  successRegistration,
  SERVER_REQUEST_BAD, SERVER_REQUEST_ERROR,
} from '../../utils/constants';

const Register = ({ serverInfo, setServerInfo }) => {
  const navigate = useNavigate();
  const {
    values, handleChange, errors, isValid, resetForm,
  } = useFormWithValidation({
    name: '',
    password: '',
    email: '',
  });

  // --------------------- Регистрация пользователя ---------------- /
  function handleRegisterUser({ name, password, email }) {
    registerUser(name, password, email)
      .then(() => {
        setServerInfo({ errorStatus: 'successRegistration', text: successRegistration });
        setTimeout(() => { navigate('/signin',{ replace: false })}, 2000)
      })
      .catch((err) => {
        if (err.message === '409') {
          setServerInfo({ errorStatus: 'duplicateEmailError', text: duplicateEmailError });
          return;
        }
        if (err.message === '400') {
          setServerInfo({ errorStatus: 'SERVER_REQUEST_BAD', text: SERVER_REQUEST_BAD });
          return;
        }
        setServerInfo({ errorStatus: 'SERVER_REQUEST_ERROR', text: SERVER_REQUEST_ERROR });
      })
      .finally(() => {
        console.log('зарег');
      });
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (isValid) {
      handleRegisterUser({
        name: values.name,
        password: values.password,
        email: values.email,
      });

    }
  };

  useEffect(() => {
    resetForm();
  }, []);

  return (
    <FormList
      nameForm={'register'}
      nameTitle={'Добро пожаловать!'}
      buttonText={'Зарегистрироваться'}
      RegisterBtnTxt={'Уже зарегистрированы?'}
      RegisterBtnTxtLink={'Войти'}
      toLink={'/signin'}
      handleSubmit={handleSubmit}
      isValid={isValid}
      serverInfo={serverInfo}
    >

      <FormComponent
        name={'Имя'}
        type={'text'}
        nameInput={'name'}
        value={values.name}
        handleChange={handleChange}
        maxLength={30}
        minLength={2}
        errors={errors.name}
        required/>
      <FormComponent
        name={'E-mail'}
        type={'email'}
        nameInput={'email'}
        value={values.email}
        handleChange={handleChange}
        errors={errors.email}
        required/>
      <FormComponent
        name={'Пароль'}
        type={'password'}
        nameInput={'password'}
        value={values.password}
        handleChange={handleChange}
        maxLength={30}
        minLength={2}
        errors={errors.password}
        required/>
    </FormList>
  );
};

export default Register;
