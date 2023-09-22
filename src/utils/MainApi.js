const beatfilm = 'https://api.nomoreparties.co';
const _api = {
  BASE_URL: 'https://api.voredev.nomoreparties.co',
  HEADERS: {
    'Content-Type': 'application/json',
  },
};

const _getResponseData = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(new Error(res.status));
};

const _request = (url, options) => fetch(url, options).then(_getResponseData);

// Инициализация User
export const getUserData = () => _request(`${_api.BASE_URL}/users/me`, {
  method: 'GET',
  headers: {
    ..._api.HEADERS,
    authorization: `Bearer ${localStorage.getItem('jwt')}`,
  },
});

// Инициализация Movies
export const getSavedMovies = () => _request(`${_api.BASE_URL}/movies`, {
  method: 'GET',
  headers: {
    ..._api.HEADERS,
    authorization: `Bearer ${localStorage.getItem('jwt')}`,
  },
});

// Добавление фильма
export const addToSavedMovies = (movie) => _request(`${_api.BASE_URL}/movies`, {
  method: 'POST',
  headers: {
    ..._api.HEADERS,
    authorization: `Bearer ${localStorage.getItem('jwt')}`,
  },
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
  headers: {
    ..._api.HEADERS,
    authorization: `Bearer ${localStorage.getItem('jwt')}`,
  },
});

// Редактирование профиля
export const saveDataInfo = (name, email) => _request(`${_api.BASE_URL}/users/me`, {
  method: 'PATCH',
  headers: {
    ..._api.HEADERS,
    authorization: `Bearer ${localStorage.getItem('jwt')}`,
  },
  body: JSON.stringify({ name, email }),
});

export default {
  addToSavedMovies, getSavedMovies, getUserData, deleteSavedMovies, saveDataInfo,
};
