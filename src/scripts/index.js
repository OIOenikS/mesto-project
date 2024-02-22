import '../pages/index.css'; // импорт главного файла стилей
import {createCard, delCard, likeCard} from './card.js';
import {openModal, closeModal} from './modal.js';
import {enableValidation, clearValidation} from './validation.js';
import {getUser, getInitialCards, editeProfileServer, addNewPlaceServer, changeAvatarServer, validateLinkImage} from './api.js';

export const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

const sectionProfile = document.querySelector('.profile');
const buttonEditProfile = sectionProfile.querySelector('.profile__edit-button');
const buttonAddNewCard = sectionProfile.querySelector('.profile__add-button');

const popupAvatar = document.querySelector('.popup_type_avatar');
const bttnClosePopupAvatar = popupAvatar.querySelector('.popup__close');

const popupEdit = document.querySelector('.popup_type_edit');
const bttnClosePopupEdit = popupEdit.querySelector('.popup__close');

const popupNewCard = document.querySelector('.popup_type_new-card');
const bttnClosePopupNewCard = popupNewCard.querySelector('.popup__close');

const popupDeleteCard = document.querySelector('.popup_type_delete-card');
const bttnClosePopupDeleteCard = popupDeleteCard.querySelector('.popup__close');

const popupImage = document.querySelector('.popup_type_image');
const captionPopup = popupImage.querySelector('.popup__caption');
const imgOfPopup = popupImage.querySelector('.popup__image');
const bttnClosePopupImage = popupImage.querySelector('.popup__close');

const formEditProfile = document.querySelector('form[name=edit-profile]');
const nameInput = formEditProfile.elements.name;
const jobInput = formEditProfile.elements.description;
const bttnSaveEditProfile = formEditProfile.elements.save;

const formEditProfileImage = document.querySelector('form[name=new-avatar]');
const linkImageInput = formEditProfileImage.elements['link-img'];

const formNewPlace = document.querySelector('form[name=new-place]');
const namePlaceInput = formNewPlace.elements['place-name'];
const linkInput = formNewPlace.elements.link;

const profileImage = document.querySelector('.profile__image');
const profileTitle = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');

function renderLoading (isLoading) {
  if (isLoading) {
    bttnSaveEditProfile.textContent = 'Сохранение...';
  } else {
      bttnSaveEditProfile.textContent = 'Сохранить';
  }
}

//Обработчик открытия popup с img - начало
function openPopupImg (evt) {
  imgOfPopup.src = evt.target.src;
  imgOfPopup.alt = evt.target.alt;
  captionPopup.textContent = evt.target.closest('.places__item').textContent;
  openModal(popupImage);
}
//Обработчик открытия popup с img - конец

//Открытие и редактирование профиля - начало
buttonEditProfile.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileJob.textContent;
  clearValidation(popupEdit.querySelector('.popup__form'));
  openModal(popupEdit);
});

function handleFormEditProfileSubmit(evt) {
  evt.preventDefault();
  renderLoading(true);
  const valueName = nameInput.value;
  const valueJob = jobInput.value;
  editeProfileServer (valueName, valueJob)
    .then (() => {
      profileTitle.textContent = valueName;
      profileJob.textContent = valueJob;
    })
    .finally (
      renderLoading(false)
    )
  closeModal(evt.target.closest('.popup'));
}

formEditProfile.addEventListener('submit', handleFormEditProfileSubmit);
//Открытие и редактирование профиля - конец

//Открытие и редактирование аватара - начало
profileImage.addEventListener('click', () => {
  linkImageInput.value = '';
  openModal(popupAvatar);
})

function handleFormEditProfileImageSubmit(evt) {
  evt.preventDefault();
  const valuelinkImage = linkImageInput.value;
  changeAvatarServer (valuelinkImage)
    .then (() => {
      profileImage.style = `background-image: url(${valuelinkImage})`;
    })
  closeModal(evt.target.closest('.popup'));
}

formEditProfileImage.addEventListener('submit', handleFormEditProfileImageSubmit);
//Открытие и редактирование аватара - конец

//Открытие и добавление новой карточки - начало
buttonAddNewCard.addEventListener('click', () => {
  namePlaceInput.value = '';
  linkInput.value = '';
  clearValidation(popupNewCard.querySelector('.popup__form'));
  openModal(popupNewCard);
});

function handleFormNewPlaceSubmit(evt) {
  evt.preventDefault();
  const valueNamePlace = namePlaceInput.value;
  const valueLink = linkInput.value;
  const initialNewCard = {name: valueNamePlace, link: valueLink, likes: [], owner: {'_id' : '407bfac64d311bed9bf8aad4'}};
  const userId = '407bfac64d311bed9bf8aad4';
  addNewPlaceServer (valueNamePlace, valueLink)
    .then (() => {
      placesList.prepend(createCard(initialNewCard, userId, openPopupImg, delCard, likeCard));
    })
  evt.target.reset();
  closeModal(evt.target.closest('.popup'));
}

formNewPlace.addEventListener('submit', handleFormNewPlaceSubmit);
//Открытие и добавление новой карточки - конец

//Открытие окна подтверждения удаления карточки - начало
buttonAddNewCard.addEventListener('click', () => {
  namePlaceInput.value = '';
  linkInput.value = '';
  clearValidation(popupNewCard.querySelector('.popup__form'));
  openModal(popupNewCard);
});
//Открытие окна подтверждения удаления карточки - конец

//Закрытие Popup по кнопке "X"- начало
function identifyPopupForClose (evt) {
  closeModal(evt.target.closest('.popup'));
}
bttnClosePopupEdit.addEventListener('click', identifyPopupForClose);
bttnClosePopupNewCard.addEventListener('click', identifyPopupForClose);
bttnClosePopupImage.addEventListener('click', identifyPopupForClose);
bttnClosePopupAvatar.addEventListener('click', identifyPopupForClose);
bttnClosePopupDeleteCard.addEventListener('click', identifyPopupForClose);
//Закрытие Popup по кнопке "X"- конец

//Активация валидации
enableValidation();

/////////////////////////////////////////////////////////////////////////////////
//Загрузка карточек и данных пользователя с сервера при открытии страницы - начало

Promise.all([getUser(), getInitialCards()])
  .then ((resultOfPromises) => {
    return resultOfPromises;
    //console.log(resultOfPromises)
  })
  .then ((resultOfPromises) => {
    const user = resultOfPromises[0];
    profileImage.style = `background-image: url(${user.avatar})`;
    profileTitle.textContent = `${user.name}`;
    profileJob.textContent = `${user.about}`

    const cards = resultOfPromises[1];
    cards.forEach( card => {
      //console.log(card)
      const cardElement = createCard(card, user['_id'] ,openPopupImg, delCard, likeCard);
      
      placesList.append(cardElement)

/*
      buttonlikeCard.addEventListener('click', () => {
        LikeCard (card, user, checkMyLike, buttonlikeCard);
      })

*/
      
    })

  })
  .catch ((err) => {
    console.log(err); //сделать сложную логику обработки ошибок
  })

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

/*function LikeCard (card, user, checkMyLike, buttonlikeCard) {
  if (checkMyLike (card, user)) {
    deleteLikeServer (card)
      .then ((res) => {
        return res.json()
      })
      .then ((newCard) => {
        setCurrentStatusMyLike (newCard, user, checkMyLike, buttonlikeCard);
        
    })
  } else {
    addLikeServer (card)
    .then ((res) => {
      return res.json()
    })
    .then ((newCard) => {
      setCurrentStatusMyLike (newCard, user, checkMyLike, buttonlikeCard);
      
  })
  }
}

//Загрузка карточек и данных пользователя с сервера при открытии страницы  - конец
*/