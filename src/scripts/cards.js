import {cardTemplate} from './index.js';

const KamchatkaImage = new URL('../images/Kamchatka.jpg', import.meta.url);
const KizhiImage = new URL('../images/Kizhi.jpg', import.meta.url);
const KomiImage = new URL('../images/Komi.jpg', import.meta.url)
const MoscowImage = new URL('../images/Moscow.jpg', import.meta.url);
const OlkhonImage = new URL('../images/OlkhonIsland.jpg', import.meta.url);
const VolgogradImage = new URL('../images/Volgograd.jpg', import.meta.url)


const initialCards = [
        {
          name: "Камчатка",
          link: KamchatkaImage,
        },
        {
          name: "Кижи, Карелия",
          link: KizhiImage,
        },
        {
          name: "Республика Коми",
          link: KomiImage,
        },
        {
          name: "Москва",
          link: MoscowImage,
        },
        {
          name: "Остров Ольхон",
          link: OlkhonImage,
        },
        {
          name: "Волгоград",
          link: VolgogradImage,
        }
    ];

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

export {createCard, initialCards, delCard, likeCard};
