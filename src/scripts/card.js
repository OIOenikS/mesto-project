import {cardTemplate} from './index.js';
import {deleteCardServer, addLikeServer, deleteLikeServer} from './api.js';
import {openModal, closeModal} from './modal.js';

function delCard (cardItem) {
  cardItem.remove();
}

function likeCard (bttnLike) {
  bttnLike.classList.toggle('card__like-button_is-active');
}

function getCardTemplate (templateCard) {
  return templateCard.querySelector('.places__item').cloneNode(true);
}

function deletebuttonCardDel (cardUserId, userId, buttonCardDel) {
  if (cardUserId !== userId) {
    buttonCardDel.remove()
  }
}

function setCurrentStatusMyLike (card, userId, buttonlikeCard) {
  if (checkMyLike (card, userId)) {
    buttonlikeCard.classList.add('card__like-button_is-active');
  } else {
    buttonlikeCard.classList.remove('card__like-button_is-active');
  }
}

function checkMyLike (card, userId) {
  const likes = card.likes;
  return likes.some ((like) => {
    if (like['_id'] === userId) {
      return true;
    }
    return false;
  })
}

function changeStatusMyLike (card, buttonlikeCard, likeCounter) {
  if (buttonlikeCard.classList.contains('card__like-button_is-active')) {
    deleteLikeServer (card)
      .then ((updatedСard) => {
        likeCard(buttonlikeCard);
        likeCounter.textContent = updatedСard.likes.length;
      })
  } else {
    addLikeServer (card)
      .then ((updatedСard) => {
        likeCard(buttonlikeCard);
        likeCounter.textContent = updatedСard.likes.length;
      })
  }
}

function createCard(card, userId ,openImagePopup, deleteCard, likeCard) {
  const cardElement = getCardTemplate(cardTemplate);
  const cardTitle = cardElement.querySelector('.card__title');
  const imgCard = cardElement.querySelector('.card__image');
  const buttonCardDel = cardElement.querySelector('.card__delete-button');
  const buttonlikeCard = cardElement.querySelector('.card__like-button');
  const likeCounter = cardElement.querySelector('.card__like-counter');
  const idUserCreateCard = card.owner['_id'];
  const counterLikes = card.likes.length;

  

  cardTitle.textContent = `${card.name}`;
  likeCounter.textContent = `${counterLikes}`;
  imgCard.src = `${card.link}`;
  imgCard.alt = `Фото: ${card.name}`;
  imgCard.addEventListener('click', openImagePopup);

  deletebuttonCardDel (idUserCreateCard, userId, buttonCardDel); //Удалили иконку кнопки удаления на карточке
  buttonCardDel.addEventListener('click', () => {
    openModal (document.querySelector('.popup_type_delete-card'))
  })
    //deleteCard(cardElement);
    //deleteCardServer (card);
  
  
  setCurrentStatusMyLike (card, userId, buttonlikeCard) //Установили текущий статус моего лайка
  buttonlikeCard.addEventListener('click', (evt) => {
    changeStatusMyLike (card, evt.target, likeCounter);
  });

  return cardElement;
}

export {createCard, delCard, likeCard};