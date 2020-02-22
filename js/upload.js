'use strict';

(function () {
  var UPLOAD_URL = window.constants.UPLOAD_URL;
  var TIMEOUT_IN_MS = window.constants.TIMEOUT_IN_MS;
  var StatusCode = window.constants.StatusCodeMap;
  var removePins = window.pins.remove;
  var removeCard = window.card.remove;
  var map = document.querySelector('.map');
  var template = document.querySelector('#error').content.querySelector('.error');
  var createMessage = window.messages.createUploadMessage;

  var xhrUploadErrorHandler = function () {
    createMessage(template);
  };

  var sendData = function (data, xhrUploadSuccessHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        xhrUploadSuccessHandler();
        removePins();
        removeCard();
        map.classList.add('map--faded');
      } else {
        xhrUploadErrorHandler();
      }
    });

    xhr.addEventListener('error', function () {
      xhrUploadErrorHandler();
    });

    xhr.addEventListener('timeout', function () {
      xhrUploadErrorHandler();
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open('POST', UPLOAD_URL);
    xhr.send(data);
  };

  window.upload = {
    sendData: sendData,
  };
})();

