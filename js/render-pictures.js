import { showFullImage } from './show-full-image.js';
const pictures = document.querySelector('.pictures');
const pictureFragment = document.querySelector('#picture').content;
const picture = pictureFragment.querySelector('.picture');

const commentsArray = [];
const descriptionArray = [];

const removePictures = function(){
  document.querySelectorAll('.picture').forEach((item) => item.remove())
}

const renderPictures = function (picturesArray) {
  removePictures();
  const fragment = document.createDocumentFragment();
  picturesArray.forEach(({ url, likes, comments }) => {
    const photoElement = picture.cloneNode(true);
    photoElement.querySelector('.picture__img').src = url;
    photoElement.querySelector('.picture__comments').textContent =
      comments.length;
    photoElement.querySelector('.picture__likes').textContent = likes;
    fragment.appendChild(photoElement);
  });

  pictures.appendChild(fragment);
  showFullImage(picturesArray);
};
export { renderPictures, removePictures, commentsArray, descriptionArray };
