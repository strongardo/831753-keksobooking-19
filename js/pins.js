'use strict';

(function () {
  var pinGapX = 32;
  var pinGapY = 82;
  var mapPinsAria = document.querySelector('.map__pins');
  var objectsQuantity = 8;
  var renderCard = window.card.render;
  var createRandomArray = window.utils.createRandomArray;

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

  var renderPins = function (serverData) {
    var data = createRandomArray(serverData, objectsQuantity);
    var fragment = document.createDocumentFragment();
    data.forEach(function (item) {
      var pin = createPin(item);
      pin.addEventListener('click', function () {
        renderCard(item);
      });
      fragment.appendChild(pin);
    });
    mapPinsAria.appendChild(fragment);
  };

  var removePins = function () {
    var pins = mapPinsAria.querySelectorAll('.user-pin');
    pins.forEach(function (item) {
      item.remove();
    });
  };

  window.pins = {
    render: renderPins,
    remove: removePins,
  };
})();
