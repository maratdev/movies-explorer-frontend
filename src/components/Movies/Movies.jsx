import { useCallback, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm.jsx';
import MoviesCardList from '../MoviesCardList/MoviesCardList.jsx';

const Movies = ({ movies, setIsInfoTooltip, isInfoTooltip }) => {
// ----------------------------------Поиск фильмов-----------------------------------------------/
  const [isLoader, setIsLoader] = useState(false);
  const [initialMovies, setInitialMovies] = useState([]); // фильмы полученные с запроса

  // ----------------------------------Фильтр----------------------------------/

  const [filteredMovies, setFilteredMovies] = useState([]); // отфильтрованные по чекбоксу

  // фильтрация по длительности (короткометражки)
  const filterShortMovies = (request) => request.filter((movie) => movie.duration < 40);
  // фильтрация по названию
  const filterMovies = (arr, userQuery) => movies.filter((movie) => {
    const movieRu = movie.nameRU.toLowerCase();
    const movieEn = movie.nameEN.toLowerCase();
    const userMovie = userQuery.toLowerCase().trim();
    return movieRu.includes(userMovie) || movieEn.includes(userMovie);
  });

  // ----------------------- Состояние чекбокса --------------------------------/
  const [shortMovies, setShortMovies] = useState(false);
  const handleShortFilms = useCallback(() => {
    setIsLoader(true);
    setShortMovies(!shortMovies);
    setTimeout(() => {
      if (!shortMovies) {
        setFilteredMovies(filterShortMovies(initialMovies));
      } else {
        setFilteredMovies(initialMovies);
      }
      setIsLoader(false);
    }, 600);
  }, [shortMovies, initialMovies]);

  // -----------------------------Вывод фильмов-----------------------------------/

  const movieQuery = (query) => {
    setIsLoader(true);
    setTimeout(() => {
      if (query.length) {
        const moviesList = filterMovies(movies, query);
        setInitialMovies(moviesList);
        setFilteredMovies(
          shortMovies ? filterShortMovies(moviesList) : moviesList,
        );
        if (filteredMovies.length === 0) setIsInfoTooltip('Ничего не найдено 🤷‍♂️');
      }
      setIsLoader(false);
    }, 600);
  };

  return (
    <main>
      <SearchForm
        shortMovies={shortMovies}
        handleShortFilms={handleShortFilms}
        movieQuery={movieQuery}
      />
      <MoviesCardList
        isLoader={isLoader}
        isInfoTooltip={isInfoTooltip}
        movieList={filteredMovies}
        isSavedFilms={true}/>
    </main>
  );
};
export default Movies;
