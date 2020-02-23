'use strict';

(function () {
  var form = document.querySelector('.map__filters');
  var typeSelect = form.querySelector('#housing-type');
  var selects = form.querySelectorAll('.map__filter');
  var featuresGroup = form.querySelector('.map__features');
  var getFilteredData = window.filter.getData;
  var removeCard = window.card.remove;
  var renderPins = window.pins.render;
  var removePins = window.pins.remove;

  var toggleForm = function () {
    selects.forEach(function (item) {
      item.disabled = !item.disabled;
    });
    featuresGroup.disabled = !featuresGroup.disabled;
  };

  typeSelect.addEventListener('change', function () {
    var data = getFilteredData('type', typeSelect.value);
    removeCard();
    removePins();
    renderPins(data);
  });

  toggleForm();

  window.filterForm = {
    toggle: toggleForm,
  };
})();
