import { innerImage } from './replace-image.js';
const lessSizeButton = document.querySelector('.scale__control--smaller');
const moreSizeButton = document.querySelector('.scale__control--bigger');
const currentSize = document.querySelector('.scale__control--value');

const settings = {
  step: 25,
  min: 25,
  max: 100,
}
const changeScale = function(){
  lessSizeButton.addEventListener('click', function () {
    let sum = (currentSize.value = currentSize.value.replace(/[%]/g, '') - settings.step);

    if (sum < settings.min) {
      currentSize.value = settings.min;
      lessSizeButton.disabled = true;
    } else {
      lessSizeButton.disabled = false;
      moreSizeButton.disabled = false;
    }
    innerImage.style.transform = 'scale(0.' + currentSize.value + ')';
    currentSize.value += '%';
  });

  moreSizeButton.addEventListener('click', function () {
    let sum = (currentSize.value = +currentSize.value.replace(/[%]/g, '') + settings.step);
    if (sum > settings.max) {
      currentSize.value = settings.max;
      moreSizeButton.disabled = true;
    } else {
      lessSizeButton.disabled = false;
    }

    if(currentSize.value < settings.max){
      innerImage.style.transform = 'scale(0.' + currentSize.value + ')';
    } else{
      innerImage.style.transform = 'scale(1)'
    }
    currentSize.value += '%';
  });
}

changeScale();
