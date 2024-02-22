const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-7',
  headers: {
    authorization: 'b27457ff-8e1d-494d-8bc0-af82cbd7f253',
    'Content-Type': 'application/json'
  }
}

//Promise запроса данных пользователя 
function getUser () {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`При запросе информации о пользователе с сервера, возникла ошибка: ${res.status}`);
    });
}

//Promise запроса карточек 
function getInitialCards () {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`При загрузке данных карточек с сервера, возникла ошибка: ${res.status}`);
    });
}

//Функция отправки запроса на обновление данных о пользователе на сервере
function editeProfileServer (nameUser, aboutUser) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: `${nameUser}`,
      about: `${aboutUser}`
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`При запросе на обновление данных о пользователе на сервере, возникла ошибка: ${res.status}`);
  });
}

//Функция отправки запроса на добавление новой карточки на сервер
function addNewPlaceServer (namePlace, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: `${namePlace}`,
      link: `${link}`
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`При запросе на добавление новой карточки на сервер, возникла ошибка: ${res.status}`);
  });
}

//Функция отправки запроса на удаление карточки на сервер
function deleteCardServer (card) {
  return fetch(`${config.baseUrl}/cards/${card['_id']}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`При запросе на удаление карточки на сервере, возникла ошибка: ${res.status}`);
  });
}

//Функция отправки запроса на добавление like на сервер
function addLikeServer (card) {
  return fetch(`${config.baseUrl}/cards/likes/${card['_id']}`, {
    method: 'PUT',
    headers: config.headers,
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`При запросе на добавление Like, возникла ошибка: № ${res.status}`);
  });
}

//Функция отправки запроса на удаление like на сервер
function deleteLikeServer (card) {
  return fetch(`${config.baseUrl}/cards/likes/${card['_id']}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`При запросе на удаление Like, возникла ошибка: № ${res.status}`);
  });
}

//Функция отправки запроса на смену аватара на сервер
function changeAvatarServer (valuelinkImage) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: `${valuelinkImage}`
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`При запросе на смену аватара на сервер, 
      возникла ошибка: № ${res.status}`);
  });
}

//Функция отправки запроса на проверку URL: URL на изображение, URL действительный
function validateLinkImage () {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'HEAD'
  })
  .then(res => {
    if (res.ok) {
      console.log(res);
    }
    return Promise.reject(`При запросе на проверку URL на изображение, 
    возникла ошибка: № ${res.status}`);
  });
}


export {
  getUser, 
  getInitialCards, 
  editeProfileServer, 
  addNewPlaceServer, 
  deleteCardServer, 
  addLikeServer, 
  deleteLikeServer,
  changeAvatarServer,
  validateLinkImage
}