import './MoviesCard.css';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const MoviesCard = ({ movie }) => {
  console.log(movie.nameRU)
  const [savedFilms, setSavedFilms] = useState(false);
  const location = useLocation();
  const trashFilms = location.pathname === '/saved-movies';
  const [isShown, setIsShown] = useState(false);
  return (
    <>
      <li className="MoviesCard" onMouseEnter={() => setIsShown(true)} onMouseLeave={() => setIsShown(false)}>
        <article className="MoviesCard__item">
          <img className="MoviesCard__img" src={`https://api.nomoreparties.co/${movie.image.url}`}
               alt={movie.image.name}/>
          <div className="MoviesCard__desc">
            <h2 className="MoviesCard__title list">{movie.nameRU}</h2>
            {
              !trashFilms && (
                <button className={`MoviesCard__like ${savedFilms ? 'MoviesCard__like_active' : ''} `}
                        onClick={() => setSavedFilms(!savedFilms)}
                        type="button"
                        aria-label="лайк">
                </button>
              )}
            {
              (isShown && trashFilms) && (
                <button className="MoviesCard__trash" type="button" aria-label="удалить"></button>
              )
            }
          </div>
          <span className="MoviesCard__time">{Math.floor(movie.duration / 60)}ч {movie.duration % 60}м</span>
        </article>
      </li>
    </>);
};
export default MoviesCard;
