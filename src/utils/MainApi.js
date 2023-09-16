const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGQ2NGFhNmUzNDY2OGI0YzY2OGU5MTYiLCJpYXQiOjE2OTQ2OTkyMzgsImV4cCI6MTY5NTMwNDAzOH0.XM-SvGG8uGjVau58xtPdyPuras9MFCrC7ZYhSfsadLo';
const beatfilm = 'https://api.nomoreparties.co';
const _api = {
  BASE_URL: 'https://api.voredev.nomoreparties.co',
  HEADERS: {
    authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
};

const _getResponseData = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(new Error(`Ошибка ${res.status}`));
};

const _request = (url, options) => fetch(url, options).then(_getResponseData);

// Инициализация Movies
export const getSavedMovies = () => _request(`${_api.BASE_URL}/movies`, {
  method: 'GET',
  headers: _api.HEADERS,
});

// Добавление фильма
export const addToSavedMovies = (movie) => _request(`${_api.BASE_URL}/movies`, {
  method: 'POST',
  credentials: 'include',
  headers: _api.HEADERS,
  body: JSON.stringify({
    country: movie.country || '',
    director: movie.director || '',
    duration: movie.duration || '',
    year: movie.year || '',
    description: movie.description || '',
    image: `${beatfilm}${movie.image.url}` || '',
    trailerLink: movie.trailerLink,
    thumbnail: `${beatfilm}${movie.image.url}` || '',
    movieId: movie.id,
    nameRU: movie.nameRU || '',
    nameEN: movie.nameEN || '',
  }),
});

// Удаление фильма
export const deleteSavedMovies = (movieId) => _request(`${_api.BASE_URL}/movies/${movieId}`, {
  method: 'DELETE',
  credentials: 'include',
  headers: _api.HEADERS,
});

export default { addToSavedMovies, getSavedMovies, deleteSavedMovies };
