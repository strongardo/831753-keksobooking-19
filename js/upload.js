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

  var xhrSuccessHandler = function () {
    removePins();
    removeCard();
    map.classList.add('map--faded');
  };

  var xhrErrorHandler = function () {
    createMessage(template);
  };

  var sendData = function (data, formSubmitHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        formSubmitHandler();
        xhrSuccessHandler();
      } else {
        xhrErrorHandler();
      }
    });

    xhr.addEventListener('error', function () {
      xhrErrorHandler();
    });

    xhr.addEventListener('timeout', function () {
      xhrErrorHandler();
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open('POST', UPLOAD_URL);
    xhr.send(data);
  };

  window.upload = {
    sendData: sendData,
  };
})();

