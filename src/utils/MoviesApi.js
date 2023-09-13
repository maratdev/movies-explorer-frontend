const _api = {
  BASE_URL: 'https://api.nomoreparties.co/beatfilm-movies',
  HEADERS: {
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

// Инициализация Card
export const getAllMovies = () => _request(_api.BASE_URL, {
  method: 'GET',
  headers: _api.HEADERS,
});

export default { getAllMovies };
