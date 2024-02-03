import {cardTemplate} from './index.js';

function delCard (cardItem) {
  cardItem.remove();
}

function likeCard (bttnLike) {
  bttnLike.classList.toggle('card__like-button_is-active');
}

function getCardTemplate (templateCard) {
  return templateCard.querySelector('.places__item').cloneNode(true);
}

function createCard(card, openImagePopup, deleteCard, likeCard) {
  const cardElement = getCardTemplate(cardTemplate);
  const cardTitle = cardElement.querySelector('.card__title');
  const imgCard = cardElement.querySelector('.card__image');
  const buttonCardDel = cardElement.querySelector('.card__delete-button');
  const buttonlikeCard = cardElement.querySelector('.card__like-button');

  cardTitle.textContent = `${card.name}`;

  imgCard.src = `${card.link}`;
  imgCard.alt = `Фото: ${card.name}`;
  imgCard.addEventListener('click', openImagePopup);
  
  buttonCardDel.addEventListener('click', () => {
    deleteCard(cardElement);
  });
  buttonlikeCard.addEventListener('click', (evt) => {
    likeCard(evt.target);
  });

  return cardElement;
}

export {createCard, delCard, likeCard};
