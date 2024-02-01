
function closeEscPopup (evt) {
  if (evt.key === 'Escape') {
    closeModal(document.querySelector('.popup_is-opened'));
  }
}

function closeOverlayPopup (evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget);
  }
}

function openModal (popup) {
  popup.classList.add('popup_is-opened', 'popup_is-animated');
  popup.addEventListener('click', closeOverlayPopup);
  document.addEventListener('keydown', closeEscPopup);
}

function closeModal (popup) {
  popup.classList.remove('popup_is-opened');
  popup.removeEventListener('click', closeOverlayPopup);
  document.removeEventListener('keydown', closeEscPopup);
}

export {openModal, closeModal};