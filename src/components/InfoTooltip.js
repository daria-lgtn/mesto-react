export function InfoTooltip(props) {
  const { onClose, response } = props;
  const success = response?.success;

  return (
    <div
      className={`popup popup_type-tooltip ${response ? "popup_opened" : ""}`}
      tabIndex="0"
    >
      <div className="popup__container">
        <button
          type="button"
          className="popup__container-close-btn"
          onClick={onClose}
        ></button>
        <div className="popup__container-tooltip">
          {success ? (
            <div className="popup__container-tooltip-img-success" />
          ) : (
            <div className="popup__container-tooltip-img-failure" />
          )}
          <p className="popup__container-tooltip-message">
            {success ? (
              "Вы успешно зарегистрировались!"
            ) : (
              <>
                Что-то пошло не так!
                <br />
                Попробуйте ещё раз.
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
