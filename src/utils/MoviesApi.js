const _api = {
  BASE_URL: 'https://api.nomoreparties.co/',
  HEADERS: {
    'Content-Type': 'application/json',
  },
};

function _getResponseData(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(new Error(`Ошибка ${res.status}`));
}

function _request(url, options) {
  return fetch(url, options).then(_getResponseData);
}

// Инициализация Card
export const getAllMovies = () => _request(`${_api.BASE_URL}beatfilm-movies`, {
  method: 'GET',
  headers: _api.HEADERS,
});

export default { getAllMovies };
