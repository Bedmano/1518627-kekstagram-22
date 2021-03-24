/* global _:readonly */
import { getRandom } from './util.js';
import { renderPictures } from './render-pictures.js';
const RANDOM_PICTURES_NUMBER = 10;
const SET_DELAY = 500;
const sort = document.querySelector('.img-filters');
const sortForm = document.querySelector('.img-filters__form');
const defaultSetting = document.querySelector('#filter-default');
const randomSetting = document.querySelector('#filter-random');
const popularSetting = document.querySelector('#filter-discussed');

const getRandomArrayElement = (pictures) => {
  return pictures[getRandom(0, pictures.length - 1)];
};

const getRandomArray = (pictures, randomArrayLength) => {
  if (pictures.length <= randomArrayLength) {
    return pictures;
  }
  const OriginalPictures = new Set();
  while (OriginalPictures.size < randomArrayLength) {
    OriginalPictures.add(getRandomArrayElement(pictures));
  }
  return Array.from(OriginalPictures);
};

const sortRandom = function (pictures) {
  return getRandomArray(pictures, RANDOM_PICTURES_NUMBER);
};

const sortDefault = function (pictures) {
  return pictures;
};

const sortByComments = function (pictures) {
  return pictures.slice().sort((a, b) => b.comments.length - a.comments.length);
};

const sortImages = function (pictures) {
  sort.classList.remove('img-filters--inactive');
  sortForm.addEventListener('click', _.debounce ((evt) => {
    if (!evt.target.classList.contains('img-filters__button--active')) {
      const activeButton = document.querySelector('.img-filters__button--active');
      if (activeButton) {
        activeButton.classList.remove('img-filters__button--active');
        evt.target.classList.add('img-filters__button--active');
      }
    }
    if (defaultSetting.classList.contains('img-filters__button--active')) {
      renderPictures(sortDefault(pictures));
    } else if (randomSetting.classList.contains('img-filters__button--active')) {
      renderPictures(sortRandom(pictures));
    } else if (popularSetting.classList.contains('img-filters__button--active')) {
      renderPictures(sortByComments(pictures));
    }
  }, SET_DELAY))
};
export { sortImages };
