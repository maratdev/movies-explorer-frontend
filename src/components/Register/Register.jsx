import FormList from '../FormList/FormList.jsx';
import FormComponent from '../FormComponent/FormComponent.jsx';

const Register = () => (
  <FormList
    nameForm={'register'}
    nameTitle={'Добро пожаловать!'}
    buttonText={'Зарегистрироваться'}
    RegisterBtnTxt={'Уже зарегистрированы?'}
    RegisterBtnTxtLink={'Войти'}
    toLink={'/signin'}
  >

    <FormComponent name={'Имя'} type={'text'} maxLength={30} minLength={2} nameInput={'name'} required/>
    <FormComponent name={'E-mail'} type={'email'} nameInput={'email'} required/>
    <FormComponent
      name={'Пароль'}
      type={'password'}
      nameInput={'password'}
      errorTxt={'Что-то пошло не так...'}
      maxLength={30}
      minLength={2}
      required/>
  </FormList>
);
export default Register;
