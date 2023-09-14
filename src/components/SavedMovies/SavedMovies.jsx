import { useState, useEffect } from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm.jsx';
import MoviesCardList from '../MoviesCardList/MoviesCardList.jsx';
import { getSavedMovies } from '../../utils/MainApi';

const SavedMovies = ({ movies, setIsInfoTooltip, isInfoTooltip }) => {
  const [isLoader, setIsLoader] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState([]); // отфильтрованные по чекбоксу

  useEffect(() => {
    getSavedMovies()
      .then((initialMovie) => {
        setFilteredMovies(initialMovie)
      })
      .catch(console.error);
  }, []);

  return (
    <main>
      <SearchForm/>
      <MoviesCardList
        isLoader={isLoader}
        isInfoTooltip={isInfoTooltip}
        movieList={filteredMovies}
        isSavedFilms={true}/>
    </main>
  );
};
export default SavedMovies;
