  // Темплейт карточки
const cardTemplate = document.querySelector("#card-template"); 


// Вывести карточки на страницу

export function createCard(card, handleDeleteCard, handleLikeCard, handleOpenCardImage) {
  
  const instance = cardTemplate.content.querySelector('.card').cloneNode(true);

  const image = instance.querySelector(".card__image");
  const title = instance.querySelector(".card__title");
  const deleteButton = instance.querySelector(".card__delete-button");
  const likeButton = instance.querySelector(".card__like-button");

  image.src = card.link;
  image.alt = card.name;
  title.textContent = card.name;
  deleteButton.addEventListener('click', function () {
    handleDeleteCard(instance);
  });
  likeButton.addEventListener('click', function () {
    handleLikeCard(likeButton);
  });
  image.addEventListener('click', function () {
    handleOpenCardImage(card);
  });

  return instance;
}

// Функция удаления карточки

export function deleteCard(element) {
  element.remove();
}

// Функция добавления/удаления отметки 'Нравится карточка'
  
export function likeCard(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active'); 
};