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

const popupUpdateAvatar = document.querySelector('.popup_type_update-avatar');
const bttnClosePopupUpdateAvatar = popupUpdateAvatar.querySelector('.popup__close');

const popupEdit = document.querySelector('.popup_type_edit');
const bttnClosePopupEdit = popupEdit.querySelector('.popup__close');

const popupNewCard = document.querySelector('.popup_type_new-card');
const bttnClosePopupNewCard = popupNewCard.querySelector('.popup__close');

const popupConfirm = document.querySelector('.popup_type_confirm');
const bttnClosePopupConfirm = popupConfirm.querySelector('.popup__close');
const formConfirm = document.querySelector('form[name=confirm]');

const popupImage = document.querySelector('.popup_type_image');
const captionPopup = popupImage.querySelector('.popup__caption');
const imgOfPopup = popupImage.querySelector('.popup__image');
const bttnClosePopupImage = popupImage.querySelector('.popup__close');

const formEditProfile = document.querySelector('form[name=edit-profile]');
const nameInput = formEditProfile.elements.name;
const jobInput = formEditProfile.elements.description;

const formUpdateAvatar = document.querySelector('form[name=update-avatar]');
const linkImageInput = formUpdateAvatar.elements['link-img'];

const formNewPlace = document.querySelector('form[name=new-place]');
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

popupUpdateAvatar,
bttnClosePopupUpdateAvatar,

popupEdit,
bttnClosePopupEdit,

popupNewCard,
bttnClosePopupNewCard,

popupConfirm,
bttnClosePopupConfirm,
formConfirm, // in card.js

popupImage,
captionPopup,
imgOfPopup,
bttnClosePopupImage,

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
