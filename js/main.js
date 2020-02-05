'use strict';

var similarAdsQuantity = 8;
var typeOfHousing = ['palace', 'flat', 'house', 'bungalo'];
var checks = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var pinMinX = 0;
var pinMaxX = 1200;
var pinMinY = 130;
var pinMaxY = 630;
var pinGapX = 32;
var pinGapY = 82;
var minPrice = 100;
var maxPrice = 10000;
var minRoomsQuantity = 1;
var maxRoomsQuantity = 5;
var minGuestsQuantity = 1;
var maxGuestsQuantity = 5;
var map = document.querySelector('.map__pins');

var getRandomElement = function (arr) {
  return arr[Math.floor(Math.random() * (arr.length))];
};

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function createRandomArray(arr) {
  var randomArr = [];
  for (var i = 0; i < getRandomNumber(1, arr.length); i++) {
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
      type: getRandomElement(typeOfHousing),
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

renderAds(createSimilarAds(similarAdsQuantity), map);

