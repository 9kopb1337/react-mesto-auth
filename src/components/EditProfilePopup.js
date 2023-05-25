import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import PopupWithForm from "./PopupWithForm.js";

export default function EditProfilePopup({
  onUpdateUser,
  isOpen,
  onClickClose,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({ name, about: description });
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClickClose={onClickClose}
      onSubmit={handleSubmit}
    >
      <input
        id="name-input"
        name="name"
        className="popup__input popup__input_type_name"
        type="text"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        required
        onChange={(e) => setName(e.target.value)}
        value={name ?? ""}
      />
      <span className="name-input-error popup__item-error"></span>
      <input
        id="description-input"
        name="about"
        className="popup__input popup__input_type_description"
        placeholder="Описание"
        type="text"
        minLength="2"
        maxLength="40"
        required
        onChange={(e) => setDescription(e.target.value)}
        value={description ?? ""}
      />
      <span className="description-input-error popup__item-error"></span>
    </PopupWithForm>
  );
}
