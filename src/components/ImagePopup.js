export function ImagePopup(props) {
  const { card, onClose } = props;

  return (
    <div
      className={`popup popup_type-preview ${card && "popup_opened"}`}
      tabIndex="0"
    >
      <div className="popup__container">
        <button
          type="button"
          className="popup__container-close-btn"
          onClick={onClose}
        ></button>
        <div className="popup__container-preview">
          <img
            className="popup__container-preview-illustration"
            alt={card?.name}
            src={card?.link}
          />
          <p className="popup__container-preview-name">{card?.name}</p>
        </div>
      </div>
    </div>
  );
}
