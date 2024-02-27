import '../pages/index.css';
// import {initialCards} from './cards.js';
import {createCard, deleteCard, likeCard} from './card.js'
import {openModal, closeModal, closeModalByClickOverlay} from './modal.js'
import {enableValidation,clearValidation} from './validation.js'
import {getInfoUser, getCards, putInfoUser, addCardByServer, getNewAvatar} from './api.js';


// DOM узлы

const placesContainer = document.querySelector(".places__list");
const popups = document.querySelectorAll('.popup');

const popupImage = document.querySelector('.popup_type_image');
const closePopupImageButton = popupImage.querySelector('.popup__close');
const photoPopupImage = document.querySelector('.popup__image');

const popupProfile = document.querySelector('.popup_type_edit');
const closePopupProfileButton = popupProfile.querySelector('.popup__close');
const openProfileButton = document.querySelector('.profile__edit-button');
const submitButton = document.querySelector('.popup__button');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const formElementProfile = popupProfile.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const profileForm = document.forms['edit-profile'];

const popupNewCard = document.querySelector('.popup_type_new-card');
const closePopupNewCardButton = popupNewCard.querySelector('.popup__close');
const openPopupNewCardButton = document.querySelector('.profile__add-button');
const formElementNewCard = popupNewCard.querySelector('.popup__form');
const newCardNameInput = document.querySelector('.popup__input_type_card-name');
const newCardLinkInput = document.querySelector('.popup__input_type_url');
const cardsForm = document.forms['new-place'];
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
}
let userId;

// Добавляем валидацию на инпуты 

enableValidation(validationConfig);

// Открытие модальных окон

export function openCardImage(card) {
  photoPopupImage.src = card.link;
  photoPopupImage.alt = card.name;
  photoPopupImage.textContent = card.name;
  openModal(popupImage);
}

function openProfileModal() {
  clearValidation(cardsForm, validationConfig); 
  openModal(popupProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

openProfileButton.addEventListener('click', openProfileModal);

openPopupNewCardButton.addEventListener('click', function () {
  clearValidation(cardsForm, validationConfig); 
  openModal(popupNewCard);
});

// Закрытие модального окна

closePopupImageButton.addEventListener('click', () =>
  closeModal(popupImage)
);
closePopupProfileButton.addEventListener('click', () =>
  closeModal(popupProfile)
);
closePopupNewCardButton.addEventListener('click', () =>
 closeModal(popupNewCard));

popups.forEach((popup) => {
  popup.addEventListener('click', closeModalByClickOverlay);
});

// Изменение данных в профиле

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    
    submitButton.textContent = 'Сохранение...';

    const newName = nameInput.value;
    const newJob = jobInput.value;
    
    putInfoUser(newName, newJob)
    .then(() => {
      profileName.textContent = newName;
      profileJob.textContent = newJob;
      closeModal(popupProfile);
      clearValidation(profileForm, validationConfig);
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => {
      submitButton.textContent = 'Сохранить'
    })
}
formElementProfile.addEventListener('submit', handleProfileFormSubmit);

// Добавление новой карточки

function handleNewCardSubmit(evt) {
  evt.preventDefault();

  const cardName = newCardNameInput.value;
  const cardLink = newCardLinkInput.value;
  const newCard = {
    name: cardName,
    link: cardLink,
  };

  const newCardElement = createCard(newCard, deleteCard, likeCard, openCardImage);
  placesContainer.prepend(newCardElement);
  
  closeModal(popupNewCard);
  evt.target.reset();
  clearValidation(cardsForm, validationConfig);
}

formElementNewCard.addEventListener('submit', handleNewCardSubmit);

// Вывести карточки на страницу

function renderCards(cards) {
  cards.forEach(card => {
    const element = createCard(card, deleteCard, likeCard, openCardImage);
    placesContainer.appendChild(element);
  });
}

// Выводим информацию о юзере

function renderUserInfo(userInfo) {
  profileName.textContent = userInfo.name;
  profileJob.textContent = userInfo.about;
  avatarProfile.style.backgroundImage = `url(${userInfo.avatar})`;
}

// Получаем инфомрацию для профиля и карточек

Promise.all([getInfoUser(), getCards()])
.then(([userInfo, initialCards]) => {
    renderUserInfo(userInfo);
    userId = userInfo._id;
    renderCards(initialCards);
})
.catch((err) => {
    console.log(err);
})

