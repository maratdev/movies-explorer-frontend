import { useState, useEffect } from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm.jsx';
import MoviesCardList from '../MoviesCardList/MoviesCardList.jsx';
import { getSavedMovies } from '../../utils/MainApi';
import { NOTHING_FOUND } from '../../utils/constants';

const SavedMovies = ({ setIsInfoTooltip, isInfoTooltip }) => {
  const [savedMovies, setSavedMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState(savedMovies); // отфильтрованные фильмы
  const [isLoader, setIsLoader] = useState(false);

  const [searchText, setSearchText] = useState(''); // запрос с инпута
  const [shortMovies, setShortMovies] = useState(false); // чекбокс

  useEffect(() => {
    getSavedMovies()
      .then((initialMovie) => {
        setSavedMovies(initialMovie);
        setFilteredMovies(initialMovie);
      })
      .catch(console.error);
  }, []);

  const filterShortMovies = (request) => request.filter((movie) => movie.duration < 40);
  // фильтрация по названию
  const filterMovies = (arr, userQuery) => savedMovies.filter((movie) => {
    const movieRu = movie.nameRU.toLowerCase();
    const movieEn = movie.nameEN.toLowerCase();
    const userMovie = userQuery.toLowerCase().trim();
    return movieRu.includes(userMovie) || movieEn.includes(userMovie);
  });

  const movieQuery = (query) => {
    setIsLoader(true);
    setTimeout(() => {
      if (query.length) {
        const filterMoviesList = filterMovies(savedMovies, query);
        setFilteredMovies(
          shortMovies ? filterShortMovies(filterMoviesList) : filterMoviesList,
        );
        console.log(filteredMovies.length);
        if (filteredMovies.length === 0) setIsInfoTooltip(NOTHING_FOUND);
      }
      setIsLoader(false);
    }, 600);
  };

  return (
    <main>
      <SearchForm
        searchText={searchText}
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
export default SavedMovies;
