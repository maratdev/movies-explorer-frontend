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
      const movieRu = movie.nameRU.toLowerCase();
      const movieEn = movie.nameEN.toLowerCase();
      const userMovie = userQuery.toLowerCase().trim();
      return movieRu.includes(userMovie) || movieEn.includes(userMovie);
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
      console.log(filterShortMovies.length)

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
        if (filteredMovies.length === 0) {
          setIsInfoTooltip('ничего не найдено');
        }

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
