'use strict';

var similarAdsQuantity = 8;
var typesOfHousing = ['palace', 'flat', 'house', 'bungalo'];
var checks = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var pinMinX = 0;
var pinMaxX = 1200;
var pinMinY = 130;
var pinMaxY = 630;
var pinGapX = 32;
var pinGapY = 82;
var mainPinX = 570;
var mainPinY = 375;
var mainPinGap = 80;
var minPrice = 100;
var maxPrice = 10000;
var minRoomsQuantity = 1;
var maxRoomsQuantity = 5;
var minGuestsQuantity = 1;
var maxGuestsQuantity = 5;
var map = document.querySelector('.map');
var mapPinsAria = document.querySelector('.map__pins');
var mainPin = mapPinsAria.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var adFormFieldsets = adForm.querySelectorAll('fieldset');
var adFormAddress = adForm.querySelector('#address');
var adFormRoomNumber = adForm.querySelector('#room_number');
var adFormCapacity = adForm.querySelector('#capacity');
var capacityOptions = adFormCapacity.querySelectorAll('option');
var capacityThree = adFormCapacity.querySelector('option[value="3"]');
var capacityTwo = adFormCapacity.querySelector('option[value="2"]');
var capacityOne = adFormCapacity.querySelector('option[value="1"]');
var capacityZero = adFormCapacity.querySelector('option[value="0"]');

// utils.js
var getRandomElement = function (arr) {
  return arr[Math.floor(Math.random() * (arr.length))];
};

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function createRandomArray(arr) {
  var randomArr = [];
  for (var i = 0; i < getRandomNumber(1, arr.length + 1); i++) {
    randomArr.push(arr[i]);
  }
  return randomArr;
}

// data.js
var createHousingData = function (quantity) {
  var similarAds = [];
  var imageNumber = 0;

  for (var i = 0; i < quantity; i++) {

    var similarAd = {};
    var url = (imageNumber < 9) ? 'img/avatars/user0' : 'img/avatars/user';

    similarAd.author = {
      avatar: url + (++imageNumber) + '.png',
    };

    similarAd.offer = {
      title: 'title',
      address: '600, 350',
      price: getRandomNumber(minPrice, maxPrice),
      type: getRandomElement(typesOfHousing),
      rooms: getRandomNumber(minRoomsQuantity, maxRoomsQuantity),
      guests: getRandomNumber(minGuestsQuantity, maxGuestsQuantity),
      checkin: getRandomElement(checks),
      checkout: getRandomElement(checks),
      features: createRandomArray(features),
      description: 'description',
      photos: createRandomArray(photos),
    };

    similarAd.location = {
      x: getRandomNumber(pinMinX, pinMaxX),
      y: getRandomNumber(pinMinY, pinMaxY),
    };

    similarAds.push(similarAd);
  }
  return similarAds;
};

var housingData = createHousingData(similarAdsQuantity);

// pins.js
var createPin = function (obj) {
  var template = document.querySelector('#pin').content.querySelector('.map__pin');
  var ad = template.cloneNode(true);
  ad.style.left = obj.location.x + pinGapX + 'px';
  ad.style.top = obj.location.y + pinGapY + 'px';
  ad.children[0].src = obj.author.avatar;
  ad.children[0].alt = obj.offer.title;
  return ad;
};

var renderPins = function (ads, block) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < ads.length; i++) {
    fragment.appendChild(createPin(ads[i]));
  }

  block.appendChild(fragment);
};

// form.js
var fillAddress = function () {
  if (adForm.classList.contains('ad-form--disabled')) {
    adFormAddress.value = (mainPinX + mainPinGap) + ', ' + (mainPinY + mainPinGap);
  } else {
    adFormAddress.value = (mainPinX + pinGapX) + ', ' + (mainPinY + pinGapY);
  }
};

var disableFieldsets = function () {
  adFormFieldsets.forEach(function (item) {
    item.disabled = !item.disabled;
  });
};

var toggleForm = function () {
  adForm.classList.toggle('ad-form--disabled');
  disableFieldsets();
  fillAddress();

  capacityOptions.forEach(function (item) {
    item.disabled = true;
  });
};

adFormRoomNumber.addEventListener('change', function () {
  adFormCapacity.value = '';
  for (var i = 0; i < capacityOptions.length; i++) {
    capacityOptions[i].removeAttribute('disabled');
  }
  if (adFormRoomNumber.value === '100') {
    capacityThree.setAttribute('disabled', 'disabled');
    capacityTwo.setAttribute('disabled', 'disabled');
    capacityOne.setAttribute('disabled', 'disabled');
  } else if (adFormRoomNumber.value === '3') {
    capacityZero.setAttribute('disabled', 'disabled');
  } else if (adFormRoomNumber.value === '2') {
    capacityThree.setAttribute('disabled', 'disabled');
    capacityZero.setAttribute('disabled', 'disabled');
  } else if (adFormRoomNumber.value === '1') {
    capacityThree.setAttribute('disabled', 'disabled');
    capacityTwo.setAttribute('disabled', 'disabled');
    capacityZero.setAttribute('disabled', 'disabled');
  }
});

disableFieldsets();
fillAddress();

// map.js
var toggleMap = function () {
  map.classList.toggle('map--faded');
};

mainPin.addEventListener('mousedown', function (evt) {
  if (evt.buttons === 1) {
    togglePage();
    renderPins(housingData, mapPinsAria);
  }
});

mainPin.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    togglePage();
    renderPins(housingData, mapPinsAria);
  }
});

// page.js
var togglePage = function () {
  toggleMap();
  toggleForm();
};


