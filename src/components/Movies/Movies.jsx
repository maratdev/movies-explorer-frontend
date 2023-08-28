import SearchForm from '../SearchForm/SearchForm.jsx';
import MoviesCardList from '../MoviesCardList/MoviesCardList.jsx';


const Movies = (movieList) => {
  return (
    <main>
      <SearchForm/>
      <MoviesCardList movieList={movieList} isSavedFilms={true}/>
    </main>
    )

};
export default Movies;
