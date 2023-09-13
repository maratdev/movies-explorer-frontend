import { useState, useEffect } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard.jsx';
import Preloader from '../Preloader/Preloader.jsx';
import DEVICE_SIZE from '../../utils/constants';

const MoviesCardList = ({
  isSavedFilms, movieList, isLoader, isInfoTooltip,
}) => {
  const [width, setWidth] = useState(window.innerWidth); // ширина экрана
  const { desktop, tablet, mobile } = DEVICE_SIZE;
  const [showMovieList, setShowMovieList] = useState([]);
  const [cardsShowDetails, setCardsShowDetails] = useState({ total: 16, more: 4 });

  // количество отображаемых карточек при разной ширине экрана
  useEffect(() => {
    if (width > desktop.width) {
      setCardsShowDetails(desktop.cards);
    } else if (width <= desktop.width && width > mobile.width) {
      setCardsShowDetails(tablet.cards);
    } else {
      setCardsShowDetails(mobile.cards);
    }
    if (movieList !== null) {
      const res = movieList.filter((item, i) => i < cardsShowDetails.total);
      setShowMovieList(res);
    }
  }, [width, movieList, cardsShowDetails.total]);

  // удаление сайд эффектов
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

  // добавление карточек при клике по кнопке "Еще"
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
                <MoviesCard key={movies.id} movie={movies}/>
              ))}
            </ul>
            <div className="MoviesCardList__more">
              {isSavedFilms && showMovieList?.length < movieList?.length
                && <button aria-label="Еще" type="button" onClick={handleClickMoreMovies}
                           className="MoviesCardList__btn-more">Еще</button>}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default MoviesCardList;
