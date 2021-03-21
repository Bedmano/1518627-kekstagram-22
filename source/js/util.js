/* global noUiSlider:readonly */
const body = document.querySelector('body');
const main = document.querySelector('main');
const sliderElement = document.querySelector('.effect-level__slider');
const noEffectButton = document.querySelector('#effect-none');
const fullImageOverlay = document.querySelector('.big-picture');
const overlay = document.querySelector('.img-upload__overlay');
const commentTextArea = document.querySelector('.text__description');
const hashtagInput = document.querySelector('.text__hashtags');
const imageScale = document.querySelector('.scale__control--value');
const imageContainer = document.querySelector('.img-upload__preview');
const innerImage = imageContainer.querySelector('img');
const lessSizeButton = document.querySelector('.scale__control--smaller');
const moreSizeButton = document.querySelector('.scale__control--bigger');

const ALERT_TIMER = 5000;

const args = {
  successId: '#success',
  successClass: '.success',
  errorId: '#error',
  errorClass: '.error',
};

const getRandom = function (min, max) {
  if (min > max) {
    let swap = min;
    min = max;
    max = swap;
  }

  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const isEscButton = function (evt) {
  return evt.key === ('Escape' || 'Esc');
};

const createNewElement = function(tag, elementClass){
  const newElement = document.createElement(tag);
  newElement.classList.add(elementClass);
  return newElement
}

const createSlider = function () {
  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 1,
    },
    start: 0,
    step: 0.1,
    connect: 'lower',
  });
};

const closeOverlay = function () {
  overlay.classList.add('hidden'),
  body.classList.remove('modal-open');
  setToDefault();
};

const closeOnEscButtonOverlay = function (evt) {
  if (isEscButton(evt)) {
    evt.preventDefault();
    overlay.classList.add('hidden'),
    body.classList.remove('modal-open');
    setToDefault();
  }
};

const closeOverlayPicture = function () {
  fullImageOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
};

const closeOnEscOverlayPicture = function (evt) {
  if (isEscButton(evt)) {
    evt.preventDefault();
    fullImageOverlay.classList.add('hidden');
    body.classList.remove('modal-open');
  }
};

const setToDefault = function () {
  noEffectButton.checked = true;

  if (sliderElement.classList.contains('noUi-target')) {
    sliderElement.noUiSlider.destroy();
  }

  imageScale.value = '100%';
  innerImage.style.transform = 'scale(1)';
  innerImage.style.filter = 'none';
  innerImage.src = '';
  lessSizeButton.disabled = false;
  moreSizeButton.disabled = true;
  hashtagInput.value = '';
  commentTextArea.value = '';
};

const showAlert = function (id, selector) {
  closeOverlay();

  const fragment = document.createDocumentFragment();
  const template = document.querySelector(id).content;
  const message = template.querySelector(selector);

  const element = message.cloneNode(true);

  fragment.appendChild(element);
  main.appendChild(fragment);

  const elementMessage = document.querySelector(selector);
  const inner = document.querySelector(selector + '__inner');
  const closeMessage = document.querySelector(selector + '__button');

  closeMessage.addEventListener('click', function () {
    setToDefault();
    elementMessage.remove();
  });

  window.addEventListener('keydown', function (evt) {
    if (isEscButton(evt)) {
      evt.preventDefault();
      setToDefault();
      elementMessage.remove();
    }
  });

  const handler = function (evt) {
    if (!inner.contains(evt.target)) {
      setToDefault();
      elementMessage.remove();
    }
  };

  elementMessage.addEventListener('click', handler);
};

const failToGetAlert = function (message) {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.border = 'solid 2px red';
  alertContainer.style.fontSize = '24px';
  alertContainer.style.lineHeight = '30px';
  alertContainer.style.width = '50%';
  alertContainer.style.minHeight = '10%';
  alertContainer.style.backgroundColor = 'white';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.paddingTop = '10px';
  alertContainer.style.paddingBottom = '10px';
  alertContainer.style.margin = '0 auto';
  alertContainer.style.color = 'black';
  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_TIMER);
};

export {
  getRandom,
  isEscButton,
  createSlider,
  closeOnEscButtonOverlay,
  closeOverlay,
  closeOverlayPicture,
  closeOnEscOverlayPicture,
  showAlert,
  createNewElement,
  args,
  failToGetAlert
};
