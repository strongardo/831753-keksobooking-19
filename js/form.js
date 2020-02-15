'use strict';

(function () {
  var form = document.querySelector('.ad-form');
  var address = form.querySelector('#address');
  var mainPinX = 570;
  var mainPinY = 375;
  var mainPinGap = 80;
  var pinGapX = 32;
  var pinGapY = 82;
  var fieldsets = form.querySelectorAll('fieldset');
  var typeSelect = form.querySelector('#type');
  var price = form.querySelector('#price');
  var roomsSelect = form.querySelector('#room_number');
  var timeinSelect = form.querySelector('#timein');
  var timeoutSelect = form.querySelector('#timeout');
  var capacitySelect = form.querySelector('#capacity');
  var capacityOptions = capacitySelect.querySelectorAll('option');
  var roomIndex = 3;
  var capacityIndex = 3;

  var priceConformity = {
    'palace': '10000',
    'flat': '1000',
    'house': '5000',
    'bungalo': '0',
  };

  var fillAddress = function () {
    if (form.classList.contains('ad-form--disabled')) {
      address.value = (mainPinX + mainPinGap) + ', ' + (mainPinY + mainPinGap);
    } else {
      address.value = (mainPinX + pinGapX) + ', ' + (mainPinY + pinGapY);
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
    fillAddress();
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

    if (roomsSelect.selectedIndex < roomIndex) {
      for (var i = 0; i <= roomsSelect.selectedIndex; i++) {
        capacitySelect.options[i].disabled = false;
      }
    } else {
      capacitySelect.options[capacityIndex].disabled = false;
    }
  };

  var typeSelectChangeHandler = function () {
    price.placeholder = priceConformity[typeSelect.value];
    price.min = priceConformity[typeSelect.value];
    price.disabled = false;
  };

  roomsSelect.addEventListener('change', roomsSelectChangeHandler);
  typeSelect.addEventListener('change', typeSelectChangeHandler);
  timeinSelect.addEventListener('change', timeinSelectChangeHandler);
  timeoutSelect.addEventListener('change', timeoutSelectChangeHandler);

  toggleFieldsets();
  fillAddress();

  window.form = {
    toggle: toggleForm,
  };
})();
