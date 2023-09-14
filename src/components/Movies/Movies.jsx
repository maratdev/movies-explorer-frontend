import { useCallback, useState, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm.jsx';
import MoviesCardList from '../MoviesCardList/MoviesCardList.jsx';
import { NOTHING_FOUND } from '../../utils/constants';

const Movies = ({ movies, setIsInfoTooltip, isInfoTooltip }) => {
// ----------------------------------Поиск фильмов-----------------------------------------------/
  const [isLoader, setIsLoader] = useState(false);
  const [initialMovies, setInitialMovies] = useState([]); // фильмы полученные с запроса
  const [searchText, setSearchText] = useState(''); // запрос с инпута
  const [shortMovies, setShortMovies] = useState(false); // чекбокс

  const storageMovies = localStorage.getItem('movies');
  const storageSearch = localStorage.getItem('search');
  const storageShort = localStorage.getItem('short');

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
  const handleShortFilms = useCallback(() => {
    setIsLoader(true);
    setShortMovies(!shortMovies);
    setTimeout(() => {
      if (!shortMovies) {
        setFilteredMovies(filterShortMovies(initialMovies));
      } else {
        setFilteredMovies(initialMovies);
      }
      localStorage.setItem('short', JSON.stringify({ check: !shortMovies }));
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
        if (filteredMovies.length === 0) setIsInfoTooltip(NOTHING_FOUND);
        localStorage.setItem('movies', JSON.stringify(moviesList));
        localStorage.setItem('search', JSON.stringify({ query }));
      }
      setIsLoader(false);
    }, 600);
  };
  useEffect(() => {
    let arr = [];
    if (storageMovies !== null) {
      arr = JSON.parse(storageMovies);
      setInitialMovies(arr);
      setFilteredMovies(arr);
    }
    if (storageSearch !== null) {
      const { query } = JSON.parse(storageSearch);
      setSearchText(query || '');
    }
    if (storageShort !== null) {
      const { check } = JSON.parse(storageShort);
      setShortMovies(check);
      if (check) {
        setFilteredMovies(filterShortMovies(arr));
      }
    }
  }, []);

  return (
    <main>
      <SearchForm
        searchText={searchText}
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
