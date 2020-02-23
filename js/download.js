'use strict';

(function () {
  var DOWNLOAD_URL = window.constants.DOWNLOAD_URL;
  var TIMEOUT_IN_MS = window.constants.TIMEOUT_IN_MS;
  var StatusCode = window.constants.StatusCodeMap;
  var renderPins = window.pins.render;
  var toggleForm = window.form.toggle;
  var createMessage = window.messages.createDownloadMessage;

  var xhrSuccessHandler = function (data) {
    renderPins(data);
    toggleForm();
  };

  var xhrErrorHandler = function (text) {
    createMessage(text);
  };

  var getData = function () {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        xhrSuccessHandler(xhr.response);
      } else {
        xhrErrorHandler('Произошла ошибка соединения, попробуйте обновить страницу позже');
      }
    });
    xhr.addEventListener('error', function () {
      xhrErrorHandler('Произошел сбой со стороны сервера, либо у вас пропало интернет-соединение, попробуйте обновить страницу позже');
    });
    xhr.addEventListener('timeout', function () {
      xhrErrorHandler('Запрос выполняется слишком долго, попробуйте обновить страницу позже');
    });
    xhr.timeout = TIMEOUT_IN_MS;
    xhr.open('GET', DOWNLOAD_URL);
    xhr.send();
  };

  window.download = {
    getData: getData,
  };
})();

