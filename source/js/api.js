import { renderPictures } from './render-pictures.js';
import { showAlert, args } from './util.js';
import { sortImages } from './sort-images.js';
const formSubmit = document.querySelector('.img-upload__form');
const getData = function (onFailure) {
  fetch('https://22.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (response.ok) {
        response
          .json()
          .then((picturesArray) => {
            renderPictures(picturesArray);
            sortImages(picturesArray);
          })
      } else {
        onFailure(
          'Не удалось получить данные от сервера. Попробуйте перезагрузить страницу или зайти позже.');
      }
    })

    .catch(() => {
      onFailure(
        'Не удалось получить данные от сервера. Попробуйте перезагрузить страницу или зайти позже.');
    });
};
const sendData = function (onSuccess, onFailure, body) {
  fetch('https://22.javascript.pages.academy/kekstagram', {
    method: 'POST',
    body,
  })
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFailure('Не удалось отправить данные на сервер. Попробуйте ещё раз.');
      }
    })
    .catch(() => {
      onFailure('Не удалось отправить данные на сервер. Попробуйте ещё раз.');
    });
};

const setUserFormSubmit = function () {
  formSubmit.addEventListener('submit', function (evt) {
    evt.preventDefault();
    sendData(
      () => showAlert(args.successId, args.successClass),
      () => showAlert(args.errorId, args.errorClass),
      new FormData(evt.target));
  });
};

export { getData, setUserFormSubmit };
