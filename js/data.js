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
        price: window.utils.getRandomNumber(minPrice, maxPrice),
        type: window.utils.getRandomElement(typesOfHousing),
        rooms: window.utils.getRandomNumber(minRoomsQuantity, maxRoomsQuantity),
        guests: window.utils.getRandomNumber(minGuestsQuantity, maxGuestsQuantity),
        checkin: window.utils.getRandomElement(checks),
        checkout: window.utils.getRandomElement(checks),
        features: window.utils.createRandomArray(features),
        description: 'description',
        photos: window.utils.createRandomArray(photos),
      };

      similarAd.location = {
        x: window.utils.getRandomNumber(pinMinX, pinMaxX),
        y: window.utils.getRandomNumber(pinMinY, pinMaxY),
      };

      similarAds.push(similarAd);
    }
    return similarAds;
  };

  window.data = {
    create: createHousingData,
  };
})();
