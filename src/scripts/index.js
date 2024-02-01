import '../pages/index.css'; // импорт главного файла стилей
import {createCard, delCard, likeCard} from './card.js';
import {initialCards} from './cards.js';
import {openModal, closeModal} from './modal.js';

export const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

const sectionProfile = document.querySelector('.profile');
const buttonEditProfile = sectionProfile.querySelector('.profile__edit-button');
const buttonAddNewCard = sectionProfile.querySelector('.profile__add-button');

const popupEdit = document.querySelector('.popup_type_edit');
const bttnClosePopupEdit = popupEdit.querySelector('.popup__close');

const popupNewCard = document.querySelector('.popup_type_new-card');
const bttnClosePopupNewCard = popupNewCard.querySelector('.popup__close');

const popupImage = document.querySelector('.popup_type_image');
const bttnClosePopupImage = popupImage.querySelector('.popup__close');

const formEditProfile = document.querySelector('form[name=edit-profile]');
const nameInput = formEditProfile.elements.name;
const jobInput = formEditProfile.elements.description;

const formNewPlace = document.querySelector('form[name=new-place]');
const namePlaceInput = formNewPlace.elements['place-name'];
const linkInput = formNewPlace.elements.link;

const profileTitle = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');

//Обработчик открытия popup с img - начало
function openPopupImg (evt) {
  const captionPopup = popupImage.querySelector('.popup__caption');
  const imgOfPopup = popupImage.querySelector('.popup__image');

  imgOfPopup.src = evt.target.src;
  imgOfPopup.alt = evt.target.alt;
  captionPopup.textContent = evt.target.closest('.places__item').textContent;
  openModal(popupImage);
}
//Обработчик открытия popup с img - конец

initialCards.forEach( item => {
  placesList.append(createCard(item, openPopupImg, delCard, likeCard))
});

//Открытие и редактирование профиля - начало
buttonEditProfile.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileJob.textContent;
  openModal(popupEdit);
});

function handleFormEditProfileSubmit(evt) {
  evt.preventDefault();

  const valueName = nameInput.value;
  const valueJob = jobInput.value;

  profileTitle.textContent = valueName;
  profileJob.textContent = valueJob;
  
  closeModal(evt.target.closest('.popup'));
}

formEditProfile.addEventListener('submit', handleFormEditProfileSubmit);
//Открытие и редактирование профиля - конец

//Открытие и добавление новой карточек - начало
buttonAddNewCard.addEventListener('click', () => {
  openModal(popupNewCard);
});

function handleFormNewPlaceSubmit(evt) {
  evt.preventDefault();

  const valueNamePlace = namePlaceInput.value;
  const valueLink = linkInput.value;
  const initialNewCard = {name: valueNamePlace, link: valueLink};
  
  placesList.prepend(createCard(initialNewCard, delCard, likeCard, openModal));

  evt.target.reset();
  closeModal(evt.target.closest('.popup'));
}

formNewPlace.addEventListener('submit', handleFormNewPlaceSubmit);
//Открытие и добавление новой карточек - конец

//Закрытие Popup по кнопке "X"- начало
function identifyPopupForClose (evt) {
  closeModal(evt.target.closest('.popup'));
}
bttnClosePopupEdit.addEventListener('click', identifyPopupForClose);
bttnClosePopupNewCard.addEventListener('click', identifyPopupForClose);
bttnClosePopupImage.addEventListener('click', identifyPopupForClose);
//Закрытие Popup по кнопке "X"- конец