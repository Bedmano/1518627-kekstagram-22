import { closeOnEscOverlayPicture, closeOverlayPicture } from './util.js';
import { replaceComments } from './replace-comments.js';

const fullImageOverlay = document.querySelector('.big-picture');
const fullImage = document.querySelector('.big-picture__img').querySelector('img');
const closeModal = document.querySelector('.big-picture__cancel');
const likesCount = document.querySelector('.likes-count');
const commentsCount = document.querySelector('.comments-count');
const commentsList = document.querySelector('.social__comments');
const imageDescription = document.querySelector('.social__caption');
const socialCounter = document.querySelector('.social__comment-count');
const body = document.querySelector('body');
const loadButton = document.querySelector('.comments-loader');
const COMMENTS_START_VALUE = 5;
const COMMENTS_STEP = 5;

const showFullImage = function (picturesArray) {
  const pictures = document.querySelectorAll('.picture');

  pictures.forEach((picture, index) => {
    picture.addEventListener('click', () => {
      fullImageOverlay.classList.remove('hidden');
      body.classList.add('modal-open');
      commentsList.innerHTML = '';

      let currentComments = COMMENTS_START_VALUE;
      const { url, likes, comments, description } = picturesArray[index];
      fullImage.src = url;
      likesCount.textContent = likes;
      commentsCount.textContent = comments.length;
      imageDescription.textContent = description;

      const loadComments = function () {
        currentComments += COMMENTS_STEP;
        socialCounter.textContent =
          currentComments + ' из ' + comments.length + ' комментариев';
        showComments();
      };

      const showComments = function () {
        commentsList.innerHTML = '';
        loadButton.classList.remove('hidden');
        socialCounter.textContent =
          currentComments + ' из ' + comments.length + ' комментариев';

        if (comments.length <= currentComments) {
          loadButton.classList.add('hidden');
          loadButton.removeEventListener('click', loadComments);
          socialCounter.textContent =
            comments.length + ' из ' + comments.length + ' комментариев';
        }

        replaceComments(currentComments, comments);
      };

      showComments();

      if (comments.length > COMMENTS_START_VALUE) {
        loadButton.addEventListener('click', loadComments);
      }
    });
  });
};

closeModal.addEventListener('click', closeOverlayPicture);

window.addEventListener('keydown', closeOnEscOverlayPicture);

export { showFullImage };
