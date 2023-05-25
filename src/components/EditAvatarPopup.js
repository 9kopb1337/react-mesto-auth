import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import PopupWithForm from "./PopupWithForm.js";

export default function EditAvatarPopup({
  onUpdateAvatar,
  isOpen,
  onClickClose,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  const userAvatar = React.useRef();

  React.useEffect(() => {
    userAvatar.current.value = "";
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({ avatar: userAvatar.current.value });
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClickClose={onClickClose}
      onSubmit={handleSubmit}
    >
      <input
        id="avatar-input"
        name="avatar"
        className="popup__input popup__input_type_description"
        placeholder="Ссылка на картинку"
        type="url"
        required
        ref={userAvatar}
      />
      <span className="avatar-input-error popup__item-error"></span>
    </PopupWithForm>
  );
}
