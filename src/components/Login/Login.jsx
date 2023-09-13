import FormList from '../FormList/FormList.jsx';
import FormComponent from '../FormComponent/FormComponent.jsx';

const Login = () => (
  <FormList
    nameForm={'login'}
    nameTitle={'Рады видеть!'}
    buttonText={'Войти'}
    RegisterBtnTxt={'Ещё не зарегистрированы?'}
    RegisterBtnTxtLink={'Регистрация'}
    toLink={'/signup'}
  >
    <FormComponent name={'E-mail'} type={'email'} nameInput={'email'} required/>
    <FormComponent
      name={'Пароль'}
      type={'password'}
      nameInput={'password'}
      required/>
  </FormList>
);
export default Login;
