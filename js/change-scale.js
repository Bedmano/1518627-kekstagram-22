import { innerImage } from './replace-image.js';
const lessSizeButton = document.querySelector('.scale__control--smaller');
const moreSizeButton = document.querySelector('.scale__control--bigger');
let currentSize = document.querySelector('.scale__control--value');
const settings = {
  STEP: 25,
  MIN: 25,
  MAX: 100,
}
const changeScale = function(){
  lessSizeButton.addEventListener('click', function () {
    let sum = (currentSize.value = currentSize.value.replace(/[%]/g, '') - settings.STEP);

    if (sum < settings.MIN) {
      currentSize.value = settings.MIN;
      lessSizeButton.disabled = true;
    } else {
      lessSizeButton.disabled = false;
      moreSizeButton.disabled = false;
    }
    innerImage.style.transform = 'scale(0.' + currentSize.value + ')';
    currentSize.value += '%';
  });

  moreSizeButton.addEventListener('click', function () {
    let sum = (currentSize.value = +currentSize.value.replace(/[%]/g, '') + settings.STEP);
    if (sum > settings.MAX) {
      currentSize.value = settings.MAX;
      moreSizeButton.disabled = true;
    } else {
      lessSizeButton.disabled = false;
    }

    if(currentSize.value < settings.MAX){
      innerImage.style.transform = 'scale(0.' + currentSize.value + ')';
    } else{
      innerImage.style.transform = 'scale(1)'
    }
    currentSize.value += '%';
  });
}

changeScale();
