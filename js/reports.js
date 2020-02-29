'use strict';

(function () {
  var ESCAPE_KEY = window.constants.ESCAPE_KEY;
  var container = document.querySelector('main');

  var createDownloadMessage = function (text) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.top = '200px';
    node.style.fontSize = '30px';
    node.textContent = text;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var createUploadMessage = function (template) {
    var node = template.cloneNode(true);
    var closeButton = node.querySelector('.error__button');

    var removeNode = function () {
      node.remove();
      document.removeEventListener('keydown', documentEscKeydownHandler);
      document.removeEventListener('click', documentClickHandler);
    };

    var closeButtonClickHandler = function () {
      removeNode();
    };

    var documentEscKeydownHandler = function (evt) {
      if (evt.key === ESCAPE_KEY) {
        removeNode();
      }
    };

    var documentClickHandler = function () {
      removeNode();
    };

    if (closeButton) {
      closeButton.addEventListener('click', closeButtonClickHandler);
    }

    document.addEventListener('keydown', documentEscKeydownHandler);
    document.addEventListener('click', documentClickHandler);

    container.appendChild(node);
  };

  window.messages = {
    createUploadMessage: createUploadMessage,
    createDownloadMessage: createDownloadMessage,
  };
})();
