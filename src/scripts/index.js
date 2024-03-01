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
  closePopupButtons,
  popupEdit,
  popupNewCard,
  popupConfirm,
  formConfirm,
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
  } from './constants.js'

function handleDelete (evt) {
  const cardElement = evt.target.closest('.card');
  popupConfirm.dataset.cardId = cardElement.id;
  openModal (popupConfirm); 
}

//Обработчик открытия popup с img - начало
function openPopupImg (cardName, cardLink) {
  imgOfPopup.src = cardLink;
  imgOfPopup.alt = cardName;
  captionPopup.textContent = cardName;
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
  openModal(popupNewCard);
});
function handleNewPlaceFormSubmit(evt) {
  const valueNamePlace = namePlaceInput.value;
  const valueLink = linkInput.value;
  function makeRequest () {
    return addNewPlaceServer (valueNamePlace, valueLink).then((newCard) => {
      placesList.prepend(createCard({card:newCard, userId:newCard.owner['_id'], openPopupImg, likeCard, handleDelete}));
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

function closePopup (evt) {
  const popupElement = evt.target.closest('.popup');
  closeModal(popupElement);
}

closePopupButtons.forEach((closePopupButton) => {
  closePopupButton.addEventListener('click', closePopup);
});

//Загрузка карточек и данных пользователя с сервера при открытии страницы - начало
Promise.all([getUser(), getInitialCards()])
  .then (([user, cards]) => {
    profileImage.style = `background-image: url(${user.avatar})`;
    profileTitle.textContent = `${user.name}`;
    profileJob.textContent = `${user.about}`

    cards.forEach( card => {
      const cardElement = createCard({card, userId:user['_id'], openPopupImg, likeCard, handleDelete});
      
      placesList.append(cardElement)
      
    })
  })
  .catch(console.error)