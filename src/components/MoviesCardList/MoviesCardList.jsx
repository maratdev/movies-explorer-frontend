import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard.jsx';

const MoviesCardList = ({ cards, isSavedFilms }) => (
  <section className="MoviesCardList">
    <div className="MoviesCardList__wrap">
      <ul className="MoviesCardList__grid">
        {cards.map((card) => (
          <MoviesCard key={card.id} card={card}/>
        ))}
      </ul>
      <div className="MoviesCardList__more">
        {isSavedFilms && <button aria-label="Еще" className="MoviesCardList__btn-more">Еще</button>}
      </div>
    </div>
  </section>
);

export default MoviesCardList;
