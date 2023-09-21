import React, {useEffect, useState} from 'react';
import {Route, Routes} from 'react-router-dom';
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
import {addToSavedMovies, deleteSavedMovies, getSavedMovies} from '../../utils/MainApi';
import {checkTokenUser} from '../../utils/auth';
import {SERVER_REQUEST_ERROR, SERVER_REQUEST_BAD} from '../../utils/constants';

const App = () => {
  // -----------------------------------Подсказки-----------------/
  const [isInfoTooltip, setIsInfoTooltip] = useState('');
  const [serverInfo, setServerInfo] = useState({errorStatus: '', text: ''});// стэйт для данных ошибки сервера
  const [loggedIn, setLoggedIn] = useState(false);

  // --------------------------- Фильмы добавленые в сохраненые -------------------------------- /
  const [updatedUserMovieList, setUpdatedUserMovieList] = useState([]); // Trigger render
  const [localMovieList, setLocalMovieList] = useState([]);
  // --------------------------- Пользователь -------------------------------- /
  const [currentUser, setCurrentUser] = useState({}); // User data state




  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      checkTokenUser()
        .then((res) => {
          setLoggedIn(true);
          setCurrentUser(res.data);
        })
        .catch(console.error);
    }

  }, [loggedIn]);


  const loadApiMovies = () => {
    getSavedMovies()
      .then((savedMovie) => {
        setLocalMovieList(savedMovie);
      })
      .catch(() => setIsInfoTooltip(SERVER_REQUEST_ERROR));
  };

  useEffect(() => {
    if (loggedIn){
      loadApiMovies();
    }
  }, [loggedIn, updatedUserMovieList]);

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
      .catch(() => setServerInfo({errorStatus: 'SERVER_REQUEST_BAD', text: SERVER_REQUEST_BAD}));
  };

  // --------------------------- Добавление в избранное -------------------------------- /
  const handleFavoriteMovie = (movie) => {
    const isSavedMovie = localMovieList.some((userMovie) => userMovie.movieId === movie.movieId);

    if (isSavedMovie) {
      handleDeleteFavoriteMovie(movie);
    } else {
      addToSavedMovies(movie)
        .then((addNewMovie) => setLocalMovieList([...localMovieList, addNewMovie]))
        .catch(() => setServerInfo({errorStatus: 'SERVER_REQUEST_BAD', text: SERVER_REQUEST_BAD}));
    }
  };

  // ---------------------------------------------------------> Аутинфикация пользователя


  return (<>
    <Header>
      {loggedIn ? <NavBarMovie/> : <NavBar/>}
    </Header>
    <Routes>
      <Route path="/" element={<Main/>}/>
      <Route path="/movies" element={<Movies
        loggedIn={loggedIn}
        setIsInfoTooltip={setIsInfoTooltip}
        isInfoTooltip={isInfoTooltip}
        toDelete={handleDeleteFavoriteMovie}
        toSaved={handleFavoriteMovie}
        localMovieList={localMovieList}
        serverInfo={serverInfo}
      />}/>

      <Route path="/saved-movies" element={<SavedMovies
        setIsInfoTooltip={setIsInfoTooltip}
        isInfoTooltip={isInfoTooltip}
        toDelete={handleDeleteFavoriteMovie}
        toSaved={handleFavoriteMovie}
        localMovieList={localMovieList}
      />}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/signup" element={<Register
        serverInfo={serverInfo}
        setServerInfo={setServerInfo}
      />}/>
      <Route path="/signin" element={<Login
        setLoggedIn={setLoggedIn}
        serverInfo={serverInfo}
        setServerInfo={setServerInfo}
        setIsInfoTooltip={setIsInfoTooltip}
      />}/>
      {/* <Route path="/*" element={<NotFound/>}/> */}
      <Route path="/404" element={<NotFound/>}/>
    </Routes>
    <Footer date={new Date().getFullYear()}/>
  </>);
};

export default App;
