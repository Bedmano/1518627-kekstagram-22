import { onEscButtonOverlay } from './util.js';

const hashtagInput = document.querySelector('.text__hashtags');
const commentTextArea = document.querySelector('.text__description');
const HASHTAG_LENGTH = 20;
const MAX_HASHTAG_NUMBER = 5;

const isValidHastag = (input) => {
  return /^\w+$/.test(input) && !(~input.indexOf('_'));
}

const checkOriginality = function (hashtags) {
  const originalHashtag = [];
  let originality = true;
  hashtags.forEach((hashtag) => {
    const hashtagLowerCase = hashtag.toLowerCase();
    if (originalHashtag.includes(hashtagLowerCase)) {
      originality = false;
    } else {
      originalHashtag.push(hashtagLowerCase);
    }
  });
  return originality;
};

const validateHashtag = function (input) {
  let error = '';
  if (input.slice(0, 1) !== '#') {
    error = 'Хэштег должен начинаться с решётки';
  } else if (!isValidHastag(input.slice(1))) {
    error = 'Хэштэг не должен содержать спецсимволы';
  } else if (input.length > HASHTAG_LENGTH) {
    error =
      'Хэштег не должен быть длиннее 20 символов (включая символ решётки)';
  }
  return error;
};

const checkHashtagInput = function (input) {
  let error = '';
  const erorrsArray = [];
  const hashtags = input.split(' ');
  if (hashtags.length > MAX_HASHTAG_NUMBER) {
    erorrsArray.push('Количество хэштегов не должно привышать 5');
  }
  if (!checkOriginality(hashtags)) {
    erorrsArray.push('Хэштег не может повторяться');
  }
  hashtags.forEach((hashtag) => {
    error = validateHashtag(hashtag);
    if (error) {
      erorrsArray.push(error);
    }
  });
  error = erorrsArray.join(', ');
  return error;
};

hashtagInput.onfocus = function () {
  window.removeEventListener('keydown', onEscButtonOverlay);
};
hashtagInput.onblur = function () {
  window.addEventListener('keydown', onEscButtonOverlay);
};

hashtagInput.addEventListener('input', function () {
  hashtagInput.setCustomValidity(checkHashtagInput(hashtagInput.value));
});

commentTextArea.onfocus = function () {
  window.removeEventListener('keydown', onEscButtonOverlay);
};
commentTextArea.onblur = function () {
  window.addEventListener('keydown', onEscButtonOverlay);
};
