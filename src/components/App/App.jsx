import React, { useEffect, useState } from 'react';
import {
  Route, Routes, useLocation, useNavigate,
} from 'react-router-dom';
import Main from '../Main/Main.jsx';
import Header from '../Header/Header.jsx';
import NavBar from '../NavBar/NavBar.jsx';
import NavBarMovie from '../NavBarMovie/NavBarMovie.jsx';
import Footer from '../Footer/Footer.jsx';
import Movies from '../Movies/Movies.jsx';
import SavedMovies from '../SavedMovies/SavedMovies.jsx';
import Profile from '../Profile/Profile.jsx';
import Register from '../Register/Register.jsx';
import Login from '../Login/Login.jsx';
import NotFound from '../NotFound/NotFound.jsx';
import ProtectedRoute from '../../hooks/useProtectedRoute';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import {
  addToSavedMovies, deleteSavedMovies, getUserData, getSavedMovies,
} from '../../utils/MainApi';
import { authorizeUser, checkTokenUser, registerUser } from '../../utils/auth';
import {
  SERVER_REQUEST_ERROR,
  SERVER_REQUEST_BAD,
  REQUEST_USERDATA_ERROR,
  successRegistration, duplicateEmailError, wrongCredentialsError,
} from '../../utils/constants';

const App = () => {
  // --------------------------- Видимость элементов-------------------------------- /
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [visibleComponent, setVisibleComponent] = useState('');
  const visibleElement = pathname === '/signin' || pathname === '/signup' || pathname === `${visibleComponent}`;

  // -----------------------------------Подсказки--------------------------------------/
  const [isInfoTooltip, setIsInfoTooltip] = useState(''); // ошибки сервера
  const [serverInfo, setServerInfo] = useState({ errorStatus: '', text: '' }); // ошибки при регистрации и авторизации
  // --------------------------- Фильмы добавленые в сохраненые -------------------------------- /
  const [updatedUserMovieList, setUpdatedUserMovieList] = useState([]); // Trigger render
  const [localMovieList, setLocalMovieList] = useState([]); // фильмы сохраненые пользователем
  // --------------------------- Пользователь -------------------------------- /
  const [currentUser, setCurrentUser] = useState({ // Данные пользователя
    _id: '',
    name: '',
    email: '',
  });
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('jwt'));
  // -------------------------Состояние отправки форм--------------------------*
  const [btnDisabled, setBtnDisabled] = useState(false);
  // --------------------------- Загрузка сохраненых фильмов -------------------------------- /
  const loadApiMovies = () => {
    getSavedMovies()
      .then((savedMovie) => setLocalMovieList(
        savedMovie.filter((userMovie) => userMovie.owner._id === currentUser._id),
      ))
      .catch(() => setIsInfoTooltip(SERVER_REQUEST_ERROR));
  };

  useEffect(() => {
    if (loggedIn && currentUser) {
      loadApiMovies();
    }
  }, [updatedUserMovieList]);

  // --------------------------- Инициализация User -------------------------------- /
  useEffect(() => {
    if (loggedIn && currentUser) {
      getUserData()
        .then((user) => setCurrentUser({
          _id: user._id,
          name: user.name,
          email: user.email,
        }))
        .catch(() => setIsInfoTooltip(REQUEST_USERDATA_ERROR));
    }
  }, [loggedIn]);

  // --------------------------- Удаление из избранного -------------------------------- /
  const handleDeleteFavoriteMovie = (movie) => {
    const savedUserMovie = localMovieList
      .find((userMovie) => userMovie.movieId === movie.id || userMovie.movieId === movie.movieId);
    deleteSavedMovies(savedUserMovie._id)
      .then(() => {
        const newUserMovieList = localMovieList
          .filter((userMovie) => userMovie.movieId !== movie.movieId);
        setLocalMovieList(newUserMovieList);
        setUpdatedUserMovieList(newUserMovieList);
      })
      .catch(() => setIsInfoTooltip(SERVER_REQUEST_BAD));
  };

  // --------------------------- Добавление в избранное -------------------------------- /
  const handleFavoriteMovie = (movie) => {
    const isSavedMovie = localMovieList.some((userMovie) => userMovie.movieId === movie.movieId);

    if (isSavedMovie) {
      handleDeleteFavoriteMovie(movie);
    } else {
      addToSavedMovies(movie)
        .then((addNewMovie) => setLocalMovieList([...localMovieList, addNewMovie]))
        .catch(() => setIsInfoTooltip(SERVER_REQUEST_BAD));
    }
  };

  // --------------------- Авторизация пользователя ---------------- /
  const handleAuthorizeUser = ({ password, email }) => {
    authorizeUser(password, email)
      .then((res) => {
        const jwt = localStorage.getItem('jwt');
        setLoggedIn(true);
        setBtnDisabled(false);
        if (jwt !== null) {
          localStorage.clear();
        }
        localStorage.setItem('jwt', res.token);
        navigate('/movies', { replace: true });
        setServerInfo(null);
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
      });
  };

  // --------------------- Регистрация пользователя ---------------- /
  const handleRegisterUser = ({ name, password, email }) => {
    setBtnDisabled(true);
    registerUser(name, password, email)
      .then((user) => {
        if (user.email) {
          setServerInfo({ errorStatus: 'successRegistration', text: successRegistration });
          setTimeout(() => {
            handleAuthorizeUser({ email, password });
          }, 2000);
        }
      })
      .catch((err) => {
        setBtnDisabled(false);
        if (err.message === '409') {
          setServerInfo({ errorStatus: 'duplicateEmailError', text: duplicateEmailError });
          setTimeout(() => {
            setServerInfo(null);
          }, 3000);
          return;
        }
        if (err.message === '400') {
          setServerInfo({ errorStatus: 'SERVER_REQUEST_BAD', text: SERVER_REQUEST_BAD });
          return;
        }
        setServerInfo({ errorStatus: 'SERVER_REQUEST_ERROR', text: SERVER_REQUEST_ERROR });
      });
  };

  // Аутинфикация
  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      checkTokenUser(jwt)
        .then(() => {
          setLoggedIn(true);
        })
        .catch(() => setIsInfoTooltip(REQUEST_USERDATA_ERROR));
    }
  }, []);

  // --------------------------- Выход из аккаунта-------------------------------- /
  const fullLogout = () => {
    localStorage.clear();
    setLoggedIn(false);
    navigate('/');
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header
        visibleElement={visibleElement}
      >
        {loggedIn ? <NavBarMovie/> : <NavBar/>}
      </Header>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route element={<ProtectedRoute loggedIn={loggedIn}/>}>
          <Route path='/movies' element={
            <Movies
              setIsInfoTooltip={setIsInfoTooltip}
              isInfoTooltip={isInfoTooltip}
              toDelete={handleDeleteFavoriteMovie}
              toSaved={handleFavoriteMovie}
              localMovieList={localMovieList}
              serverInfo={serverInfo}
            />
          }/>
          <Route path='/saved-movies' element={
            <SavedMovies
              setIsInfoTooltip={setIsInfoTooltip}
              isInfoTooltip={isInfoTooltip}
              toDelete={handleDeleteFavoriteMovie}
              toSaved={handleFavoriteMovie}
              localMovieList={localMovieList}
            />
          }/>
          <Route path='/profile' element={
            <Profile
              setServerInfo={setServerInfo}
              currentUser={currentUser}
              serverInfo={serverInfo}
              fullLogout={fullLogout}
              setCurrentUser={setCurrentUser}
              setBtnDisabled={setBtnDisabled}
              btnDisabled={btnDisabled}
            />
          }/>
        </Route>
        <Route path="/signup" element={
          <Register
            loggedIn={loggedIn}
            serverInfo={serverInfo}
            setServerInfo={setServerInfo}
            handleRegisterUser={handleRegisterUser}
            btnDisabled={btnDisabled}
          />}/>
        <Route path="/signin" element={
          <Login
            loggedIn={loggedIn}
            handleAuthorizeUser={handleAuthorizeUser}
            setCurrentUser={setCurrentUser}
            serverInfo={serverInfo}
            setServerInfo={setServerInfo}
            setIsInfoTooltip={setIsInfoTooltip}
          />}/>
        <Route
          path="/*"
          element={
            <NotFound
              visibleElement={visibleElement}
              setVisibleComponent={setVisibleComponent}
              visibleComponent={visibleComponent}
            />}/>
      </Routes>
      <Footer
        visibleElement={visibleElement}
        date={new Date().getFullYear()
        }/>
    </CurrentUserContext.Provider>
  );
};

export default App;
