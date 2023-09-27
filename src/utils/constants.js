const SERVER_REQUEST_ERROR = 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз';
const SERVER_REQUEST_BAD = 'Ошибка запроса на сервер';
const NOTHING_FOUND = 'Ничего не найдено 🤷‍♂️';
const REQUEST_USERDATA_ERROR = 'Ошибка получения данных о пользователе';

const successRegistration = 'Вы успешно зарегистрировались!';
const successProfile = 'Ваши данные успешно сохранены!';
const duplicateEmailError = 'Пользователь с таким email уже существует';
const wrongCredentialsError = 'Неверный адрес электронной почты или пароль';
const wrongValidation = 'Ошибка в имени или email';
const wrongEmpty = 'Данные не сохранены:  Вы не изменяли данные';

const regexEmail = /^[0-9A-Za-z_!.+]+@[0-9A-Za-z_]+.[a-z_]{2,}/;
// Chrome и Firefox трубуют экранирования символа -
const regexName = /^[A-Za-zА-Яа-яЁё_\-]{2,}/; // eslint-disable-line

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
  REQUEST_USERDATA_ERROR,
  duplicateEmailError,
  wrongCredentialsError,
  successRegistration,
  wrongValidation,
  successProfile,
  regexEmail,
  regexName,
  wrongEmpty,
};
