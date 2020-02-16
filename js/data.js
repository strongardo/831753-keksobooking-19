'use strict';

(function () {
  var pinMinX = 0;
  var pinMaxX = 1200;
  var pinMinY = 130;
  var pinMaxY = 630;
  var minPrice = 100;
  var maxPrice = 10000;
  var typesOfHousing = ['palace', 'flat', 'house', 'bungalo'];
  var minRoomsQuantity = 1;
  var maxRoomsQuantity = 3;
  var minGuestsQuantity = 1;
  var maxGuestsQuantity = 3;
  var checks = ['12:00', '13:00', '14:00'];
  var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var getRandomNumber = window.utils.getRandomNumber;
  var getRandomElement = window.utils.getRandomElement;
  var createRandomArray = window.utils.createRandomArray;

  var createData = function (quantity) {
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

  window.data = {
    create: createData,
  };
})();
