import { closeOnEscButtonOverlay, closeOverlay } from './util.js';
const upload = document.querySelector('#upload-file');
const body = document.querySelector('body');
const overlay = document.querySelector('.img-upload__overlay');
const closeModal = document.querySelector('#upload-cancel');
const imageContainer = document.querySelector('.img-upload__preview');
const innerImage = imageContainer.querySelector('img');

const FILE_TYPES = ['jpg', 'jpeg', 'png', 'gif'];

document.addEventListener('dragover', (evt) => evt.preventDefault());
document.addEventListener('drop', (evt) => evt.preventDefault());


const replaceImage = function() {
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

closeModal.addEventListener('click', closeOverlay);

window.addEventListener('keydown', closeOnEscButtonOverlay);

export { imageContainer, innerImage };
