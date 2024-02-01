import {cardTemplate} from './index.js';

function delCard (cardItem) {
  cardItem.remove();
}

function likeCard (bttnLike) {
  bttnLike.classList.toggle('card__like-button_is-active');
}

function createCard(card, funOpenPopupImg, funDelCard, funLikeCard) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardTitle = cardElement.querySelector('.card__title');
  const imgCard = cardElement.querySelector('.card__image');
  const buttonCardDel = cardElement.querySelector('.card__delete-button');
  const buttonlikeCard = cardElement.querySelector('.card__like-button');

  cardTitle.textContent = `${card.name}`;

  imgCard.src = `${card.link}`;
  imgCard.alt = `Фото: ${card.name}`;
  imgCard.addEventListener('click', funOpenPopupImg);
  
  buttonCardDel.addEventListener('click', () => {
    funDelCard(cardElement);
  });
  buttonlikeCard.addEventListener('click', (evt) => {
    funLikeCard(evt.target);
  });

  return cardElement;
}

export {createCard, delCard, likeCard};
