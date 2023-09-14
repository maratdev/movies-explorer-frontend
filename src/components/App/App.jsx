import React, { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
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

const App = () => {
  // -----------------------------------Подсказки-----------------/
  const [isInfoTooltip, setIsInfoTooltip] = useState('');

  const { pathname } = useLocation();
  const loggedIn = pathname === '/movies' || pathname === '/saved-movies' || pathname === '/profile';
  return (
    <>
      <Header>
        {loggedIn ? <NavBarMovie/> : <NavBar/>}
      </Header>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/movies" element={
          <Movies
            setIsInfoTooltip={setIsInfoTooltip}
            isInfoTooltip={isInfoTooltip}
          />
        }/>

        <Route path="/saved-movies" element={
          <SavedMovies
            setIsInfoTooltip={setIsInfoTooltip}
            isInfoTooltip={isInfoTooltip}
          />}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/signup" element={<Register/>}/>
        <Route path="/signin" element={<Login/>}/>
        {/* <Route path="/*" element={<NotFound/>}/> */}
        <Route path="/404" element={<NotFound/>}/>
      </Routes>
      <Footer date={new Date().getFullYear()}/>
    </>
  );
};

export default App;
