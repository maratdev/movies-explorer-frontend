import { useState, useEffect } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard.jsx';
import Preloader from '../Preloader/Preloader.jsx';
import { DEVICE_SIZE } from '../../utils/constants';
import { getSavedMovies, addToSavedMovies, deleteSavedMovies } from '../../utils/MainApi';

const MoviesCardList = ({
  isSavedFilms, movieList, isLoader, isInfoTooltip,
}) => {
  const [width, setWidth] = useState(window.innerWidth); // ширина экрана
  const { desktop, tablet, mobile } = DEVICE_SIZE;
  const [cardsShowDetails, setCardsShowDetails] = useState({ total: 16, more: 4 });

  // --------------------------- Фильмы добавленые в сохраненые -------------------------------- /
  const [localMovieList, setLocalMovieList] = useState([]);
  useEffect(() => {
    getSavedMovies()
      .then((savedMovie) => {
        setLocalMovieList(savedMovie);
      })
      .catch((err) => console.log(err));
  }, []);

  // --------------------------- Удаление из избранное -------------------------------- /
  const handleDeleteFavoriteMovie = (movie) => {
    const savedUserMovie = localMovieList.find((userMovie) => userMovie.movieId === movie.id);

    deleteSavedMovies(savedUserMovie._id)
      .then(() => {
        const newUserMovieList = localMovieList
          .filter((userMovie) => userMovie.movieId !== movie.id);
        setLocalMovieList(newUserMovieList);
      })
      .catch((err) => console.log(err));
  };

  // --------------------------- Добавление в избранное -------------------------------- /
  const handleFavoriteMovie = (movie) => {
    const isSavedMovie = localMovieList.some((userMovie) => userMovie.movieId === movie.id);

    if (isSavedMovie) {
      handleDeleteFavoriteMovie(movie);
    } else {
      addToSavedMovies(movie)
        .then((addNewMovie) => setLocalMovieList([...localMovieList, addNewMovie]))
        .catch((err) => console.log(err));
    }
  };

  // ------------------------ Отображение лайка избранных фильмов -------------------------------- /
  const findFavoriteMovies = (userMoviesArr, movie) => userMoviesArr
    .find((item) => item.movieId === movie.id);

  // ----------- Количество отображаемых карточек при разной ширине экрана------------ /
  const getRenderedMovies = (widthDevice, desktopDevice) => {
    if (widthDevice > desktopDevice.width) {
      setCardsShowDetails(desktopDevice.cards);
    } else if (widthDevice <= desktopDevice.width && widthDevice > mobile.width) {
      setCardsShowDetails(tablet.cards);
    } else {
      setCardsShowDetails(mobile.cards);
    }
  };
  // -----------------------------Фильмы сохраненые в localStorage-------------------- /

  const [showMovieList, setShowMovieList] = useState([]);
  useEffect(() => {
    getRenderedMovies(width, desktop);
    if (movieList !== null) {
      const res = movieList.filter((item, i) => i < cardsShowDetails.total);
      setShowMovieList(res);
    }
  }, [width, movieList, cardsShowDetails.total]);

  // -----------------------------Удаление сайд эффектов-------------------- /

  useEffect(() => {
    let timeoutId = null;
    const resizeListener = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setWidth(window.innerWidth), 150);
    };

    window.addEventListener('resize', resizeListener, false);

    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  }, []);

  // ------------------------ Добавление карточек при клике по кнопке "Еще" ---- /
  const handleClickMoreMovies = () => {
    const start = showMovieList.length;
    const end = start + cardsShowDetails.more;
    const additional = movieList.length - start;

    if (additional > 0) {
      const newCards = movieList.slice(start, end);
      setShowMovieList([...showMovieList, ...newCards]);
    }
  };

  return (
    <section className="MoviesCardList">
      <div className="MoviesCardList__wrap">
        {isLoader ? <Preloader/> : (
          <>
            {movieList.length === 0 && <p className="MoviesCardList__not-result list">{isInfoTooltip}</p>}
            <ul className="MoviesCardList__grid">
              {showMovieList.map((movies) => (
                <MoviesCard
                  toDelete={handleDeleteFavoriteMovie}
                  toSaved={handleFavoriteMovie}
                  toFavorite={findFavoriteMovies(localMovieList, movies)}
                  key={movies.id || movies._id} movie={movies} />
              ))}
            </ul>
            <div className="MoviesCardList__more">
              {isSavedFilms && showMovieList?.length < movieList?.length
                && <button
                  aria-label="Еще"
                  type="button"
                  onClick={handleClickMoreMovies}
                  className="MoviesCardList__btn-more">Еще
              </button>}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default MoviesCardList;
