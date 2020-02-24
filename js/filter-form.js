'use strict';

(function () {
  var MIN_PRICE = window.constants.MIN_PRICE;
  var MAX_PRICE = window.constants.MAX_PRICE;
  var form = document.querySelector('.map__filters');
  var typeSelect = form.querySelector('#housing-type');
  var priceSelect = form.querySelector('#housing-price');
  var roomsSelect = form.querySelector('#housing-rooms');
  var guestsSelect = form.querySelector('#housing-guests');
  var selects = form.querySelectorAll('.map__filter');
  var featuresGroup = form.querySelector('.map__features');
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

  var isSuited = function (item) {
    var typeSuited = true;
    var priceSuited = true;
    var roomsSuited = true;
    var guestsSuited = true;
    var wifiSuited = true;
    var dishwasherSuited = true;
    var parkingSuited = true;
    var washerSuited = true;
    var elevatorSuited = true;
    var conditionerSuited = true;
    var featuresArray = item.offer.features;


    if (wifiFeature.checked) {
      wifiSuited = featuresArray.includes('wifi');
    }

    if (dishwasherFeature.checked) {
      dishwasherSuited = featuresArray.includes('dishwasher');
    }

    if (parkingFeature.checked) {
      parkingSuited = featuresArray.includes('parking');
    }

    if (washerFeature.checked) {
      washerSuited = featuresArray.includes('washer');
    }

    if (elevatorFeature.checked) {
      elevatorSuited = featuresArray.includes('elevator');
    }

    if (conditionerFeature.checked) {
      conditionerSuited = featuresArray.includes('conditioner');
    }

    if (typeSelect.value !== 'any') {
      typeSuited = item.offer.type === typeSelect.value;
    }

    if (priceSelect.value !== 'any') {
      if (priceSelect.value === 'low') {
        priceSuited = item.offer.price < MIN_PRICE;
      } else if (priceSelect.value === 'middle') {
        priceSuited = item.offer.price >= MIN_PRICE && item.offer.price <= MAX_PRICE;
      } else {
        priceSuited = item.offer.price > MAX_PRICE;
      }
    }

    if (typeSelect.value !== 'any') {
      typeSuited = item.offer.type === typeSelect.value;
    }

    if (roomsSelect.value !== 'any') {
      roomsSuited = item.offer.rooms === +roomsSelect.value;
    }

    if (guestsSelect.value !== 'any') {
      guestsSuited = item.offer.guests === guestsSelect.value;
    }

    return typeSuited && priceSuited && roomsSuited && guestsSuited && wifiSuited && conditionerSuited && dishwasherSuited && parkingSuited && washerSuited && elevatorSuited;
  };

  var formElementChangeHandler = function () {
    var serverData = window.serverData;
    var data = serverData.filter(isSuited);
    removeCard();
    removePins();
    renderPins(data);
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
