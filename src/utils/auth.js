const _api = {
  BASE_URL: 'https://api.voredev.nomoreparties.co',
  HEADERS: {
    Accept: 'application/json',
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

// Регистрация пользователя
export const registerUser = (name, password, email) => _request(`${_api.BASE_URL}/signup`, {
  method: 'POST',
  headers: _api.HEADERS,
  body: JSON.stringify({name, password, email}),
});

// Авторизация пользователя
export const authorizeUser = (password, email) => _request(`${_api.BASE_URL}/signin`, {
  method: 'POST',
  headers: _api.HEADERS,
  body: JSON.stringify({password, email}),
});

// Аутинфикация пользователя
export const checkTokenUser = () => _request(`${_api.BASE_URL}/users/me`, {
  method: "GET",
  headers: {
    ..._api.HEADERS,
    authorization: `Bearer ${localStorage.getItem('jwt')}`
  },
});


export default {registerUser, authorizeUser, checkTokenUser};
