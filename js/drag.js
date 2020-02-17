'use strict';

(function () {
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var fillAddress = window.form.fillAddress;
  var minLimitX = 0;
  var maxLimitX = 1197;
  var minLimitY = 130;
  var maxLimitY = 630;
  var pinGapX = 31;
  var pinGapY = 80;

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

      if (mainPinY < minLimitY - pinGapY) {
        mainPin.style.top = minLimitY - pinGapY + 'px';
      } else if (mainPinY > maxLimitY - pinGapY) {
        mainPin.style.top = maxLimitY - pinGapY + 'px';
      } else {
        mainPin.style.top = mainPinY + 'px';
      }

      if (mainPinX < minLimitX - pinGapX) {
        mainPin.style.left = minLimitX - pinGapX + 'px';
      } else if (mainPinX > maxLimitX - pinGapX) {
        mainPin.style.left = maxLimitX - pinGapX + 'px';
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
