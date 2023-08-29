import {useState, useEffect} from "react";
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard.jsx';
import Preloader from '../Preloader/Preloader.jsx';


const MoviesCardList = ({
  isSavedFilms, movieList, isLoader, isInfoTooltip,
}) => {
  const [showMovieList, setShowMovieList] = useState([]);
  const [cardsShowDetails, setCardsShowDetails] = useState({ total: 12, more: 4 });


  useEffect(() => {
    setCardsShowDetails({ total: 12, more: 4 })
    if (movieList.length) {
      const res = movieList.filter((item, i) => i < cardsShowDetails.total);
      setShowMovieList(res);
    }
  }, [movieList]);

  // добавление карточек при клике по кнопке "Еще"
  function handleClickMoreMovies() {
    const start = showMovieList.length;
    const end = start + cardsShowDetails.more;
    const additional = movieList.length - start;

    if (additional > 0) {
      const newCards = movieList.slice(start, end);
      setShowMovieList([...showMovieList, ...newCards]);
    }
  }

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
              {isSavedFilms
                && <button aria-label="Еще" type="button" onClick={handleClickMoreMovies} className="MoviesCardList__btn-more">Еще</button>}
            </div>
          </>
        )}
      </div>
    </section>
  )
};

export default MoviesCardList;
