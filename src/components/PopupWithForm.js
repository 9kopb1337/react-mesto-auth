import React from "react";

export default function PopupWithForm({
  name,
  title,
  children,
  isOpen,
  onClickClose,
  onSubmit,
}) {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          className="popup__button popup__button_act_exit"
          type="button"
          onClick={onClickClose}
        />
        <form
          method="post"
          name={`form-${name}`}
          className={`form popup__form popup__form_${name}`}
          onSubmit={onSubmit}
        >
          <h2 className="popup__title">{title}</h2>
          {children}
          <button
            className="popup__button popup__button_act_submit"
            type="submit"
            value="save"
          >
            Сохранить
          </button>
        </form>
      </div>
    </div>
  );
}
