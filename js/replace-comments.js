const commentsList = document.querySelector('.social__comments');

import { createNewElement } from './util.js';

const replaceComments = function (commentsLength, comments) {
  const fragment = document.createDocumentFragment();
  for(let j = 0; j < commentsLength; j++){
    const newListItem = createNewElement('li', 'social__comment');
    const userAvatar = createNewElement('img', 'social__picture');
    const { avatar, name, message } = comments[j];
    userAvatar.src = avatar;
    userAvatar.alt = name;
    newListItem.appendChild(userAvatar);
    const commentText = createNewElement('p', 'social__text')
    commentText.textContent = message;
    newListItem.appendChild(commentText);
    fragment.appendChild(newListItem);
  }
  commentsList.appendChild(fragment);
};

export { replaceComments };
