import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm.jsx';
import MoviesCardList from '../MoviesCardList/MoviesCardList.jsx';
import moviesBd from '../../utils/MoviesApi.json';

const SavedMovies = () => (
  <main>
    <SearchForm/>
    <MoviesCardList cards={moviesBd} isSavedFilms={false}/>
  </main>
);
export default SavedMovies;
