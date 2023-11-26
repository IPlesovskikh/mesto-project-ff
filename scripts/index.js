// Темплейт карточки

const cardTemplate = document.querySelector("#card-template");

// DOM узлы

const placesContainer = document.querySelector(".places__list");

// Функция создания карточки

function createCard(card, handleDeleteCard) {
  const element = cardTemplate.content.querySelector('.card').cloneNode(true);
  const image = element.querySelector(".card__image");
  const title = element.querySelector(".card__title");
  const deleteButton = element.querySelector(".card__delete-button");

  image.src = card.link;
  image.alt = card.name;
  title.textContent = card.name;
  deleteButton.addEventListener('click', function () {
    handleDeleteCard(element);
  });

  return element;
}

// Функция удаления карточки

function deleteCard(element) {
  element.remove();
}

// Вывести карточки на страницу

function renderCards(cards) {
  cards.forEach(card => {
    const element = createCard(card, deleteCard);
    placesContainer.appendChild(element);
  });
}

renderCards(initialCards);