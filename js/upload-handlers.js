'use strict';

(function () {
  var resetPage = window.inactive.resetPage;
  var template = document.querySelector('#error').content.querySelector('.error');
  var createUploadMessage = window.messages.createUploadMessage;

  var xhrUploadSuccessHandler = function () {
    resetPage();
  };

  var xhrUploadErrorHandler = function () {
    createUploadMessage(template);
  };

  window.uploadHandlers = {
    success: xhrUploadSuccessHandler,
    error: xhrUploadErrorHandler,
  };
})();

