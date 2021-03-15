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
const COMMENTS_LIMIT = 5;

const showFullImage = function (data) {
  const pictures = document.querySelectorAll('.picture');

  for (let i = 0; i < pictures.length; i++) {
    pictures[i].addEventListener('click', function () {
      fullImageOverlay.classList.remove('hidden');
      body.classList.add('modal-open');
      commentsList.innerHTML = '';

      const { url, likes, comments, description } = data[i];
      fullImage.src = url;
      likesCount.textContent = likes;
      commentsCount.textContent = comments.length;
      imageDescription.textContent = description;
      let counter = 1;
      let currentComments = 5;

      loadButton.addEventListener('click', function (evt) {
        evt.preventDefault();
        counter++;
        commentsList.innerHTML = '';
        currentComments = COMMENTS_LIMIT * counter;
        replaceComments(comments.slice(0, currentComments).length, comments);
        socialCounter.textContent = currentComments + ' из ' + comments.length + ' комментариев';

        if (comments.length < currentComments) {
          loadButton.classList.add('hidden');
          counter = 1;
          currentComments = 5;
        } else if(currentComments >= comments.length  ){
          loadButton.classList.add('hidden');
          counter = 1;
          currentComments = 5;
          socialCounter.textContent = comments.length  + ' из ' + comments.length + ' комментариев';
        }
      });

      if (comments.length <= COMMENTS_LIMIT) {
        loadButton.classList.add('hidden');
        replaceComments(comments.length, comments);
        socialCounter.textContent = comments.length  + ' из ' + comments.length + ' комментариев';
      } else if (comments.length > COMMENTS_LIMIT) {
        loadButton.classList.remove('hidden');
        replaceComments(COMMENTS_LIMIT, comments);
        socialCounter.textContent = currentComments + ' из ' + comments.length + ' комментариев';
      }
    });
  }
};

// функции для закрытия оверлей просмотра большой картинки
closeModal.addEventListener('click', closeOverlayPicture);

window.addEventListener('keydown', closeOnEscOverlayPicture);

export { showFullImage };
