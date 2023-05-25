import React from "react";

export default function ImagePopup({ card, isOpen, onClickClose }) {
  return (
    <div
      className={`popup popup_open_photo popup_type_photo ${
        isOpen ? "popup_opened" : ""
      }`}
    >
      <div className="popup__photo">
        <button
          className="popup__button popup__button_act_exit"
          type="button"
          value="close"
          onClick={onClickClose}
        ></button>
        <img className="popup__photo-link" src={card.link} alt={card.name} />
        <h2 className="popup__photo-name">{card.name}</h2>
      </div>
    </div>
  );
}
