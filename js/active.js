'use strict';

(function () {
  var ENTER_KEY = window.constants.ENTER_KEY;
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var downloadData = window.download.getData;

  var activePage = function () {
    downloadData();
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
