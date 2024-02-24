const showInputError = (formElement, inputElement, errorConfig, errorMessage) => {
  const {inputErrorClass, errorClass} = errorConfig;
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = (formElement, errorConfig, inputElement) => {
  const {inputErrorClass, errorClass} = errorConfig;
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

const checkInputValidityPattern = (inputElement) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
      inputElement.setCustomValidity('');
  }
}

const checkInputValidity = (formElement, inputElement, errorConfig) => {
  checkInputValidityPattern(inputElement);

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, errorConfig, inputElement.validationMessage);
  } else {
    hideInputError(formElement, errorConfig, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !(inputElement.validity.valid);
  });
}

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
  }
}

const setEventListeners = (formElement, formConfig) => {
  const {inputSelector, submitButtonSelector, inactiveButtonClass, ...errorConfig} = formConfig;
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement, inactiveButtonClass);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, errorConfig);

      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};

export const enableValidation = (validationConfig) => {
  const {formSelector, ...formConfig} = validationConfig;
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, formConfig);
  });
};

export function clearValidation (formElement, validationConfig) {
  const {submitButtonSelector, inputSelector, inactiveButtonClass, ...errorConfig} = validationConfig;
  const buttonElement = formElement.querySelector(submitButtonSelector);
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  inputList.forEach((inputElement) => {
    hideInputError(formElement, errorConfig, inputElement)
    inputElement.setCustomValidity('');
  });
  toggleButtonState(inputList, buttonElement, inactiveButtonClass);
}

