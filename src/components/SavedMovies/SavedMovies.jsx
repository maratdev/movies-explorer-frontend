import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm.jsx';
import MoviesCardList from '../MoviesCardList/MoviesCardList.jsx';
import moviesBd from '../../utils/MainApi.json';

const SavedMovies = () => (
  <main>
    <SearchForm/>
    <MoviesCardList cards={moviesBd}/>
  </main>
);
export default SavedMovies;
