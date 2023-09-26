import {useCallback, useState, useEffect} from 'react';
import SearchForm from '../SearchForm/SearchForm.jsx';
import MoviesCardList from '../MoviesCardList/MoviesCardList.jsx';
import {NOTHING_FOUND, SERVER_REQUEST_ERROR} from '../../utils/constants';
import {getAllMovies} from '../../utils/MoviesApi';
import {filterShortMovies, filterMovies} from '../../utils/utilities';

const Movies = ({
                  setIsInfoTooltip, isInfoTooltip, toDelete, toSaved, localMovieList, serverInfo,
                }) => {
// ----------------------------------Поиск фильмов-----------------------------------------------/
  const [isLoader, setIsLoader] = useState(false);
  const [initialMovies, setInitialMovies] = useState([]); // фильмы полученные с запроса
  const [searchText, setSearchText] = useState(''); // запрос с инпута
  const [shortMovies, setShortMovies] = useState(false); // чекбокс
  const [filteredMovies, setFilteredMovies] = useState([]); // отфильтрованные по чекбоксу

  const storageMovies = localStorage.getItem('movies');
  const storageSearchMovies = localStorage.getItem('searchMovies');
  const storageSearch = localStorage.getItem('search');
  const storageShort = localStorage.getItem('short');

  // ---------------------Инициализация MoviesApi------------------------/
  const [movieListAll, setMovieListAll] = useState([]);

  const loadUserAndMovie = () => {
    getAllMovies()
      .then((newMovie) => {
        setMovieListAll(newMovie);
        localStorage.setItem('movies', JSON.stringify(newMovie));
      })
      .catch(() => setIsInfoTooltip(SERVER_REQUEST_ERROR));
  };

  console.log(initialMovies)
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
      localStorage.setItem('short', JSON.stringify({check: !shortMovies}));
      setIsLoader(false);
    }, 600);
  }, [shortMovies, initialMovies]);

  // -----------------------------Вывод фильмов-----------------------------------/
  const movieQuery = (query) => {
    setIsLoader(true);
    setTimeout(() => {
      if (query.length) {
        const moviesList = filterMovies(movieListAll, query);
        setInitialMovies(moviesList);
        setFilteredMovies(
          shortMovies ? filterShortMovies(moviesList) : moviesList,
        );
        if (filteredMovies.length === 0) setIsInfoTooltip(NOTHING_FOUND);
        localStorage.setItem('searchMovies', JSON.stringify(moviesList));
        localStorage.setItem('search', JSON.stringify({query}));
      }
      setIsLoader(false);
    }, 600);
  };

  // ----------------------------Вывод фильмов из localStorage --------------------------------- /
  useEffect(() => {
    if (storageMovies === null) {
      loadUserAndMovie();
    }
    let arr = [];
    if (storageMovies !== null) {
      arr = JSON.parse(storageSearchMovies); // отфильтрованые фильмы
      setMovieListAll(JSON.parse(storageMovies) || []);
      setFilteredMovies(arr|| []);
      setInitialMovies(arr || [])
    }

    if (storageSearch !== null) {
      const {query} = JSON.parse(storageSearch); // поисковый запрос
      setSearchText(query || '');
      setIsInfoTooltip(NOTHING_FOUND);
    }
    if (storageShort !== null) {
      const {check} = JSON.parse(storageShort); // чекбокс true/false
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
        serverInfo={serverInfo}
        localMovieList={localMovieList}
        toDelete={toDelete}
        toSaved={toSaved}
        isLoader={isLoader}
        isInfoTooltip={isInfoTooltip}
        movieList={filteredMovies}
        isSavedFilms={true}/>
    </main>
  );
};
export default Movies;
