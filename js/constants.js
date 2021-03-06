'use strict';

(function () {
  window.constants = {
    ESCAPE_KEY: 'Escape',
    ENTER_KEY: 'Enter',
    PIN_GAP_X: 31,
    PIN_GAP_Y: 80,
    MAIN_PIN_X: 570,
    MAIN_PIN_Y: 375,
    MAIN_PIN_GAP: 80,
    MAX_OFFERS: 5,
    MIN_LIMIT_X: 0,
    MAX_LIMIT_X: 1198,
    MIN_LIMIT_Y: 130,
    MAX_LIMIT_Y: 630,
    ONE_ROOMS_INDEX: 0,
    TWO_ROOMS_INDEX: 1,
    HUNDRED_ROOMS_INDEX: 3,
    NOT_FOR_GUESTS_INDEX: 3,
    FEATURE_CLASS_INDEX: 1,
    FEATURE_NAME_START_INDEX: 16,
    MIN_PRICE: 10000,
    MAX_PRICE: 50000,
    DEBOUNCE_INTERVAL: 500,
    AVATAR_URL: 'img/muffin-grey.svg',
    FILE_TYPES: ['gif', 'jpg', 'jpeg', 'png'],
    TIMEOUT_IN_MS: 10000,
    DOWNLOAD_URL: 'https://js.dump.academy/keksobooking/data',
    UPLOAD_URL: 'https://js.dump.academy/keksobooking',
    DEFAULT_MESSAGE: 'Произошла ошибка соединения, попробуйте обновить страницу позже',
    StatusCodeMap: {
      OK: 200
    },
    TypeMap: {
      'palace': 'Дворец',
      'flat': 'Квартира',
      'house': 'Дом',
      'bungalo': 'Бунгало',
    },
    PriceMap: {
      'palace': '10000',
      'flat': '1000',
      'house': '5000',
      'bungalo': '0',
    },
  };
})();
