'use strict';

(function () {
  var MAIN_PIN_X = window.constants.MAIN_PIN_X;
  var MAIN_PIN_Y = window.constants.MAIN_PIN_Y;
  var MAIN_PIN_GAP = window.constants.MAIN_PIN_GAP;
  var PIN_GAP_X = window.constants.PIN_GAP_X;
  var PIN_GAP_Y = window.constants.PIN_GAP_Y;
  var HUNDRED_ROOMS_INDEX = window.constants.HUNDRED_ROOMS_INDEX;
  var NOT_FOR_GUESTS_INDEX = window.constants.NOT_FOR_GUESTS_INDEX;
  var form = document.querySelector('.ad-form');
  var address = form.querySelector('#address');
  var fieldsets = form.querySelectorAll('fieldset');
  var typeSelect = form.querySelector('#type');
  var price = form.querySelector('#price');
  var roomsSelect = form.querySelector('#room_number');
  var timeinSelect = form.querySelector('#timein');
  var timeoutSelect = form.querySelector('#timeout');
  var capacitySelect = form.querySelector('#capacity');
  var capacityOptions = capacitySelect.querySelectorAll('option');
  var PriceMap = window.constants.PriceMap;

  var fillAddress = function (xCoordinate, yCoordinate) {
    if (form.classList.contains('ad-form--disabled')) {
      address.value = (xCoordinate + MAIN_PIN_GAP) + ', ' + (yCoordinate + MAIN_PIN_GAP);
    } else {
      address.value = (xCoordinate + PIN_GAP_X) + ', ' + (yCoordinate + PIN_GAP_Y);
    }
  };

  var toggleFieldsets = function () {
    fieldsets.forEach(function (item) {
      item.disabled = !item.disabled;
    });
  };

  var disableCapacityOptions = function () {
    capacityOptions.forEach(function (item) {
      item.disabled = true;
    });
  };

  var disablePrice = function () {
    price.disabled = true;
  };

  var toggleForm = function () {
    form.classList.toggle('ad-form--disabled');
    toggleFieldsets();
    fillAddress(MAIN_PIN_X, MAIN_PIN_Y);
    disableCapacityOptions();
    disablePrice();
  };

  var timeinSelectChangeHandler = function () {
    timeoutSelect.options[timeinSelect.selectedIndex].selected = true;
  };

  var timeoutSelectChangeHandler = function () {
    timeinSelect.options[timeoutSelect.selectedIndex].selected = true;
  };

  var roomsSelectChangeHandler = function () {
    capacitySelect.options[roomsSelect.selectedIndex].selected = true;
    disableCapacityOptions();

    if (roomsSelect.selectedIndex < HUNDRED_ROOMS_INDEX) {
      for (var i = 0; i <= roomsSelect.selectedIndex; i++) {
        capacitySelect.options[i].disabled = false;
      }
    } else {
      capacitySelect.options[NOT_FOR_GUESTS_INDEX].disabled = false;
    }
  };

  var typeSelectChangeHandler = function () {
    price.placeholder = PriceMap[typeSelect.value];
    price.min = PriceMap[typeSelect.value];
    price.disabled = false;
  };

  roomsSelect.addEventListener('change', roomsSelectChangeHandler);
  typeSelect.addEventListener('change', typeSelectChangeHandler);
  timeinSelect.addEventListener('change', timeinSelectChangeHandler);
  timeoutSelect.addEventListener('change', timeoutSelectChangeHandler);

  toggleFieldsets();
  fillAddress(MAIN_PIN_X, MAIN_PIN_Y);

  window.form = {
    toggle: toggleForm,
    fillAddress: fillAddress,
  };
})();
