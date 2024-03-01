function openModal (popup) {
  popup.classList.add('popup_is-animated');
  setTimeout(()=>{
    popup.classList.add('popup_is-opened');
  }, 1);
  popup.addEventListener('click', closeOverlayPopup);
  document.addEventListener('keydown', closeEscPopup);
}

function closeEscPopup (evt) {
  if (evt.key === 'Escape') {
    const popupIsOpened = document.querySelector('.popup_is-opened');
    closeModal(popupIsOpened);
  }
}

function closeOverlayPopup (evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget);
  }
}

function resetForm (popup) {
  const formElement = popup.querySelector('.popup__form');
  formElement.reset();
}

function closeModal (popup) {
  popup.classList.remove('popup_is-opened');
  popup.removeEventListener('click', closeOverlayPopup);
  document.removeEventListener('keydown', closeEscPopup);
  resetForm (popup)
}

export {openModal, closeModal};

