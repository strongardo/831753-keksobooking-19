'use strict';

(function () {
  var PIN_GAP_X = window.constants.PIN_GAP_X;
  var PIN_GAP_Y = window.constants.PIN_GAP_Y;
  var MAX_OFFERS = window.constants.MAX_OFFERS;
  var mapPinsAria = document.querySelector('.map__pins');
  var renderCard = window.card.render;

  var createPin = function (obj) {
    var template = document.querySelector('#pin').content.querySelector('.map__pin');
    var ad = template.cloneNode(true);
    ad.style.left = obj.location.x - PIN_GAP_X + 'px';
    ad.style.top = obj.location.y - PIN_GAP_Y + 'px';
    ad.children[0].src = obj.author.avatar;
    ad.children[0].alt = obj.offer.title;
    ad.classList.add('user-pin');
    return ad;
  };

  var renderPins = function (serverData) {
    var data = serverData.slice(0, MAX_OFFERS);
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
