'use strict';

var ENTER_KEY = 'Enter';
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
var roomOptionThreeIndex = 3;
var capacitiOptionZeroIndex = 3;

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

// var housingData = createHousingData(similarAdsQuantity);

// pins.js
var createPin = function (obj) {
  var template = document.querySelector('#pin').content.querySelector('.map__pin');
  var ad = template.cloneNode(true);
  ad.style.left = obj.location.x + pinGapX + 'px';
  ad.style.top = obj.location.y + pinGapY + 'px';
  ad.children[0].src = obj.author.avatar;
  ad.children[0].alt = obj.offer.title;
  ad.classList.add('user-pin');
  return ad;
};

var renderPins = function (ads) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < ads.length; i++) {
    fragment.appendChild(createPin(ads[i]));
  }
  return fragment;
};

var togglePins = function (fragment) {
  var pins = mapPinsAria.querySelectorAll('.user-pin');

  if (pins.length) {
    pins.forEach(function (item) {
      item.remove();
    });
  } else {
    mapPinsAria.appendChild(fragment);
  }
};

// form.js
var fillAddress = function () {
  if (adForm.classList.contains('ad-form--disabled')) {
    adFormAddress.value = (mainPinX + mainPinGap) + ', ' + (mainPinY + mainPinGap);
  } else {
    adFormAddress.value = (mainPinX + pinGapX) + ', ' + (mainPinY + pinGapY);
  }
};

var toggleFieldsets = function () {
  adFormFieldsets.forEach(function (item) {
    item.disabled = !item.disabled;
  });
};

var disableCapacityOptions = function () {
  capacityOptions.forEach(function (item) {
    item.disabled = true;
  });
};

var toggleForm = function () {
  adForm.classList.toggle('ad-form--disabled');
  toggleFieldsets();
  fillAddress();

  disableCapacityOptions();
};

var adFormRoomNumberChangeHandler = function () {
  adFormCapacity.options[adFormRoomNumber.selectedIndex].selected = true;
  disableCapacityOptions();

  if (adFormRoomNumber.selectedIndex < roomOptionThreeIndex) {
    for (var i = 0; i <= adFormRoomNumber.selectedIndex; i++) {
      adFormCapacity.options[i].disabled = false;
    }
  } else {
    adFormCapacity.options[capacitiOptionZeroIndex].disabled = false;
  }
};

adFormRoomNumber.addEventListener('change', adFormRoomNumberChangeHandler);
toggleFieldsets();
fillAddress();

// map.js
var toggleMap = function () {
  map.classList.toggle('map--faded');
};

var mainPinClickHandler = function (evt) {
  if (evt.buttons === 1) {
    togglePage();
    togglePins(renderPins(createHousingData(similarAdsQuantity)));
  }
};

var mainPinEnterDownHandler = function (evt) {
  if (evt.key === ENTER_KEY) {
    togglePage();
    togglePins(renderPins(createHousingData(similarAdsQuantity)));
  }
};

mainPin.addEventListener('mousedown', mainPinClickHandler);
mainPin.addEventListener('keydown', mainPinEnterDownHandler);

// page.js
var togglePage = function () {
  toggleMap();
  toggleForm();
};


