'use strict';

(function () {
  var MIN_PRICE = window.constants.MIN_PRICE;
  var MAX_PRICE = window.constants.MAX_PRICE;
  var DEBOUNCE_INTERVAL = window.constants.DEBOUNCE_INTERVAL;
  var form = document.querySelector('.map__filters');
  var typeSelect = form.querySelector('#housing-type');
  var priceSelect = form.querySelector('#housing-price');
  var roomsSelect = form.querySelector('#housing-rooms');
  var guestsSelect = form.querySelector('#housing-guests');
  var selects = form.querySelectorAll('.map__filter');
  var featuresGroup = form.querySelector('.map__features');
  var features = featuresGroup.querySelectorAll('.map__checkbox');
  var wifiFeature = featuresGroup.querySelector('#filter-wifi');
  var dishwasherFeature = featuresGroup.querySelector('#filter-dishwasher');
  var parkingFeature = featuresGroup.querySelector('#filter-parking');
  var washerFeature = featuresGroup.querySelector('#filter-washer');
  var elevatorFeature = featuresGroup.querySelector('#filter-elevator');
  var conditionerFeature = featuresGroup.querySelector('#filter-conditioner');
  var lastTimeout;
  var removeCard = window.card.remove;
  var renderPins = window.pins.render;
  var removePins = window.pins.remove;

  var toggleForm = function () {
    form.reset();
    selects.forEach(function (item) {
      item.disabled = !item.disabled;
    });
    featuresGroup.disabled = !featuresGroup.disabled;
  };

  var isSuitedItem = function (item) {
    var isFeaturesSuited = true;
    var isTypeSuited = true;
    var isPriceSuited = true;
    var isRoomsSuited = true;
    var isGuestsSuited = true;
    var featuresArray = item.offer.features;

    for (var i = 0; i < features.length && isFeaturesSuited; i++) {
      if (features[i].checked) {
        isFeaturesSuited = featuresArray.includes(features[i].value);
      }
    }

    if (typeSelect.value !== 'any') {
      isTypeSuited = item.offer.type === typeSelect.value;
    }

    if (priceSelect.value !== 'any') {
      switch (priceSelect.value) {
        case 'low':
          isPriceSuited = item.offer.price < MIN_PRICE;
          break;
        case 'middle':
          isPriceSuited = item.offer.price >= MIN_PRICE && item.offer.price <= MAX_PRICE;
          break;
        case 'high':
          isPriceSuited = item.offer.price > MAX_PRICE;
      }
    }

    if (roomsSelect.value !== 'any') {
      isRoomsSuited = item.offer.rooms === +roomsSelect.value;
    }

    if (guestsSelect.value !== 'any') {
      isGuestsSuited = item.offer.guests === guestsSelect.value;
    }

    return isFeaturesSuited && isTypeSuited && isPriceSuited && isRoomsSuited && isGuestsSuited;
  };

  var debounce = function (cb) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
  };

  var formElementChangeHandler = function () {
    debounce(function () {
      var serverData = window.serverData;
      var data = serverData.filter(isSuitedItem);
      removeCard();
      removePins();
      renderPins(data);
    });
  };

  typeSelect.addEventListener('change', formElementChangeHandler);
  priceSelect.addEventListener('change', formElementChangeHandler);
  roomsSelect.addEventListener('change', formElementChangeHandler);
  guestsSelect.addEventListener('change', formElementChangeHandler);
  wifiFeature.addEventListener('change', formElementChangeHandler);
  dishwasherFeature.addEventListener('change', formElementChangeHandler);
  parkingFeature.addEventListener('change', formElementChangeHandler);
  washerFeature.addEventListener('change', formElementChangeHandler);
  elevatorFeature.addEventListener('change', formElementChangeHandler);
  conditionerFeature.addEventListener('change', formElementChangeHandler);


  toggleForm();

  window.filterForm = {
    toggle: toggleForm,
  };
})();
