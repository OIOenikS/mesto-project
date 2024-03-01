import {request} from './utils.js';

const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-7',
  headers: {
    authorization: 'b27457ff-8e1d-494d-8bc0-af82cbd7f253',
    'Content-Type': 'application/json'
  }
}

//Promise запроса данных пользователя 
function getUser () {
  return request(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
}

//Promise запроса карточек 
function getInitialCards () {
  return request(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
}

//Функция отправки запроса на обновление данных о пользователе на сервере
function editeProfileServer (nameUser, aboutUser) {
  return request(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: `${nameUser}`,
      about: `${aboutUser}`
    })
  })
}

//Функция отправки запроса на добавление новой карточки на сервер
function addNewPlaceServer (namePlace, link) {
  return request(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: `${namePlace}`,
      link: `${link}`
    })
  })
}

//Функция отправки запроса на удаление карточки на сервер
function deleteCardServer (cardId) {
  return request(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
}

//Функция отправки запроса на добавление like на сервер
function addLikeServer (card) {
  return request(`${config.baseUrl}/cards/likes/${card['_id']}`, {
    method: 'PUT',
    headers: config.headers,
  })
}

//Функция отправки запроса на удаление like на сервер
function deleteLikeServer (card) {
  return request(`${config.baseUrl}/cards/likes/${card['_id']}`, {
    method: 'DELETE',
    headers: config.headers,
  })
}

//Функция отправки запроса на смену аватара на сервер
function updateAvatarServer (valuelinkImage) {
    return request(`${config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        avatar: `${valuelinkImage}`
      })
    })
}

//Функция, проверяющая, что ссылка на картинку
function validateLinkImg (valuelinkImage) {
  return fetch(`https://corsproxy.org/?${valuelinkImage}`, {
    method: 'HEAD'
  })
  .then ((res) => {
    if (res.ok) {
      return res.headers
    }
  return Promise.reject(`Запрос на изменение аватара не выполнен, ошибка: ${res.status}`);
  })
  .then ((headers) => {
    if (headers.get('Content-type').includes('image')) {
      return updateAvatarServer (valuelinkImage)
    }
  return Promise.reject(`Ссылка не на изображение, ошибка: ${res.status}`);
  })
}

export {
  getUser, 
  getInitialCards, 
  editeProfileServer, 
  addNewPlaceServer, 
  deleteCardServer, 
  addLikeServer, 
  deleteLikeServer,
  updateAvatarServer,
  validateLinkImg
}