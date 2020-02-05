'use strict';

var similarAdsQuantity = 8;
var typeOfHousing = ['palace', 'flat', 'house', 'bungalo'];
var times = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var pinGapX = 32;
var pinGapY = 82;
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

var createSimilarAds = function () {
  var similarAds = [];
  var imageNumber = 0;
  for (var i = 0; i < similarAdsQuantity; i++) {

    similarAds[i] = {};

    similarAds[i].author = {
      avatar: 'img/avatars/user0' + (++imageNumber) + '.png'
    };

    similarAds[i].offer = {
      title: 'title',
      address: '600, 350',
      price: getRandomNumber(100, 10000),
      type: getRandomElement(typeOfHousing),
      rooms: getRandomNumber(1, 5),
      guests: getRandomNumber(1, 10),
      checkin: getRandomElement(times),
      checkout: getRandomElement(times),
      features: createRandomArray(features),
      description: 'description',
      photos: createRandomArray(photos),
    };

    similarAds[i].location = {
      x: getRandomNumber(0, 1200),
      y: getRandomNumber(130, 630),
    };
  }
  return similarAds;
};

var createAd = function (obj) {
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
    fragment.appendChild(createAd(ads[i]));
  }

  block.appendChild(fragment);
};

renderAds(createSimilarAds(), map);

