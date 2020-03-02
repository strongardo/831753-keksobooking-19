'use strict';

(function () {
  var PIN_GAP_X = window.constants.PIN_GAP_X;
  var PIN_GAP_Y = window.constants.PIN_GAP_Y;
  var MAX_OFFERS = window.constants.MAX_OFFERS;
  var mapPinsAria = document.querySelector('.map__pins');
  var renderCard = window.card.render;
  var removeCard = window.card.remove;

  var createPin = function (object) {
    var template = document.querySelector('#pin').content.querySelector('.map__pin');
    var ad = template.cloneNode(true);
    ad.style.left = object.location.x - PIN_GAP_X + 'px';
    ad.style.top = object.location.y - PIN_GAP_Y + 'px';
    ad.children[0].src = object.author.avatar;
    ad.children[0].alt = object.offer.title;
    ad.classList.add('user-pin');
    return ad;
  };

  var renderPins = function (serverData) {
    var data = serverData.slice(0, MAX_OFFERS);
    var fragment = document.createDocumentFragment();
    data.forEach(function (item) {
      if (item.offer) {
        var pin = createPin(item);
        pin.addEventListener('click', function () {
          var pins = mapPinsAria.querySelectorAll('.user-pin');
          pins.forEach(function (mark) {
            if (mark.classList.contains('map__pin--active')) {
              mark.classList.remove('map__pin--active');
            }
          });
          pin.classList.add('map__pin--active');
          removeCard();
          renderCard(item);
        });
        fragment.appendChild(pin);
      }
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
