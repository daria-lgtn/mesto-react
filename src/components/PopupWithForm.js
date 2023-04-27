export function PopupWithForm(props) {
  const { name, children, title, isOpen, onClose } = props;

  return (
    <div
      className={`popup popup_type-${name} ${isOpen ? "popup_opened": ''}`}
      tabIndex="0"
    >
      <div className="popup__container">
        <button
          type="button"
          className="popup__container-close-btn"
          onClick={onClose}
        ></button>
        <form
          noValidate
          name={`form-${name}`}
          className="popup__container-form"
        >
          <h2 className="popup__container-title">{title}</h2>
          {children}
          <button type="submit" className="popup__container-save-btn">
            Сохранить
          </button>
        </form>
      </div>
    </div>
  );
}
