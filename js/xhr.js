'use strict';

(function () {
  var DOWNLOAD_URL = window.constants.DOWNLOAD_URL;
  var UPLOAD_URL = window.constants.UPLOAD_URL;
  var TIMEOUT_IN_MS = window.constants.TIMEOUT_IN_MS;
  var StatusCodeMap = window.constants.StatusCodeMap;

  var createXhr = function (xhrSuccessHandler, xhrErrorHandler, data, formSubmitHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCodeMap.OK) {
        xhrSuccessHandler(xhr.response);
        if (formSubmitHandler) {
          formSubmitHandler();
        }
      } else {
        xhrErrorHandler();
      }
    });
    xhr.addEventListener('error', xhrErrorHandler);
    xhr.addEventListener('timeout', xhrErrorHandler);
    xhr.timeout = TIMEOUT_IN_MS;

    if (data) {
      xhr.open('POST', UPLOAD_URL);
      xhr.send(data);
    } else {
      xhr.open('GET', DOWNLOAD_URL);
      xhr.send();
    }
  };

  window.xhr = {
    create: createXhr,
  };
})();

