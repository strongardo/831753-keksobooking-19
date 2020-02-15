'use strict';

(function () {
  var pinGapX = 32;
  var pinGapY = 82;
  var mapPinsAria = document.querySelector('.map__pins');
  var objectsQuantity = 8;

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

  var renderPins = function () {
    var housingData = window.data.create(objectsQuantity);
    var fragment = document.createDocumentFragment();
    housingData.forEach(function (item) {
      var pin = createPin(item);
      pin.addEventListener('click', function () {
        window.card.render(item);
      });
      fragment.appendChild(pin);
    });
    mapPinsAria.appendChild(fragment);
  };

  var removePins = function (pins) {
    pins.forEach(function (item) {
      item.remove();
    });
  };

  var togglePins = function () {
    var pins = mapPinsAria.querySelectorAll('.user-pin');
    var housingData = window.data.create(objectsQuantity);

    if (pins.length) {
      removePins(pins);
    } else {
      renderPins(housingData);
    }
  };

  window.pins = {
    render: renderPins,
    toggle: togglePins,
    remove: removePins,
  };
})();
