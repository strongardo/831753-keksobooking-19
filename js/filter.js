'use strict';

(function () {
  var getData = function (property, value) {
    var serverData = window.serverData;
    var data = [];
    serverData.forEach(function (item) {
      if (item.offer[property] === value) {
        data.push(item);
      }
    });
    return data;
  };

  window.filter = {
    getData: getData,
  };
})();
