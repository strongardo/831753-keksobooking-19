'use strict';

(function () {
  var URL = window.constants.URL;
  var TIMEOUT_IN_MS = window.constants.TIMEOUT_IN_MS;
  var StatusCode = window.constants.StatusCodeMap;
  var renderPins = window.pins.render;

  var xhrErrorHandler = function (textContent) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = textContent;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var downloadData = function () {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        renderPins(xhr.response);
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
    xhr.open('GET', URL);
    xhr.send();
  };

  window.server = {
    downloadData: downloadData,
  };
})();

