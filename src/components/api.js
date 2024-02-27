const сonfig = {
  url: 'https://nomoreparties.co/v1/cohort-magistr-2',
  headers: {
    'authorization': '199b89ad-23e2-4e8c-a2dc-e57a9ecec189',
    'Content-Type': 'application/json'
  }
}

// Проверяем ответ на запрос в API
const checkApi = (res) => {
  if (res.ok) {
    return res.json()
  } 
  return Promise.reject(`Ошибка: ${res.status}`);
}

// Получаем информацию о пользователе
export const getInfoUser = () => {
  return fetch(`${сonfig.url}/users/me`, {
    method: 'GET',
    headers: сonfig.headers
  })
  .then(checkApi)
}

// Получаем карточки
export const getCards = () => {
  return fetch(`${сonfig.url}/cards`, {
    method: 'GET',
    headers: config.headers
  })
  .then(res => checkApi(res))
}

// Сохраняем информацию о пользователе
export const putInfoUser = (newName, newJob) => {
  return fetch(`${сonfig.url}/users/me`, {
    method: 'PATCH',
    headers: сonfig.headers,
    body: JSON.stringify({
      name: newName,
      about: newJob
    })
  })
  .then(res => checkApi(res))
}

// Сохраняем новую карточку
export const addCardByServer = (cardData) => {
  return fetch(`${сonfig.url}/cards`, {
    method: 'POST',
    headers: сonfig.headers,
    body: JSON.stringify(cardData)
  })
  .then(res => checkApi(res))
}

// Удаляем карточку
export const deleteCardByServer = (cardId) => {
  return fetch(`${сonfig.url}/cards/${cardId}`, {
    method: 'DELETE',
    headers: сonfig.headers
  })
  .then(res => checkApi(res))
}

// Ставим лайк
export const getLikeByServer = (cardId) => {
  return fetch(`${сonfig.url}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: сonfig.headers
  })
  .then(res => checkApi(res))
}

// Удаляем лайк
export const deteleLikeByServer = (cardId) => {
  return fetch(`${сonfig.url}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: сonfig.headers
  })
  .then(res => checkApi(res))
}

// Обновляем аватар
export const getNewAvatar = (avatarData) => {
  return fetch(`${сonfig.url}/users/me/avatar`, {
    method: 'PATCH',
    headers: сonfig.headers,
    body: JSON.stringify(avatarData)
  })
  .then(res => checkApi(res))
}