'use strict';

(function () {
  var ENTER_KEY = window.constants.ENTER_KEY;
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var createXhr = window.xhr.create;
  var xhrDownloadSuccessHandler = window.downloadHandlers.success;
  var xhrDownloadErrorHandler = window.downloadHandlers.error;

  var activePage = function () {
    createXhr(xhrDownloadSuccessHandler, xhrDownloadErrorHandler);
    map.classList.remove('map--faded');
  };

  var mainPinMouseDownHandler = function (evt) {
    if (evt.buttons === 1) {
      if (map.classList.contains('map--faded')) {
        activePage();
      }
    }
  };

  var mainPinEnterDownHandler = function (evt) {
    if (evt.key === ENTER_KEY) {
      activePage();
      if (map.classList.contains('map--faded')) {
        activePage();
      }
    }
  };

  mainPin.addEventListener('mousedown', mainPinMouseDownHandler);
  mainPin.addEventListener('keydown', mainPinEnterDownHandler);
})();
