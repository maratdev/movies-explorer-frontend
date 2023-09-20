import {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import FormList from '../FormList/FormList.jsx';
import FormComponent from '../FormComponent/FormComponent.jsx';
import useFormWithValidation from "../../hooks/useFormWithValidation";
import { authorizeUser } from '../../utils/auth';
import {
SERVER_REQUEST_BAD, SERVER_REQUEST_ERROR,
  wrongCredentialsError
} from "../../utils/constants";
const Login = ({ serverInfo, setServerInfo, loadApiMovies, setLoggedIn }) => {
  const navigate = useNavigate();
  const {
    values, handleChange, errors, isValid, resetForm,
  } = useFormWithValidation({
    password: '',
    email: '',
  });

  // --------------------- Авторизация пользователя ---------------- /
  const handleAuthorizeUser = ({ password, email }) => {
    console.log(email, password)
    authorizeUser(password, email)
      .then(() => {
        navigate("/movies", { replace: true });
        loadApiMovies();
        setLoggedIn(true)
      })
      .catch((err) => {
        if (err.message === '401') {
          setServerInfo({ errorStatus: 'wrongCredentialsError', text: wrongCredentialsError });
          return;
        }
        if (err.message === '400') {
          setServerInfo({ errorStatus: 'SERVER_REQUEST_BAD', text: SERVER_REQUEST_BAD });
          return;
        }
        setServerInfo({ errorStatus: 'SERVER_REQUEST_ERROR', text: SERVER_REQUEST_ERROR });
      })
  };

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

  return(
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
    )

};
export default Login;
