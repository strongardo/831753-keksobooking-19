'use strict';

var similarAdsQuantity = 8;
var typesOfHousing = ['palace', 'flat', 'house', 'bungalo'];
// var typeTranslate = {
//   'palace': 'Дворец',
//   'flat': 'Квартира',
//   'house': 'Дом',
//   'bungalo': 'Бунгало',
// };
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
// var mapContainer = map.querySelector('.map__filters-container');
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

var createSimilarAds = function (quantity) {
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

var createAdElement = function (obj) {
  var template = document.querySelector('#pin').content.querySelector('.map__pin');
  var ad = template.cloneNode(true);
  ad.style.left = obj.location.x + pinGapX + 'px';
  ad.style.top = obj.location.y + pinGapY + 'px';
  ad.children[0].src = obj.author.avatar;
  ad.children[0].alt = obj.offer.title;
  return ad;
};

var renderAds = function (ads, block) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < ads.length; i++) {
    fragment.appendChild(createAdElement(ads[i]));
  }

  block.appendChild(fragment);
};

// var createCardElement = function (obj) {
//   var template = document.querySelector('#card').content.querySelector('.map__card');
//   var card = template.cloneNode(true);
//   var popupTitle = card.querySelector('.popup__title');
//   var popupAddress = card.querySelector('.popup__text--address');
//   var popupPrice = card.querySelector('.popup__text--price');
//   var popupType = card.querySelector('.popup__type');
//   var popupCapacity = card.querySelector('.popup__text--capacity');
//   var popupTime = card.querySelector('.popup__text--time');
//   var popupFeatures = card.querySelector('.popup__features');
//   var popupDescription = card.querySelector('.popup__description');
//   var popupPhotos = card.querySelector('.popup__photos');
//   var popupAvatar = card.querySelector('.popup__avatar');

//   popupTitle.textContent = obj.offer.title;
//   popupAddress.textContent = obj.offer.address;
//   popupPrice.textContent = obj.offer.price + '₽/ночь';
//   popupType.textContent = typeTranslate[obj.offer.type];
//   popupCapacity.textContent = obj.offer.rooms + ' комнаты для ' + obj.offer.guests + ' гостей.';
//   popupTime.textContent = 'Заезд после ' + obj.offer.checkin + ', выезд до ' + obj.offer.checkout + '.';

//   for (var i = 0; i < popupFeatures.children.length; i++) {
//     if (i > obj.offer.features.length - 1) {
//       popupFeatures.children[i].style.display = 'none';
//     }
//   }

//   popupDescription.textContent = obj.offer.description;
//   popupPhotos.children[0].src = obj.offer.photos[0];

//   if (obj.offer.photos.length > 1) {
//     var fragment = document.createDocumentFragment();
//     for (var j = 1; j < obj.offer.photos.length; j++) {
//       var photo = popupPhotos.children[0].cloneNode(true);
//       photo.src = obj.offer.photos[j];
//       fragment.appendChild(photo);
//     }
//     popupPhotos.appendChild(fragment);
//   }

//   popupAvatar.src = obj.author.avatar;

//   return card;
// };

// var renderCard = function (obj, block, beforeBlock) {
//   var card = createCardElement(obj);
//   block.insertBefore(card, beforeBlock);
// };

var enableInactiveMode = function () {
  for (var i = 0; i < adFormFieldsets.length; i++) {
    adFormFieldsets[i].setAttribute('disabled', 'disabled');
  }
};

var enableActiveMode = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  renderAds(housingData, mapPinsAria);
  for (var i = 0; i < adFormFieldsets.length; i++) {
    adFormFieldsets[i].removeAttribute('disabled');
  }
  for (var j = 0; j < capacityOptions.length; j++) {
    capacityOptions[j].setAttribute('disabled', 'disabled');
  }
};

var fillAddress = function () {
  if (adForm.classList.contains('ad-form--disabled')) {
    adFormAddress.value = (mainPinX + mainPinGap) + ', ' + (mainPinY + mainPinGap);
  } else {
    adFormAddress.value = (mainPinX + pinGapX) + ', ' + (mainPinY + pinGapY);
  }
};

var housingData = createSimilarAds(similarAdsQuantity);

enableInactiveMode();
fillAddress();

mainPin.addEventListener('mousedown', function (evt) {
  if (evt.buttons === 1) {
    enableActiveMode();
  }
  fillAddress();
});

mainPin.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    enableActiveMode();
  }
  fillAddress();
});

// var checkCapacityValidity = function () {
//   var isValidity = true;
//   if (adFormCapacity.value === '2' && +adFormRoomNumber.value < 2) {
//     isValidity = false;
//   } else if (adFormCapacity.value === '3' && +adFormRoomNumber.value < 3) {
//     isValidity = false;
//   } else if (adFormRoomNumber.value === '100' && adFormCapacity.value !== '0') {
//     isValidity = false;
//   }
//   return isValidity;
// };

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

// renderCard(housingData[0], mapPinsAria, mapContainer);
