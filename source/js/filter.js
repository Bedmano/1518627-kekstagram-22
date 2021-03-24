import { createSlider } from './util.js';
import { imageContainer } from './replace-image.js'
const sliderElement = document.querySelector('.effect-level__slider');
const sliderBar = document.querySelector('.effect-level');
const valueElement = document.querySelector('.effect-level__value');
const noEffectButton = document.querySelector('#effect-none');
const chromeEffectButton = document.querySelector('#effect-chrome');
const sepiaEffectButton = document.querySelector('#effect-sepia');
const marvinEffectButton = document.querySelector('#effect-marvin');
const phobosEffectButton = document.querySelector('#effect-phobos');
const heatEffectButton = document.querySelector('#effect-heat');

const settings = {
  chrome: 'grayscale',
  sepia: 'sepia',
  marvin: 'invert',
  phobos: 'blur',
  heat: 'brightness',
  percent: '%',
  pixel: 'px',
  empty: '',
};

let innerImage = imageContainer.querySelector('img');
valueElement.value = 0;
sliderBar.style.display = 'none';

const updateFilter = function (filterName, unit) {
  sliderElement.noUiSlider.on('update', (_, handle, unencoded) => {

    valueElement.value = unencoded[handle];
    innerImage.style.filter =
      '' + filterName + '(' + valueElement.value + unit + ')';
  });
};

noEffectButton.addEventListener('change', function (evt) {
  if (evt.target.checked) {
    innerImage.style.filter = 'none';
    sliderBar.style.display = 'none';
    valueElement.step = '0.1';
    sliderElement.noUiSlider.destroy();
  }
});

chromeEffectButton.addEventListener('change', function (evt) {

  if(!sliderElement.classList.contains('noUi-target')){
    createSlider();
  }

  sliderElement.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 1,
    },
    start: 0,
    step: 0.1,
  });

  if (evt.target.checked) {
    sliderElement.noUiSlider.set(1);
    sliderBar.style.display = 'block';
    innerImage.style.filter = 'none';
    valueElement.step = '0.1';
    updateFilter(settings.chrome, settings.empty);
  }
});

sepiaEffectButton.addEventListener('change', function (evt) {
  if(!sliderElement.classList.contains('noUi-target')){
    createSlider();
  }
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 1,
    },
    start: 0,
    step: 0.1,
  });
  if (evt.target.checked) {
    sliderElement.noUiSlider.set(1);
    sliderBar.style.display = 'block';
    innerImage.style.filter = 'none';
    valueElement.step = '0.1';
    updateFilter(settings.sepia, settings.empty);
  }
});

marvinEffectButton.addEventListener('change', function (evt) {
  if(!sliderElement.classList.contains('noUi-target')){
    createSlider();
  }
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 100,
    },
    start: 0,
    step: 1,
  });
  if (evt.target.checked) {
    sliderElement.noUiSlider.set(100);
    sliderBar.style.display = 'block';
    innerImage.style.filter = 'none';
    valueElement.step = '1';
    updateFilter(settings.marvin, settings.percent);
  }
});

phobosEffectButton.addEventListener('change', function (evt) {
  if(!sliderElement.classList.contains('noUi-target')){
    createSlider();
  }
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 3,
    },
    start: 0,
    step: 0.1,
  });
  if (evt.target.checked) {
    sliderElement.noUiSlider.set(3);
    sliderBar.style.display = 'block';
    innerImage.style.filter = 'none';
    valueElement.step = '0.1';
    updateFilter(settings.phobos, settings.pixel);
  }
});

heatEffectButton.addEventListener('change', function (evt) {
  if(!sliderElement.classList.contains('noUi-target')){
    createSlider();
  }
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: 1,
      max: 3,
    },
    start: 1,
    step: 0.1,
  });
  if (evt.target.checked) {
    sliderElement.noUiSlider.set(3);
    sliderBar.style.display = 'block';
    innerImage.style.filter = 'none';
    valueElement.step = '0.1';
    updateFilter(settings.heat, settings.empty);
  }
});

export { valueElement };
