import '../pages/index.css'; // импорт главного файла стилей
import {createCard, delCard, likeCard} from './card.js';
import {openModal, closeModal} from './modal.js';
import {enableValidation, clearValidation} from './validation.js';
import {getUser, getInitialCards, editeProfileServer, addNewPlaceServer, updateAvatarServer, deleteCardServer} from './api.js';
import {
  validConfig,
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
  formConfirm,
  popupImage,
  captionPopup,
  imgOfPopup,
  bttnClosePopupImage,
  formEditProfile,
  nameInput,
  jobInput,
  bttnSaveEditProfile,
  formUpdateAvatar,
  linkImageInput,
  formNewPlace,
  namePlaceInput,
  linkInput,
  profileImage,
  profileTitle,
  profileJob,
  } from './constants.js'
  

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

//Активация валидации
enableValidation(validConfig);

//Открытие и редактирование профиля - начало
buttonEditProfile.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileJob.textContent;
  clearValidation (formEditProfile, validConfig);
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

//Открытие и редактирование аватара - начало
profileImage.addEventListener('click', () => {
  linkImageInput.value = '';
  clearValidation (formUpdateAvatar, validConfig);
  openModal(popupUpdateAvatar);
})
function handleFormEditProfileImageSubmit(evt) {
  evt.preventDefault();
  const valuelinkImage = linkImageInput.value;
  updateAvatarServer (valuelinkImage)
    .then (() => {
      profileImage.style = `background-image: url(${valuelinkImage})`;
    })
  closeModal(evt.target.closest('.popup'));
}
formUpdateAvatar.addEventListener('submit', handleFormEditProfileImageSubmit);

//Открытие и добавление новой карточки - начало
buttonAddNewCard.addEventListener('click', () => {
  namePlaceInput.value = '';
  linkInput.value = '';
  clearValidation (formNewPlace, validConfig);
  openModal(popupNewCard);
});
function handleFormNewPlaceSubmit(evt) {
  evt.preventDefault();
  const valueNamePlace = namePlaceInput.value;
  const valueLink = linkInput.value;
  const userId = '407bfac64d311bed9bf8aad4';
  addNewPlaceServer (valueNamePlace, valueLink)
    .then ((newCard) => {
      placesList.prepend(createCard(newCard, userId, openPopupImg, likeCard));
    })
  evt.target.reset();
  closeModal(evt.target.closest('.popup'));
}
formNewPlace.addEventListener('submit', handleFormNewPlaceSubmit);

//Закрытие Popup по кнопке "X"- начало
function identifyPopupForClose (evt) {
  closeModal(evt.target.closest('.popup'));
}
bttnClosePopupEdit.addEventListener('click', identifyPopupForClose);
bttnClosePopupNewCard.addEventListener('click', identifyPopupForClose);
bttnClosePopupImage.addEventListener('click', identifyPopupForClose);
bttnClosePopupUpdateAvatar.addEventListener('click', identifyPopupForClose);
bttnClosePopupConfirm.addEventListener('click', identifyPopupForClose);

//Загрузка карточек и данных пользователя с сервера при открытии страницы - начало
Promise.all([getUser(), getInitialCards()])
  .then ((resultOfPromises) => {
    return resultOfPromises;
  })
  .then ((resultOfPromises) => {
    const user = resultOfPromises[0];
    profileImage.style = `background-image: url(${user.avatar})`;
    profileTitle.textContent = `${user.name}`;
    profileJob.textContent = `${user.about}`

    const cards = resultOfPromises[1];
    cards.forEach( card => {
      //console.log(card)
      const cardElement = createCard(card, user['_id'] ,openPopupImg, likeCard);
      
      placesList.append(cardElement)
      
    })
  })
  .catch ((err) => {
    console.log(err);
  })

//Подтверждение удаления карточки - начало
function handleFormConfirmSubmit(evt) {
    evt.preventDefault();
    const cardId = popupConfirm.dataset.cardId;
    const card = placesList.querySelector(`[id="${cardId}"]`);
      deleteCardServer (cardId)
        .then (() => {
          delCard(card);
          closeModal(popupConfirm);
        })
  }

formConfirm.addEventListener('submit', handleFormConfirmSubmit);
