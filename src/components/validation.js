// Отображение ошибки

function showInputError(formElement, inputElement, errorMessage, validationConfig) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
};

// Скрытие ошибки

function hideInputError(formElement, inputElement, validationConfig) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = '';
}; 

// Проверка валидности инпута

function isValid(formElement, inputElement, validationConfig) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
}; 

// Проверка валидности формы

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}; 

// Изменение состояния кнопки отправки формы

function toggleButtonState(inputList, buttonElement, validationConfig) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  }
}; 

// Добавление обработчика на каждый инпут

function setEventListeners(formElement, validationConfig) {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, validationConfig)
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, validationConfig)
      toggleButtonState(inputList, buttonElement, validationConfig)
    });
  });
}; 

// Сбросить состояние ошибки

export function clearValidation(form, validationConfig) {
  const inputList = Array.from(form.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = form.querySelector(validationConfig.submitButtonSelector);
  inputList.forEach((inputElement) => {
    hideInputError(form, inputElement, validationConfig)
  });
  toggleButtonState(inputList, buttonElement, validationConfig);
}

// Добавление валидации

export function enableValidation(validationConfig) {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, validationConfig);
  });
};