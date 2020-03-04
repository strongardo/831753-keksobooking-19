'use strict';

(function () {
  var createDownloadMessage = window.messages.createDownloadMessage;
  var renderPins = window.pins.render;
  var toggleForm = window.form.toggle;
  var toggleFilterForm = window.filterForm.toggle;
  var DEFAULT_MESSAGE = window.constants.DEFAULT_MESSAGE;
  // var NO_INTERNET_MESSAGE = window.constants.NO_INTERNET_MESSAGE;
  // var TIMEOUT_MESSAGE = window.constants.TIMEOUT_MESSAGE;

  var xhrDownloadSuccessHandler = function (data) {
    window.serverData = data;
    renderPins(data);
    toggleFilterForm();
    toggleForm();
  };

  var xhrDownloadErrorHandler = function () {
    createDownloadMessage(DEFAULT_MESSAGE);
  };

  window.downloadHandlers = {
    success: xhrDownloadSuccessHandler,
    error: xhrDownloadErrorHandler,
  };
})();

