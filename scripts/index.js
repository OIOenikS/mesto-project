// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

function delCard (evt) {
  const parentBttnDelCard = evt.target.closest('.places__item');
  parentBttnDelCard.remove();
}

function createCard(cards, funDelCard) {
  cards.forEach(detailsCard => {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    cardElement.querySelector('.card__image').src = `${detailsCard.link}`;
    cardElement.querySelector('.card__image').alt = `Фото: ${detailsCard.name}`;
    cardElement.querySelector('.card__title').textContent = `${detailsCard.name}`;
    cardElement.querySelector('.card__delete-button').addEventListener('click', funDelCard);
    placesList.append(cardElement);
  })
}

createCard(initialCards, delCard);