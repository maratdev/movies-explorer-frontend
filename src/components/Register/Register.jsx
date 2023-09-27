import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import FormList from '../FormList/FormList.jsx';
import FormComponent from '../FormComponent/FormComponent.jsx';
import useFormWithValidation from '../../hooks/useFormWithValidation';
import { regexEmail, regexName } from '../../utils/constants';
import { escapeRegExp } from '../../utils/utilities';

const Register = ({
  serverInfo, handleRegisterUser, loggedIn, btnDisabled,
}) => {
  const {
    values, handleChange, errors, isValid, resetForm,
  } = useFormWithValidation();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (isValid) {
      handleRegisterUser({
        name: values.name,
        password: values.password,
        email: values.email.toLowerCase(),
      });
    }
  };
  useEffect(() => {
    resetForm();
  }, []);
  return (
    !loggedIn
      ? <FormList
        nameForm={'register'}
        nameTitle={'Добро пожаловать!'}
        buttonText={'Зарегистрироваться'}
        RegisterBtnTxt={'Уже зарегистрированы?'}
        RegisterBtnTxtLink={'Войти'}
        toLink={'/signin'}
        handleSubmit={handleSubmit}
        isValid={isValid}
        btnDisabled={btnDisabled}
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
          regexInput={escapeRegExp(`${regexName}`)}
          required/>
        <FormComponent
          name={'E-mail'}
          type={'email'}
          nameInput={'email'}
          value={values.email}
          handleChange={handleChange}
          errors={errors.email}
          regexInput={escapeRegExp(`${regexEmail}`)}
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
      </FormList> : <Navigate to='/movies'/>
  );
};

export default Register;
