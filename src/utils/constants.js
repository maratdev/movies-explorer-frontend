const SERVER_REQUEST_ERROR = 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз';
const NOTHING_FOUND = 'Ничего не найдено 🤷‍♂️';
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

export { DEVICE_SIZE, SERVER_REQUEST_ERROR, NOTHING_FOUND };
