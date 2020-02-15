'use strict';

(function () {
  var getRandomElement = function (arr) {
    return arr[Math.floor(Math.random() * (arr.length))];
  };

  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  function createRandomArray(arr) {
    var randomArr = [];
    for (var i = 0; i < getRandomNumber(1, arr.length + 1); i++) {
      randomArr.push(arr[i]);
    }
    return randomArr;
  }

  window.utils = {
    getRandomElement: getRandomElement,
    getRandomNumber: getRandomNumber,
    createRandomArray: createRandomArray,
  };
})();
