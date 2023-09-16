// ----------------------------------Фильтры----------------------------------/

// фильтрация по длительности (короткометражки)
export const filterShortMovies = (request) => request.filter((movie) => movie.duration < 40);

// фильтрация по названию
export const filterMovies = (moviesArr, userQuery) => moviesArr.filter((movie) => {
  const movieRu = movie.nameRU.toLowerCase();
  const movieEn = movie.nameEN.toLowerCase();
  const userMovie = userQuery.toLowerCase().trim();
  return movieRu.includes(userMovie) || movieEn.includes(userMovie);
});

// ------------------------ Отображение лайка избранных фильмов -------------------------------- /
export const findFavoriteMovies = (userMoviesArr, movie) => userMoviesArr
  .find((item) => item.movieId === movie.id);

export default { filterShortMovies, filterMovies, findFavoriteMovies };
