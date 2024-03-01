const validConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

const sectionProfile = document.querySelector('.profile');
const buttonEditProfile = sectionProfile.querySelector('.profile__edit-button');
const buttonAddNewCard = sectionProfile.querySelector('.profile__add-button');

const closePopupButtons = document.querySelectorAll('.popup__close');

const popupUpdateAvatar = document.querySelector('.popup_type_update-avatar');

const popupEdit = document.querySelector('.popup_type_edit');

const popupNewCard = document.querySelector('.popup_type_new-card');

const popupConfirm = document.querySelector('.popup_type_confirm');
const formConfirm = document.forms.confirm;

const popupImage = document.querySelector('.popup_type_image');
const captionPopup = popupImage.querySelector('.popup__caption');
const imgOfPopup = popupImage.querySelector('.popup__image');

const formEditProfile = document.forms["edit-profile"];
const nameInput = formEditProfile.elements.name;
const jobInput = formEditProfile.elements.description;

const formUpdateAvatar = document.forms["update-avatar"];
const linkImageInput = formUpdateAvatar.elements['link-img'];

const formNewPlace = document.forms["new-place"];
const namePlaceInput = formNewPlace.elements['place-name'];
const linkInput = formNewPlace.elements.link;

const profileImage = document.querySelector('.profile__image');
const profileTitle = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');

export {
validConfig,
cardTemplate, // in card.js
placesList,
buttonEditProfile,
buttonAddNewCard,
closePopupButtons,
popupUpdateAvatar,
popupEdit,
popupNewCard,
popupConfirm,
formConfirm, // in card.js
popupImage,
captionPopup,
imgOfPopup,
formEditProfile,
nameInput,
jobInput,
formUpdateAvatar,
linkImageInput,
formNewPlace,
namePlaceInput,
linkInput,
profileImage,
profileTitle,
profileJob,
}
