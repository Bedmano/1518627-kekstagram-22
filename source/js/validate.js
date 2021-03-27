import { onEscButtonCloseOverlay } from './util.js';
const MIN_HASHTAG_LENGTH = 2;
const MAX_HASHTAG_LENGTH = 20;
const MAX_HASHTAG_NUMBER = 5;
const hashtagInput = document.querySelector('.text__hashtags');
const commentTextArea = document.querySelector('.text__description');
const allowedSymbols = /^[0-9A-Za-zА-Яа-я]+$/;
const errorOutline = 'red auto 1px'


const onHashtagInput = () => {
  const hashtags = hashtagInput.value.trim().toLowerCase().split(' ').filter(tag=>tag);
  if(hashtagInput.value === ''){
    hashtagInput.style.outline = '';
    hashtagInput.setCustomValidity('');
  }

  hashtags.some((hashtag) => {
    if (hashtag[0] !== '#') {
      hashtagInput.setCustomValidity('хэш-тег должен начинаться с символа # (решётка)');
      hashtagInput.style.outline = errorOutline;
      return true;
    } else if (hashtags.length > MAX_HASHTAG_NUMBER) {
      hashtagInput.setCustomValidity(`Допустимо использовать не более ${MAX_HASHTAG_NUMBER} хештегов`);
      hashtagInput.style.outline = errorOutline;
      return true;
    } else if (hashtag.length < MIN_HASHTAG_LENGTH) {
      hashtagInput.setCustomValidity('хеш-тег не может состоять только из одной решётки');
      hashtagInput.style.outline = errorOutline;
      return true;
    } else if (!allowedSymbols.test(hashtag.slice(1))) {
      hashtagInput.style.outline = errorOutline;
      hashtagInput.setCustomValidity('строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.');
      return true;
    } else if (hashtag.length > MAX_HASHTAG_LENGTH) {
      hashtagInput.setCustomValidity(`максимальная длина одного хэш-тега ${MAX_HASHTAG_LENGTH} символов, включая решётку`);
      hashtagInput.style.outline = errorOutline;
      return true;
    } else if (hashtag.indexOf('#', 1) >= 1) {
      hashtagInput.setCustomValidity('хэш-теги разделяются пробелами');
      hashtagInput.style.outline = errorOutline;
      return true;
    } else if (hashtags.length !== new Set(hashtags).size) {
      hashtagInput.setCustomValidity('один и тот же хэш-тег не может быть использован дважды');
      hashtagInput.style.outline = errorOutline;
      return true;
    } else {
      hashtagInput.setCustomValidity('');
      hashtagInput.style.outline = '';
    }
  });
  hashtagInput.reportValidity();
}

hashtagInput.addEventListener('input', onHashtagInput);

hashtagInput.onfocus = function () {
  window.removeEventListener('keydown', onEscButtonCloseOverlay);
};
hashtagInput.onblur = function () {
  window.addEventListener('keydown', onEscButtonCloseOverlay);
};

commentTextArea.onfocus = function () {
  window.removeEventListener('keydown', onEscButtonCloseOverlay);
};
commentTextArea.onblur = function () {
  window.addEventListener('keydown', onEscButtonCloseOverlay);
};
