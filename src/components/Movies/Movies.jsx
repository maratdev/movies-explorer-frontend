import SearchForm from '../SearchForm/SearchForm.jsx';
import MoviesCardList from '../MoviesCardList/MoviesCardList.jsx';
import {useState} from "react";

const Movies = ({movies}) => {

//----------------------------------Поиск фильмов------------------------/
  const [filteredCards, setFilteredCards] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  const [isInfoTooltip, setIsInfoTooltip] = useState('');
  const movieQuery = (query) => {
    setIsLoader(true)
    setTimeout(()=>{
      if (query.length) {
        let arr = movies.filter((card) => card.nameRU.toLowerCase().indexOf(query) >= 0)
        !arr.length ? setIsInfoTooltip('Ничего не найдено') :setIsInfoTooltip('') //вывод "ничего не найдено"
        setFilteredCards(arr)
      }
      setIsLoader(false)
    }, 600)


  }

  return (
    <main>
      <SearchForm movieQuery={movieQuery}/>
      <MoviesCardList isLoader={isLoader} isInfoTooltip={isInfoTooltip} movieList={filteredCards} isSavedFilms={true}/>
    </main>
    )

}
export default Movies;
