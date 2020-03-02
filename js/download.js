'use strict';

(function () {
  var DOWNLOAD_URL = window.constants.DOWNLOAD_URL;
  var TIMEOUT_IN_MS = window.constants.TIMEOUT_IN_MS;
  var DEFAULT_MESSAGE = window.constants.DEFAULT_MESSAGE;
  var NO_INTERNET_MESSAGE = window.constants.NO_INTERNET_MESSAGE;
  var TIMEOUT_MESSAGE = window.constants.TIMEOUT_MESSAGE;
  var StatusCodeMap = window.constants.StatusCodeMap;
  var renderPins = window.pins.render;
  var toggleForm = window.form.toggle;
  var toggleFilterForm = window.filterForm.toggle;
  var createMessage = window.messages.createDownloadMessage;

  var xhrSuccessHandler = function (data) {
    window.serverData = data;
    renderPins(data);
    toggleFilterForm();
    toggleForm();
  };

  var xhrErrorHandler = function (text) {
    createMessage(text);
  };

  var getData = function () {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCodeMap.OK) {
        xhrSuccessHandler(xhr.response);
      } else {
        xhrErrorHandler(DEFAULT_MESSAGE);
      }
    });
    xhr.addEventListener('error', function () {
      xhrErrorHandler(NO_INTERNET_MESSAGE);
    });
    xhr.addEventListener('timeout', function () {
      xhrErrorHandler(TIMEOUT_MESSAGE);
    });
    xhr.timeout = TIMEOUT_IN_MS;
    xhr.open('GET', DOWNLOAD_URL);
    xhr.send();
  };

  window.download = {
    getData: getData,
  };
})();

