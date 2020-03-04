'use strict';

(function () {
  var createDownloadMessage = window.messages.createDownloadMessage;
  var renderPins = window.pins.render;
  var toggleForm = window.form.toggle;
  var toggleFilterForm = window.filterForm.toggle;
  var DEFAULT_MESSAGE = window.constants.DEFAULT_MESSAGE;

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

