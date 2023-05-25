import React from "react";
import PopupWithForm from "./PopupWithForm.js";

export default function AddPlacePopup({ isOpen, onClickClose, onAddPlace }) {
  const [placeName, setPlaceName] = React.useState("");
  const [placeLink, setPlaceLink] = React.useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({ name: placeName, link: placeLink });
  }

  React.useEffect(() => {
    setPlaceName("");
    setPlaceLink("");
  }, [isOpen]);

  return (
    <PopupWithForm
      name="place"
      title="Новое место"
      isOpen={isOpen}
      onClickClose={onClickClose}
      onSubmit={handleSubmit}
    >
      <input
        id="text-input"
        name="name"
        className="popup__input popup__input_type_name"
        placeholder="Название"
        type="text"
        minLength="2"
        maxLength="30"
        required
        value={placeName ?? ""}
        onChange={(e) => setPlaceName(e.target.value)}
      />
      <span className="text-input-error popup__item-error"></span>
      <input
        id="url-input-card"
        name="link"
        className="popup__input popup__input_type_description"
        placeholder="Ссылка на картинку"
        type="url"
        required
        value={placeLink ?? ""}
        onChange={(e) => setPlaceLink(e.target.value)}
      />
      <span className="url-input-card-error popup__item-error"></span>
    </PopupWithForm>
  );
}
