'use strict';

(function () {
  var ENTER_KEY = 'Enter';
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var toggleForm = window.form.toggle;
  var togglePins = window.pins.toggle;
  var toggleCard = window.card.toggle;

  window.isActive = false;

  var toggleMap = function () {
    map.classList.toggle('map--faded');
  };

  var togglePage = function () {
    toggleMap();
    toggleForm();
    togglePins();
    toggleCard();
  };

  var mainPinMouseDownHandler = function (evt) {
    if (evt.buttons === 1) {
      togglePage();
      mainPin.removeEventListener('mousedown', mainPinMouseDownHandler);
    }
  };

  var mainPinEnterDownHandler = function (evt) {
    if (evt.key === ENTER_KEY) {
      togglePage();
      mainPin.removeEventListener('keydown', mainPinEnterDownHandler);
    }
  };

  mainPin.addEventListener('mousedown', mainPinMouseDownHandler);
  mainPin.addEventListener('keydown', mainPinEnterDownHandler);
})();
