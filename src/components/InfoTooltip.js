export default function InfoTooltip({ message, onClickClose }) {
  function handleOverlayClose(e) {
    if (e.target === e.currentTarget) onClickClose(e);
  }

  return (
    <div className={`popup popup_type_reg` + (message ? "popup_opened" : "")} onClick={handleOverlayClose}>
      <div className="popup__photo">
        <button
          className="popup__button popup__button_act_exit"
          type="button"
          value="close"
          onClick={onClickClose}
        ></button>
        <h2 className="popup__photo-name">{message ? message.text : ""}</h2>
      </div>
    </div>
  );
}
