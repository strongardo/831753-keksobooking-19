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
  var removeCard = window.card.remove;
  var renderPins = window.pins.render;
  var removePins = window.pins.remove;

  var toggleForm = function () {
    selects.forEach(function (item) {
      item.disabled = !item.disabled;
    });
    featuresGroup.disabled = !featuresGroup.disabled;
  };

  var isSuitedItem = function (item) {
    var isSuited = true;
    var featuresArray = item.offer.features;

    for (var i = 0; i < features.length && isSuited; i++) {
      if (features[i].checked) {
        isSuited = featuresArray.includes(features[i].value);
      }
    }

    if (typeSelect.value !== 'any' && isSuited) {
      isSuited = item.offer.type === typeSelect.value;
    }

    if (priceSelect.value !== 'any' && isSuited) {
      switch (priceSelect.value) {
        case 'low':
          isSuited = item.offer.price < MIN_PRICE;
          break;
        case 'middle':
          isSuited = item.offer.price >= MIN_PRICE && item.offer.price <= MAX_PRICE;
          break;
        case 'high':
          isSuited = item.offer.price > MAX_PRICE;
      }
    }

    if (typeSelect.value !== 'any' && isSuited) {
      isSuited = item.offer.type === typeSelect.value;
    }

    if (roomsSelect.value !== 'any' && isSuited) {
      isSuited = item.offer.rooms === +roomsSelect.value;
    }

    if (guestsSelect.value !== 'any' && isSuited) {
      isSuited = item.offer.guests === guestsSelect.value;
    }

    return isSuited;
  };

  var lastTimeout;
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
