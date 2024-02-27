import {closeModal} from './modal.js';

//функция проверки ответа
export function checkResponse (res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

//универсальная функция запроса fetch с проверкой ответа 
export function request(url, option) {
  return fetch (url, option).then(checkResponse) 
}

//Функция установки/снятия состояния лайка 
export function changeLike(request) {
  request()
    .then ((updatedСard) => {
      likeCard(buttonlikeCard);
      likeCounter.textContent = updatedСard.likes.length;
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`)
    })
}

// можно сделать универсальную функцию управления текстом кнопки с 3 и 4 необязательными аргументами
export function renderLoading(isLoading, button, buttonText='Сохранить', loadingText='Сохранение...') {
  if (isLoading) {
    button.textContent = loadingText
  } else {
    button.textContent = buttonText
  }
}

// можно сделать универсальную функцию, которая принимает функцию запроса, объект события и текст во время загрузки
export function handleSubmit(request, evt, loadingText = "Сохранение...") {
  // всегда нужно предотвращать перезагрузку формы при сабмите
  evt.preventDefault();
   // универсально получаем кнопку сабмита из `evt`
  const submitButton = evt.submitter;
   // записываем начальный текст кнопки до вызова запроса
  const initialText = submitButton.textContent;
   // изменяем текст кнопки до вызова запроса
  renderLoading(true, submitButton, initialText, loadingText);
  request()
    .then(() => {
       // любую форму нужно очищать после успешного ответа от сервера
       // а также `reset` может запустить деактивацию кнопки сабмита (смотрите в `validate.js`)
      evt.target.reset();
      closeModal(evt.target.closest('.popup'));
    })
    .catch((err) => {
       // в каждом запросе нужно ловить ошибку
      console.error(`Ошибка: ${err}`);
    })
     // в каждом запросе в `finally` нужно возвращать обратно начальный текст кнопки
    .finally(() => {
      renderLoading(false, submitButton, initialText);
    });
}