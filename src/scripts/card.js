import {cardTemplate} from './constants.js';
import {addLikeServer, deleteLikeServer} from './api.js';

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

function changeStatusMyLike (likeConfig) {
  const {card, buttonlikeCard, likeCounter, likeCard} = likeConfig;
  if (buttonlikeCard.classList.contains('card__like-button_is-active')) {
    deleteLikeServer (card)
      .then ((updatedСard) => {
        likeCard(buttonlikeCard);
        likeCounter.textContent = updatedСard.likes.length;
      })
      .catch(console.error)
  } else {
    addLikeServer (card)
      .then ((updatedСard) => {
        likeCard(buttonlikeCard);
        likeCounter.textContent = updatedСard.likes.length;
      })
      .catch(console.error)
    }
}

function createCard(cardConfig) {
  const {card, userId, openPopupImg, likeCard, handleDelete} = cardConfig;
  const cardElement = getCardTemplate(cardTemplate);
  const cardTitle = cardElement.querySelector('.card__title');
  const imgCard = cardElement.querySelector('.card__image');
  const buttonCardDel = cardElement.querySelector('.card__delete-button');
  const buttonlikeCard = cardElement.querySelector('.card__like-button');
  const likeCounter = cardElement.querySelector('.card__like-counter');
  const idUserCreateCard = card.owner['_id'];
  const counterLikes = card.likes.length;

  cardElement.id = card['_id'];

  cardTitle.textContent = `${card.name}`;
  likeCounter.textContent = `${counterLikes}`;
  imgCard.src = `${card.link}`;
  imgCard.alt = `Фото: ${card.name}`;
  imgCard.addEventListener('click', () => {
    openPopupImg(card.name, card.link);
  });

  buttonCardDel.addEventListener('click', handleDelete)
  
  buttonlikeCard.addEventListener('click', (evt) => {
    changeStatusMyLike ({card, buttonlikeCard: evt.target, likeCounter, likeCard});
  });

  deletebuttonCardDel (idUserCreateCard, userId, buttonCardDel); //Удалили иконку кнопки удаления на карточке
  setCurrentStatusMyLike (card, userId, buttonlikeCard) //Установили текущий статус моего лайка

  return cardElement;
}

export {createCard, delCard, likeCard};