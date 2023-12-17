// Функция открытия модального окна

export function openModal(modal) {
  modal.classList.add('popup_is-animated');
  modal.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeModalByButtonEscape);
}

// Функции закрытия модального окна

export function closeModal(modal) {
  modal.classList.add('popup_is-animated');
  modal.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeModalByButtonEscape);
}

// Функция закрытия модального окна по нажатию на клавишу "Esc"

export function closeModalByButtonEscape(evt) {
  if (evt.key === 'Escape') {
      const popup = document.querySelector('.popup_is-opened');
      closeModal(popup);
  };
} 

// Функция закрытия модального окна по клику на оверлей

export function closeModalByClickOverlay(evt) {
  if (evt.target.classList.contains('popup_is-opened')) {
      const popup = evt.target.closest('.popup_is-opened');
      closeModal(popup);
  };
}