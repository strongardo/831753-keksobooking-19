'use strict';

(function () {
  var MAIN_PIN_X = window.constants.MAIN_PIN_X;
  var MAIN_PIN_Y = window.constants.MAIN_PIN_Y;
  var MAIN_PIN_GAP = window.constants.MAIN_PIN_GAP;
  var PIN_GAP_X = window.constants.PIN_GAP_X;
  var PIN_GAP_Y = window.constants.PIN_GAP_Y;
  var ONE_ROOMS_INDEX = window.constants.ONE_ROOMS_INDEX;
  var TWO_ROOMS_INDEX = window.constants.TWO_ROOMS_INDEX;
  var HUNDRED_ROOMS_INDEX = window.constants.HUNDRED_ROOMS_INDEX;
  var NOT_FOR_GUESTS_INDEX = window.constants.NOT_FOR_GUESTS_INDEX;
  var AVATAR_URL = window.constants.AVATAR_URL;
  var form = document.querySelector('.ad-form');
  var address = form.querySelector('#address');
  var fieldsets = form.querySelectorAll('fieldset');
  var typeSelect = form.querySelector('#type');
  var price = form.querySelector('#price');
  var roomsSelect = form.querySelector('#room_number');
  var timeinSelect = form.querySelector('#timein');
  var timeoutSelect = form.querySelector('#timeout');
  var capacitySelect = form.querySelector('#capacity');
  var resetButton = form.querySelector('.ad-form__reset');
  var avatar = form.querySelector('.ad-form-header__preview img[alt="Аватар пользователя"]');
  var housingImage = form.querySelector('.ad-form__photo');
  var template = document.querySelector('#success').content.querySelector('.success');
  var capacityOptions = capacitySelect.querySelectorAll('option');
  var PriceMap = window.constants.PriceMap;
  var resetPage = window.inactive.resetPage;
  var createMessage = window.messages.createUploadMessage;
  var createXhr = window.xhr.create;
  var xhrUploadSuccessHandler = window.uploadHandlers.success;
  var xhrUploadErrorHandler = window.uploadHandlers.error;

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

  var disableCapacityOptions = function (index) {
    for (var i = index; i < capacityOptions.length; i++) {
      capacityOptions[i].disabled = true;
    }
  };

  var resetPricePlaceholder = function () {
    price.placeholder = PriceMap[typeSelect.value];
  };

  var resetImages = function () {
    avatar.src = AVATAR_URL;
    housingImage.style.backgroundImage = 'none';
  };

  var toggleForm = function () {
    form.reset();
    form.classList.toggle('ad-form--disabled');
    toggleFieldsets();
    fillAddress(MAIN_PIN_X, MAIN_PIN_Y);
    disableCapacityOptions(TWO_ROOMS_INDEX);
    resetPricePlaceholder();
    resetImages();
  };

  var timeinSelectChangeHandler = function () {
    timeoutSelect.options[timeinSelect.selectedIndex].selected = true;
  };

  var timeoutSelectChangeHandler = function () {
    timeinSelect.options[timeoutSelect.selectedIndex].selected = true;
  };

  var roomsSelectChangeHandler = function () {
    capacitySelect.options[roomsSelect.selectedIndex].selected = true;
    disableCapacityOptions(ONE_ROOMS_INDEX);

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
  };

  roomsSelect.addEventListener('change', roomsSelectChangeHandler);
  typeSelect.addEventListener('change', typeSelectChangeHandler);
  timeinSelect.addEventListener('change', timeinSelectChangeHandler);
  timeoutSelect.addEventListener('change', timeoutSelectChangeHandler);

  resetButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    toggleForm();
    resetPage();
  });

  var formSubmitHandler = function () {
    toggleForm();
    createMessage(template);
  };

  form.addEventListener('submit', function (evt) {
    var data = new FormData(form);
    createXhr(xhrUploadSuccessHandler, xhrUploadErrorHandler, data, formSubmitHandler);
    evt.preventDefault();
  });

  toggleFieldsets();
  fillAddress(MAIN_PIN_X, MAIN_PIN_Y);

  window.form = {
    toggle: toggleForm,
    fillAddress: fillAddress,
  };
})();
