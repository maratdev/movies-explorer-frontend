import FormList from '../FormList/FormList.jsx';
import FormComponent from '../FormComponent/FormComponent.jsx';

const Register = () => (
  <FormList
    nameForm={'register'}
    nameTitle={'Добро пожаловать!'}
    buttonText={'Зарегистрироваться'}
    RegisterBtnTxt={'Уже зарегистрированы?'}
    RegisterBtnTxtLink={'Войти'}
  >

    <FormComponent name={'Имя'} type={'text'} nameInput={'name'} required/>
    <FormComponent name={'E-mail'} type={'email'} nameInput={'email'} required/>
    <FormComponent
      name={'Пароль'}
      type={'password'}
      nameInput={'password'}
      errorTxt={'Что-то пошло не так...'}
      required/>
  </FormList>
);
export default Register;
