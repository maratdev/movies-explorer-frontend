import SearchForm from '../SearchForm/SearchForm.jsx';
import MoviesCardList from '../MoviesCardList/MoviesCardList.jsx';
import {useState} from "react";

const Movies = ({movies, setIsInfoTooltip, isInfoTooltip}) => {

//----------------------------------Поиск фильмов------------------------/
  const [isLoader, setIsLoader] = useState(false);

  //----------------------------------Чекбокс---------------------------/
  const [filteredMovies, setFilteredMovies] = useState([]); // отфильтрованные по чекбоксу и запросу фильмы

  // фильтрация по длительности
  function filterShortMovies(movies) {
    return movies.filter(movie => movie.duration < 40);
  }

  const [shortMovies, setShortMovies] = useState(false); // состояние чекбокса
  // состояние чекбокса
  function handleShortFilms() {
    setShortMovies(!shortMovies);
    console.log('чекбокс')
  }


  const movieQuery = (query) => {
    String(query).trim().toLowerCase()
    setIsLoader(true)
    setTimeout(()=>{
      if (query.length) {
        let arr = movies.filter((card) => card.nameRU.indexOf(query) >= 0)

        setFilteredMovies(
          shortMovies ? filterShortMovies(arr) : arr
        );

       !arr.length || shortMovies ? setIsInfoTooltip('Ничего не найдено') : setIsInfoTooltip('') //вывод "ничего не найдено"

      }
      setIsLoader(false)
    }, 600)

  }

  return (
    <main>
      <SearchForm shortMovies={shortMovies} handleShortFilms={handleShortFilms} movieQuery={movieQuery}/>
      <MoviesCardList isLoader={isLoader} isInfoTooltip={isInfoTooltip} movieList={filteredMovies} isSavedFilms={true}/>
    </main>
    )

}
export default Movies;
