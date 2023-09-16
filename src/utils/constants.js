const SERVER_REQUEST_ERROR = 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз';
const SERVER_REQUEST_BAD = 'Ошибка запроса на сервер';
const NOTHING_FOUND = 'Ничего не найдено 🤷‍♂️';

const successRegistration = 'Вы успешно зарегистрировались!';
const duplicateEmailError = 'Пользователь с таким email уже существует';
const wrongCredentialsError = 'Неправильная почта или пароль';
const DEVICE_SIZE = {
  desktop: {
    width: 1024,
    cards: {
      total: 16,
      more: 4,
    },
  },
  tablet: {
    width: 768,
    cards: {
      total: 8,
      more: 2,
    },
  },
  mobile: {
    width: 425,
    cards: {
      total: 5,
      more: 2,
    },
  },
};

export {
  DEVICE_SIZE,
  SERVER_REQUEST_ERROR,
  NOTHING_FOUND,
  SERVER_REQUEST_BAD,
  duplicateEmailError,
  wrongCredentialsError,
  successRegistration,
};