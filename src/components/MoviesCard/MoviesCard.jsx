import './MoviesCard.css';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { addToSavedMovies } from '../../utils/MainApi';

const MoviesCard = ({ movie }) => {
  const [savedFilms, setSavedFilms] = useState(false);
  const location = useLocation();
  const trashFilms = location.pathname === '/saved-movies';
  const [isShown, setIsShown] = useState(false);

  const {pathname} = useLocation();
  const image = pathname === `${"/movies"}` ? `https://api.nomoreparties.co${movie.image.url}`: `${movie.image}`;

  const handleLikeClick = () => {
    const checkIsSaved = [movie].some((item) => item.id === movie.id);
    console.log(checkIsSaved);
    setSavedFilms(!savedFilms);
    console.log(movie);
    return addToSavedMovies(movie);
  };

  return (
    <>
      <li className="MoviesCard" onMouseEnter={() => setIsShown(true)} onMouseLeave={() => setIsShown(false)}>
        <article className="MoviesCard__item">
          <a href={movie.trailerLink} target='_blank'>
            <img className="MoviesCard__img" src={image}
                 alt={movie.image.name}/>
          </a>

          <div className="MoviesCard__desc">
            <h2 className="MoviesCard__title list">{movie.nameRU}</h2>
            {
              !trashFilms && (
                <button className={`MoviesCard__like ${savedFilms ? 'MoviesCard__like_active' : ''} `}
                        onClick={handleLikeClick}
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
