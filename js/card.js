'use strict';

(function () {
  var ESCAPE_KEY = window.constants.ESCAPE_KEY;
  var FEATURE_CLASS_INDEX = window.constants.FEATURE_CLASS_INDEX;
  var FEATURE_NAME_START_INDEX = window.constants.FEATURE_NAME_START_INDEX;
  var map = document.querySelector('.map');
  var mapPinsAria = document.querySelector('.map__pins');
  var TypeTranslate = window.constants.TypeMap;
  var mapFiltres = map.querySelector('.map__filters-container');
  var template = document.querySelector('#card').content.querySelector('.map__card');

  var removePinShadow = function () {
    var pins = mapPinsAria.querySelectorAll('.user-pin');
    pins.forEach(function (mark) {
      if (mark.classList.contains('map__pin--active')) {
        mark.classList.remove('map__pin--active');
      }
    });
  };

  var removeCard = function () {
    var popup = map.querySelector('.popup');
    if (popup) {
      popup.remove();
    }
  };

  var addClosing = function (popup) {
    var cardClose = popup.querySelector('.popup__close');
    cardClose.addEventListener('click', function () {
      removeCard();
      removePinShadow();
    });
    document.addEventListener('keydown', function (evt) {
      if (evt.key === ESCAPE_KEY) {
        removeCard();
        removePinShadow();
      }
    });
  };

  var createCardElement = function (object) {
    var card = template.cloneNode(true);
    var popupTitle = card.querySelector('.popup__title');
    var popupAddress = card.querySelector('.popup__text--address');
    var popupPrice = card.querySelector('.popup__text--price');
    var popupType = card.querySelector('.popup__type');
    var popupCapacity = card.querySelector('.popup__text--capacity');
    var popupTime = card.querySelector('.popup__text--time');
    var popupFeaturesList = card.querySelector('.popup__features');
    var popupFeatures = popupFeaturesList.querySelectorAll('.popup__feature');
    var popupDescription = card.querySelector('.popup__description');
    var popupPhotosBlock = card.querySelector('.popup__photos');
    var popupPhoto = popupPhotosBlock.querySelector('.popup__photo');
    var popupAvatar = card.querySelector('.popup__avatar');
    var photoUrls = object.offer.photos;

    popupTitle.textContent = object.offer.title;
    popupAddress.textContent = object.offer.address;
    popupPrice.textContent = object.offer.price + '₽/ночь';
    popupType.textContent = TypeTranslate[object.offer.type];
    popupType.textContent = TypeTranslate[object.offer.type];
    popupDescription.textContent = object.offer.description;
    popupCapacity.textContent = object.offer.rooms + ' комнаты для ' + object.offer.guests + ' гостей.';
    popupTime.textContent = 'Заезд после ' + object.offer.checkin + ', выезд до ' + object.offer.checkout + '.';

    popupFeatures.forEach(function (item) {
      var feature = item.classList[FEATURE_CLASS_INDEX].slice(FEATURE_NAME_START_INDEX);
      var featuresArray = object.offer.features;
      if (!featuresArray.includes(feature)) {
        item.style.display = 'none';
      }
    });

    popupPhoto.remove();
    var fragment = document.createDocumentFragment();
    photoUrls.forEach(function (item) {
      var photo = popupPhoto.cloneNode(true);
      photo.src = item;
      fragment.appendChild(photo);
    });
    popupPhotosBlock.appendChild(fragment);

    popupAvatar.src = object.author.avatar;

    addClosing(card);

    return card;
  };

  var renderCard = function (object) {
    var popup = createCardElement(object);
    map.insertBefore(popup, mapFiltres);
  };

  window.card = {
    render: renderCard,
    remove: removeCard,
  };
})();
