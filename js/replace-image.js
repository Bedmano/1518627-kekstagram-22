import { onEscButtonOverlay, closeOverlay } from './util.js';
const upload = document.querySelector('#upload-file');
const body = document.querySelector('body');
const overlay = document.querySelector('.img-upload__overlay');
const closeModal = document.querySelector('#upload-cancel');
const imageContainer = document.querySelector('.img-upload__preview');
const innerImage = imageContainer.querySelector('img');
// const dropZone = document.querySelector('.img-upload__control');
const FILE_TYPES = ['jpg', 'jpeg', 'png', 'gif'];
// отменяю стандартные события браузера для апло
document.addEventListener('dragover', (evt) => evt.preventDefault());
document.addEventListener('drop', (evt) => evt.preventDefault());

// функция,которая добавляет изображение на страницу,полученное от пользователя

function replaceImage() {
  let file = upload.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });
  if (matches) {
    const reader = new FileReader();
    reader.onloadend = function () {
      innerImage.src = reader.result;
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      innerImage.src = '';
    }
  }
}

upload.addEventListener('change', function (evt) {
  evt.preventDefault();
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  replaceImage();
});

// обработчки при перетаскивании файла в зону загрузки
// dropZone.addEventListener('drop', function (evt) {
//   evt.preventDefault();
//   overlay.classList.remove('hidden');
//   body.classList.add('modal-open');
//   replaceImage();
// });

// обработчкик для закрытия оверлея с помощью клика

closeModal.addEventListener('click', closeOverlay);

// обработчкик для закрытия оверлея с помощью esc
window.addEventListener('keydown', onEscButtonOverlay);

export { imageContainer, innerImage };
