'use strict';

(function () {
  var MAIN_PIN_X = window.constants.MAIN_PIN_X;
  var MAIN_PIN_Y = window.constants.MAIN_PIN_Y;
  var removePins = window.pins.remove;
  var removeCard = window.card.remove;
  var toggleFilterForm = window.filterForm.toggle;
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');

  var resetPage = function () {
    removePins();
    removeCard();
    mainPin.style.top = MAIN_PIN_Y + 'px';
    mainPin.style.left = MAIN_PIN_X + 'px';
    map.classList.add('map--faded');
    toggleFilterForm();
  };

  window.inactive = {
    resetPage: resetPage,
  };
})();

