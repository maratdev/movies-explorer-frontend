import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard.jsx';
import Preloader from '../Preloader/Preloader.jsx';


const MoviesCardList = ({isSavedFilms, movieList, isLoader, isInfoTooltip}) => {
  return (
      <section className="MoviesCardList">
        <div className="MoviesCardList__wrap">
          {isLoader ? <Preloader/> : (
            <>
              {isInfoTooltip && <p className="MoviesCardList__not-result list">{isInfoTooltip}</p>}
              <ul className="MoviesCardList__grid">
                {movieList?.slice(0, 12).map((movies) => (
                  <MoviesCard key={movies.id} movie={movies}/>
                ))}
              </ul>
              <div className="MoviesCardList__more">
                {isSavedFilms &&
                  <button aria-label="Еще" type="button" className="MoviesCardList__btn-more">Еще</button>}
              </div>
            </>
          )}

        </div>
      </section>
  )
};

export default MoviesCardList;
