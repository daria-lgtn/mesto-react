import React from "react";
import { PopupWithForm } from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export function EditAvatarPopup(props) {
  const { isOpen, onClose, onUpdateAvatar } = props;
  const currentUser = React.useContext(CurrentUserContext);

  const ref = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: ref.current.value,
    }).then(onClose);
  }

  return (
    <PopupWithForm
      onClose={onClose}
      isOpen={isOpen}
      name="avatar-edit"
      title="Обновить аватар"
      onSubmit={handleSubmit}
    >
      <label>
        <input
          ref={ref}
          name="link"
          type="url"
          defaultValue={currentUser.avatar}
          required
          placeholder="Ссылка на картинку"
          className="popup__container-input popup__container-input_type-link"
        />
        <span className="popup__container-input-error popup__container-input-link-error"></span>
      </label>
    </PopupWithForm>
  );
}
