import { useState, useEffect } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard.jsx';
import Preloader from '../Preloader/Preloader.jsx';
import { DEVICE_SIZE } from '../../utils/constants';
import { findFavoriteMovies } from '../../utils/utilities';

const MoviesCardList = ({
  isSavedFilms,
  movieList,
  isLoader,
  isInfoTooltip,
  toDelete,
  toSaved,
  localMovieList,
  serverInfo,
}) => {
  const [width, setWidth] = useState(window.innerWidth); // ширина экрана
  const { desktop, tablet, mobile } = DEVICE_SIZE;
  const [cardsShowDetails, setCardsShowDetails] = useState({ total: 16, more: 4 });
  const [showMovieList, setShowMovieList] = useState([]);

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
  useEffect(() => {
    getRenderedMovies(width, desktop);
    if (movieList !== null) {
      const res = movieList.filter((item, i) => i < cardsShowDetails.total);
      setShowMovieList(res);
    }
  }, [width, movieList, cardsShowDetails.total, isInfoTooltip]);

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
            {<p
              className="MoviesCardList__not-result list">{(movieList.length === 0 && isInfoTooltip) || (serverInfo && serverInfo.text)}</p>}
            <ul className="MoviesCardList__grid">
              {showMovieList.map((movies) => (
                <MoviesCard
                  toDelete={toDelete}
                  toSaved={toSaved}
                  toFavorite={findFavoriteMovies(localMovieList, movies)}
                  key={movies.id || movies._id}
                  movie={movies}/>
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
