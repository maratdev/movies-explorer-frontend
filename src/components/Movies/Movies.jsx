import SearchForm from '../SearchForm/SearchForm.jsx';
import MoviesCardList from '../MoviesCardList/MoviesCardList.jsx';
import moviesBd from '../../utils/MainApi.json';

const Movies = () => (
  <main>
    <SearchForm/>
    <MoviesCardList cards={moviesBd}/>
  </main>
);
export default Movies;
