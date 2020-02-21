'use strict';

(function () {
  var MIN_LIMIT_X = window.constants.MIN_LIMIT_X;
  var MAX_LIMIT_X = window.constants.MAX_LIMIT_X;
  var MIN_LIMIT_Y = window.constants.MIN_LIMIT_Y;
  var MAX_LIMIT_Y = window.constants.MAX_LIMIT_Y;
  var PIN_GAP_X = window.constants.PIN_GAP_X;
  var PIN_GAP_Y = window.constants.PIN_GAP_Y;
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var fillAddress = window.form.fillAddress;

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var documentMouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var mainPinX = mainPin.offsetLeft - shift.x;
      var mainPinY = mainPin.offsetTop - shift.y;

      if (mainPinY < MIN_LIMIT_Y - PIN_GAP_Y) {
        mainPin.style.top = MIN_LIMIT_Y - PIN_GAP_Y + 'px';
      } else if (mainPinY > MAX_LIMIT_Y - PIN_GAP_Y) {
        mainPin.style.top = MAX_LIMIT_Y - PIN_GAP_Y + 'px';
      } else {
        mainPin.style.top = mainPinY + 'px';
      }

      if (mainPinX < MIN_LIMIT_X - PIN_GAP_X) {
        mainPin.style.left = MIN_LIMIT_X - PIN_GAP_X + 'px';
      } else if (mainPinX > MAX_LIMIT_X - PIN_GAP_X) {
        mainPin.style.left = MAX_LIMIT_X - PIN_GAP_X + 'px';
      } else {
        mainPin.style.left = mainPinX + 'px';
      }

      fillAddress(mainPinX, mainPinY);
    };

    var documentMouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', documentMouseMoveHandler);
      document.removeEventListener('mouseup', documentMouseUpHandler);
    };

    document.addEventListener('mousemove', documentMouseMoveHandler);
    document.addEventListener('mouseup', documentMouseUpHandler);
  });
})();
