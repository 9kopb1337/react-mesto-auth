import React from "react";
import success from "../images/icons/icon_reg_success.svg";
import fail from "../images/icons/icon_reg_fail.svg";

export default function InfoTooltip(props) {
  return (
    <div
      className={`popup popup_type_edit  popup_type_reg ${
        props.isOpen ? "popup_opened" : ""
      }`}
      onClick={props.handleOverlayClose}
    >
      <div className="popup__container">
        <button
          className="popup__button popup__button_act_exit"
          type="button"
          value="close"
          onClick={props.onClickClose}
        ></button>
        <img
          className="popup__icon"
          src={props.succes ? success : fail}
          alt={props.succes ? "Успех" : "Провал"}
        ></img>
        <h2 className="popup__message">
          {props.succes
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте еще раз!"}
        </h2>
      </div>
    </div>
  );
}
