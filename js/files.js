'use strict';

(function () {
  var FILE_TYPES = window.constants.FILE_TYPES;
  var form = document.querySelector('.ad-form');
  var avatarChooser = form.querySelector('#avatar');
  var avatar = form.querySelector('.ad-form-header__preview img[alt="Аватар пользователя"]');
  var housingImageChooser = form.querySelector('#images');
  var housingImage = form.querySelector('.ad-form__photo');

  var fileChooserChangeHandler = function (evt) {
    var file = evt.target.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        if (evt.target === avatarChooser) {
          avatar.src = reader.result;
        } else {
          housingImage.style.backgroundImage = 'url(' + reader.result + ')';
        }
      });
      reader.readAsDataURL(file);
    }
  };

  avatarChooser.addEventListener('change', fileChooserChangeHandler);
  housingImageChooser.addEventListener('change', fileChooserChangeHandler);
})();
