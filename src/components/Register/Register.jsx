import { useEffect } from 'react';
import FormList from '../FormList/FormList.jsx';
import FormComponent from '../FormComponent/FormComponent.jsx';
import useFormWithValidation from '../../hooks/useFormWithValidation';

const Register = ({ serverInfo, handleRegisterUser }) => {
  const {
    values, handleChange, errors, isValid, resetForm,
  } = useFormWithValidation({
    name: '',
    password: '',
    email: '',
  });

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
