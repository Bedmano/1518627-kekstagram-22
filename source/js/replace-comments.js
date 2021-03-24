import { createNewElement } from './util.js';
const commentsList = document.querySelector('.social__comments');

const replaceComments = function (currentComments, comments) {
  const fragment = document.createDocumentFragment();
  comments.slice(0, currentComments).forEach(comment => {
    const newListItem = createNewElement('li', 'social__comment');
    const userAvatar = createNewElement('img', 'social__picture');
    const { avatar, name, message } = comment;
    userAvatar.src = avatar;
    userAvatar.alt = name;
    newListItem.appendChild(userAvatar);
    const commentText = createNewElement('p', 'social__text')
    commentText.textContent = message;
    newListItem.appendChild(commentText);
    fragment.appendChild(newListItem);
  });
  commentsList.appendChild(fragment);
};

export { replaceComments };
