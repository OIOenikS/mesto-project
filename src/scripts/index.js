import '../pages/index.css'; // импорт главного файла стилей
import {createCard, delCard, likeCard} from './card.js';
import {openModal, closeModal} from './modal.js';
import {enableValidation, clearValidation} from './validation.js';
import {getUser, getInitialCards, editeProfileServer, addNewPlaceServer, deleteCardServer,validateLinkImg} from './api.js';
import {handleSubmit} from './utils.js';
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
  formUpdateAvatar,
  linkImageInput,
  formNewPlace,
  namePlaceInput,
  linkInput,
  profileImage,
  profileTitle,
  profileJob,
  } from './constants.js'

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

function handleProfileFormSubmit(evt) {
  const valueName = nameInput.value;
  const valueJob = jobInput.value;
  // создаем функцию, которая возвращает промис, так как любой запрос возвращает его 
  function makeRequest() {
    // return позволяет потом дальше продолжать цепочку `then, catch, finally`
    return editeProfileServer (valueName, valueJob).then((userData) => {
      profileTitle.textContent = userData.name;
      profileJob.textContent = userData.about;
    });
  }
  // вызываем универсальную функцию, передавая в нее запрос, событие и текст изменения кнопки (если нужен другой, а не `"Сохранение..."`)
  handleSubmit(makeRequest, evt);
}
formEditProfile.addEventListener('submit', handleProfileFormSubmit);

//Обновление аватара - начало
profileImage.addEventListener('click', () => {
  linkImageInput.value = '';
  clearValidation (formUpdateAvatar, validConfig);
  openModal(popupUpdateAvatar);
});
function handleUpdateAvatarFormSubmit(evt) {
  const valuelinkImage = linkImageInput.value;
  function makeRequest () {
    return validateLinkImg (valuelinkImage).then ((newLinkImg) => {
      profileImage.style = `background-image: url(${newLinkImg.avatar})`;
    })
  }
  handleSubmit(makeRequest, evt)
}
formUpdateAvatar.addEventListener('submit', handleUpdateAvatarFormSubmit);

//Открытие и добавление новой карточки - начало
buttonAddNewCard.addEventListener('click', () => {
  namePlaceInput.value = '';
  linkInput.value = '';
  clearValidation (formNewPlace, validConfig);
  openModal(popupNewCard);
});
function handleNewPlaceFormSubmit(evt) {
  const valueNamePlace = namePlaceInput.value;
  const valueLink = linkInput.value;
  function makeRequest () {
    return addNewPlaceServer (valueNamePlace, valueLink).then((newCard) => {
      placesList.prepend(createCard(newCard, newCard.owner['_id'], openPopupImg, likeCard));  
    }) 
  }
  handleSubmit(makeRequest, evt)
}
formNewPlace.addEventListener('submit', handleNewPlaceFormSubmit);

//Подтверждение удаления карточки - начало
function handleConfirmFormSubmit(evt) {
  const loadingText = "Удаление..."
  const cardId = popupConfirm.dataset.cardId;
  const card = placesList.querySelector(`[id="${cardId}"]`);
  function makeRequest () {
    return deleteCardServer(cardId).then (() => {
      delCard(card);
    })
  }
  handleSubmit(makeRequest, evt, loadingText);
}
formConfirm.addEventListener('submit', handleConfirmFormSubmit);

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
      const cardElement = createCard(card, user['_id'] ,openPopupImg, likeCard);
      
      placesList.append(cardElement)
      
    })
  })
  .catch ((err) => {
    console.log(err);
  })