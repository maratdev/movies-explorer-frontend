import './MoviesCard.css';
import { useState } from 'react';

const MoviesCard = ({ card }) => {
  const [savedFilms, setSavedFilms] = useState(false);
  return (
    <>
      <li className="MoviesCard">
        <article className="MoviesCard__item">
          <img className="MoviesCard__img" src={`https://api.nomoreparties.co/${card.image.url}`} alt={card.image.name}/>
          <div className="MoviesCard__desc">
            <h2 className="MoviesCard__title reset-txt">{card.nameRU}</h2>
            <button className={`MoviesCard__like ${savedFilms ? 'MoviesCard__like_active' : ''} `}
                    onClick={() => setSavedFilms(!savedFilms)} type="button"
                    aria-label="лайк"></button>
          </div>
          <span className="MoviesCard__time">{Math.floor(card.duration / 60)}ч {card.duration % 60}м</span>
        </article>
      </li>
    </>);
};
export default MoviesCard;
