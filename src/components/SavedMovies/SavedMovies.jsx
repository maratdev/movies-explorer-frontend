import { useState, useEffect, useCallback } from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm.jsx';
import MoviesCardList from '../MoviesCardList/MoviesCardList.jsx';
import { getSavedMovies } from '../../utils/MainApi';
import { filterShortMovies, filterMovies } from '../../utils/utilities';
import { NOTHING_FOUND, SERVER_REQUEST_ERROR } from '../../utils/constants';

const SavedMovies = ({ setIsInfoTooltip, isInfoTooltip }) => {
  const [isLoader, setIsLoader] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState([]); // отфильтрованные фильмы
  const [shortMovies, setShortMovies] = useState(false); // чекбокс
  const [initialMovies, setInitialMovies] = useState([]); // фильмы полученные с запроса

  // ---------------------Инициализация MainApi------------------------/
  const [savedMovies, setSavedMovies] = useState([]);
  useEffect(() => {
    getSavedMovies()
      .then((initialMovie) => {
        setSavedMovies(initialMovie);
        setFilteredMovies(initialMovie);
        setInitialMovies(initialMovie);
      })
      .catch(() => setIsInfoTooltip(SERVER_REQUEST_ERROR));

    if (filteredMovies.length === 0) setIsInfoTooltip(NOTHING_FOUND);
  }, []);

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
      setIsLoader(false);
    }, 600);
  }, [shortMovies, initialMovies]);

  // -----------------------------Вывод фильмов-----------------------------------/
  const movieQuery = (query) => {
    setIsLoader(true);
    setTimeout(() => {
      if (query.length) {
        const filterMoviesList = filterMovies(savedMovies, query);
        setInitialMovies(filterMoviesList);
        setFilteredMovies(
          shortMovies ? filterShortMovies(filterMoviesList) : filterMoviesList,
        );
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
export default SavedMovies;
