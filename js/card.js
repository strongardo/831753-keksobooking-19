'use strict';

(function () {
  var ESCAPE_KEY = window.constants.ESCAPE_KEY;
  var map = document.querySelector('.map');
  var TypeTranslate = window.constants.TypeMap;
  var mapFiltres = map.querySelector('.map__filters-container');

  var addClosing = function (card) {
    var cardClose = card.querySelector('.popup__close');
    cardClose.addEventListener('click', function () {
      card.style.display = 'none';
    });
    document.addEventListener('keydown', function (evt) {
      if (evt.key === ESCAPE_KEY) {
        card.style.display = 'none';
      }
    });
  };

  var createCardElement = function (obj) {
    var template = document.querySelector('#card').content.querySelector('.map__card');
    var card = template.cloneNode(true);
    var popupTitle = card.querySelector('.popup__title');
    var popupAddress = card.querySelector('.popup__text--address');
    var popupPrice = card.querySelector('.popup__text--price');
    var popupType = card.querySelector('.popup__type');
    var popupCapacity = card.querySelector('.popup__text--capacity');
    var popupTime = card.querySelector('.popup__text--time');
    var popupFeatures = card.querySelector('.popup__features');
    var popupDescription = card.querySelector('.popup__description');
    var popupPhotos = card.querySelector('.popup__photos');
    var popupAvatar = card.querySelector('.popup__avatar');

    popupTitle.textContent = obj.offer.title;
    popupAddress.textContent = obj.offer.address;
    popupPrice.textContent = obj.offer.price + '₽/ночь';
    popupType.textContent = TypeTranslate[obj.offer.type];
    popupCapacity.textContent = obj.offer.rooms + ' комнаты для ' + obj.offer.guests + ' гостей.';
    popupTime.textContent = 'Заезд после ' + obj.offer.checkin + ', выезд до ' + obj.offer.checkout + '.';

    for (var i = 0; i < popupFeatures.children.length; i++) {
      if (i > obj.offer.features.length - 1) {
        popupFeatures.children[i].style.display = 'none';
      }
    }

    popupDescription.textContent = obj.offer.description;
    popupPhotos.children[0].src = obj.offer.photos[0];

    if (obj.offer.photos.length > 1) {
      var fragment = document.createDocumentFragment();
      for (var j = 1; j < obj.offer.photos.length; j++) {
        var photo = popupPhotos.children[0].cloneNode(true);
        photo.src = obj.offer.photos[j];
        fragment.appendChild(photo);
      }
      popupPhotos.appendChild(fragment);
    }

    popupAvatar.src = obj.author.avatar;

    addClosing(card);

    return card;
  };

  var removeCard = function () {
    var card = map.querySelector('.popup');
    if (card) {
      card.remove();
    }
  };

  var renderCard = function (obj) {
    removeCard();
    var card = createCardElement(obj);
    map.insertBefore(card, mapFiltres);
  };

  window.card = {
    render: renderCard,
    remove: removeCard,
  };
})();
