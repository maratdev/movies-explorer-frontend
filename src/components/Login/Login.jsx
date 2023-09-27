import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import FormList from '../FormList/FormList.jsx';
import FormComponent from '../FormComponent/FormComponent.jsx';
import useFormWithValidation from '../../hooks/useFormWithValidation';
import { regexEmail } from '../../utils/constants';
import { escapeRegExp } from '../../utils/utilities';

const Login = ({ serverInfo, handleAuthorizeUser, loggedIn }) => {
  const {
    values, handleChange, errors, isValid, resetForm,
  } = useFormWithValidation({
    password: '',
    email: '',
  });

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (isValid) {
      handleAuthorizeUser({
        password: values.password,
        email: values.email,
      });
    }
  };

  useEffect(() => {
    resetForm();
  }, []);

  return (
    !loggedIn
      ? <FormList
        nameForm={'login'}
        nameTitle={'Рады видеть!'}
        buttonText={'Войти'}
        RegisterBtnTxt={'Ещё не зарегистрированы?'}
        RegisterBtnTxtLink={'Регистрация'}
        toLink={'/signup'}
        handleSubmit={handleSubmit}
        isValid={isValid}
        serverInfo={serverInfo}
      >
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
          errors={errors.password}
          required/>
      </FormList> : <Navigate to='/movies'/>
  );
};
export default Login;
