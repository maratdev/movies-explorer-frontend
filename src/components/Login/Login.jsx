import { useEffect } from 'react';
import FormList from '../FormList/FormList.jsx';
import FormComponent from '../FormComponent/FormComponent.jsx';
import useFormWithValidation from '../../hooks/useFormWithValidation';

const Login = ({ serverInfo, handleAuthorizeUser }) => {
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
    <FormList
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
        required/>
      <FormComponent
        name={'Пароль'}
        type={'password'}
        nameInput={'password'}
        value={values.password}
        handleChange={handleChange}
        errors={errors.password}
        required/>
    </FormList>
  );
};
export default Login;
