import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard.jsx';


const MoviesCardList = ({ movieList, isSavedFilms })=> {
  const { movies } = movieList;
  return (
    <>
    <section className="MoviesCardList">
      <div className="MoviesCardList__wrap">
        <ul className="MoviesCardList__grid">
          {movies?.slice(0, 12).map((movie) => (
            <MoviesCard key={movie.id} movie={movie} />
          ))}
        </ul>
        <div className="MoviesCardList__more">
          {isSavedFilms && <button aria-label="Еще" type="button" className="MoviesCardList__btn-more">Еще</button>}
        </div>
      </div>
    </section>
    </>
  )
};

export default MoviesCardList;
