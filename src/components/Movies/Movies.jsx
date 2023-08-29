import SearchForm from '../SearchForm/SearchForm.jsx';
import MoviesCardList from '../MoviesCardList/MoviesCardList.jsx';
import {useState} from "react";

const Movies = ({movies, setIsInfoTooltip, isInfoTooltip}) => {

//----------------------------------Поиск фильмов------------------------/
  const [isLoader, setIsLoader] = useState(false);
  const [initialMovies, setInitialMovies] = useState([]); // фильмы полученные с запроса

  //----------------------------------Фильтр-----------------------------------------/

  const [filteredMovies, setFilteredMovies] = useState([]); // отфильтрованные по чекбоксу

  // фильтрация по длительности
  function filterShortMovies(movies) {
    return movies.filter(movie => movie.duration < 40);
  }

  function filterMovies(movies, userQuery) {
    return movies.filter((movie) => {
      const movieRu = String(movie.nameRU).toLowerCase().trim();
      const movieEn = String(movie.nameEN).toLowerCase().trim();
      const userMovie = userQuery.toLowerCase().trim();
      return movieRu.indexOf(userMovie) !== -1 || movieEn.indexOf(userMovie) !== -1;
    })
  }



// ----------------------- Состояние чекбокса -----------------------/
  const [shortMovies, setShortMovies] = useState(false);

  function handleShortFilms() {
    setIsLoader(true)
    setShortMovies(!shortMovies);
    setTimeout(()=>{
      if (!shortMovies) {
        setFilteredMovies(filterShortMovies(initialMovies));
      } else {
        setFilteredMovies(initialMovies);
      }
      setIsLoader(false)
    }, 600)

  }



//--------------------------------------------------------------------------/

  const movieQuery = (query) => {
    setIsLoader(true)

    setTimeout(()=>{
      if (query.length) {
        const moviesList = filterMovies(movies, query);
        setInitialMovies(moviesList);
        setFilteredMovies(
          shortMovies ? filterShortMovies(moviesList) : moviesList
        );

       !moviesList.length || shortMovies ? setIsInfoTooltip('Ничего не найдено') : setIsInfoTooltip('') //вывод "ничего не найдено"

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
