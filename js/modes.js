'use strict';

(function () {
  var ENTER_KEY = 'Enter';
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');

  var toggleMap = function () {
    map.classList.toggle('map--faded');
  };

  var togglePage = function () {
    toggleMap();
    window.form.toggleForm();
    window.pins.togglePins();
    window.card.toggleCard();
  };

  var mainPinClickHandler = function (evt) {
    if (evt.buttons === 1) {
      togglePage();
    }
  };

  var mainPinEnterDownHandler = function (evt) {
    if (evt.key === ENTER_KEY) {
      togglePage();
    }
  };

  mainPin.addEventListener('mousedown', mainPinClickHandler);
  mainPin.addEventListener('keydown', mainPinEnterDownHandler);
})();
