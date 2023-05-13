import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { PopupWithForm } from "./PopupWithForm";

export function EditProfilePopup(props) {
  const { isOpen, onClose, onUpdateUser } = props;
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState(currentUser.name);
  const [description, setDescription] = React.useState(currentUser.description);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.description);
  }, [currentUser]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({ name, description }).then(onClose);
  }

  return (
    <PopupWithForm
      onClose={onClose}
      isOpen={isOpen}
      name="profile-edit"
      title="Редактировать профиль"
      onSubmit={handleSubmit}
    >
      <label className="popup__container-field">
        <input
          name="name"
          placeholder="Имя"
          required
          minLength="2"
          maxLength="40"
          className="popup__container-input popup__container-input_type-name"
          value={name}
          onChange={handleNameChange}
        />
        <span className="popup__container-input-error popup__container-input-name-error"></span>
      </label>
      <label className="popup__container-field">
        <input
          name="description"
          placeholder="О себе"
          required
          minLength="2"
          maxLength="200"
          className="popup__container-input popup__container-input_type-description"
          value={description}
          onChange={handleDescriptionChange}
        />
        <span className="popup__container-input-error popup__container-input-description-error"></span>
      </label>
    </PopupWithForm>
  );
}
