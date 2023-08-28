import SearchForm from '../SearchForm/SearchForm.jsx';
import MoviesCardList from '../MoviesCardList/MoviesCardList.jsx';
import {useState} from "react";

const Movies = ({movies}) => {

//----------------------------------Поиск фильмов------------------------/
  const [filteredCards, setFilteredCards] = useState([]);

  const movieQuery = (query) => {
    if (query.length) {
      let arr = movies.filter((card) => card.nameRU.toLowerCase().indexOf(query) >= 0)
      setFilteredCards(arr)
    }
  }


  return (
    <main>
      <SearchForm movieQuery={movieQuery}/>
      <MoviesCardList movieList={filteredCards} isSavedFilms={true}/>
    </main>
    )

}
export default Movies;
