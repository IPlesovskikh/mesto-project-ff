import {openCardImage} from '../components/index.js';
import * as api from './api.js'

// Темплейт карточки
const cardTemplate = document.querySelector("#card-template"); 

// Вывести карточки на страницу

export function createCard(card, userId) {
  
  const instance = cardTemplate.content.querySelector('.card').cloneNode(true);
  const image = instance.querySelector(".card__image");
  const title = instance.querySelector(".card__title");
  const deleteButton = instance.querySelector(".card__delete-button");
  const likeButton = instance.querySelector(".card__like-button");
  const likeNumber = instance.querySelector('.card__like-number');

  image.src = card.link;
  image.alt = card.name;
  title.textContent = card.name;
  likeNumber.textContent = card.likes?.length;
  const isLiked = card.likes?.some((like) => userId === like._id);

  if (isLiked) {
    likeButton.classList.add('card__like-button_is-active');
  }

  if (card.owner._id === userId) {
    deleteButton.addEventListener('click', () => {
      deleteCard(instance, card._id);
    });
  } else {
    deleteButton.remove();
  }
  likeButton.addEventListener('click', function () {
    likeCard(userId, card._id, likeNumber, likeButton, card.likes);
  });
  image.addEventListener('click', function () {
    openCardImage(card);
  });

  return instance;
}

// Обновление состояния кнопки 'Нравится' 

export function updateLikeStatus(userId, card, likeButton, likeNumber) {
  const isLiked = likeButton.classList.contains('card__like-button_is-active');
  if (isLiked) {
    likeButton.classList.remove('card__like-button_is-active');
    likeNumber.textContent = card.likes.length;
  } else {
    likeButton.classList.add('card__like-button_is-active');
    likeNumber.textContent = card.likes.length;
  }
}

// Выбрать карточку как понравишуюся

export function likeCard(userId, cardId, likeNumber, likeButton, likes) {
  const isLiked = likeButton.classList.contains('card__like-button_is-active');
  if (isLiked) {
    api.deleteLike(cardId)
    .then((card) => {
      updateLikeStatus(userId, card, likeButton, likeNumber);
    })
    .catch((error) => {
      console.log(error);
    }) 
  } else {
    api.setLike(cardId)
    .then((card) => {
      updateLikeStatus(userId, card, likeButton, likeNumber);
    })
    .catch((error) => {
      console.log(error);
    })
  }

}

// Удаление карточки

export function deleteCard(card, cardId) {
  api.deleteCard(cardId)
  .then(() => {
    card.remove()
  })
  .catch((error) => {
      console.log(`Ошибка: ${error.status}`);
  })
}