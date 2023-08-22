import './MoviesCard.css';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const MoviesCard = ({ card }) => {
  const [savedFilms, setSavedFilms] = useState(false);
  const location = useLocation();
  const trashFilms = location.pathname === '/saved-movies';
  const [isShown, setIsShown] = useState(false);
  return (
    <>
      <li className="MoviesCard" onMouseEnter={() => setIsShown(true)} onMouseLeave={() => setIsShown(false)}>
        <article className="MoviesCard__item">
          <img className="MoviesCard__img" src={`https://api.nomoreparties.co/${card.image.url}`}
               alt={card.image.name}/>
          <div className="MoviesCard__desc">
            <h2 className="MoviesCard__title reset-txt">{card.nameRU}</h2>
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
          <span className="MoviesCard__time">{Math.floor(card.duration / 60)}ч {card.duration % 60}м</span>
        </article>
      </li>
    </>);
};
export default MoviesCard;
