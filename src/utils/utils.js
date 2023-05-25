const formValidation = {
  formSelector: ".form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button_act_submit",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
  error: ".popup__item-error",
};


const apiRes = {
  url: "https://mesto.nomoreparties.co/v1/cohort-63",
  headers: {
    "Content-Type": "application/json",
    authorization: "d1d57a13-4584-442b-a02a-78fc4756e763",
  }
}

export { formValidation, apiRes };
