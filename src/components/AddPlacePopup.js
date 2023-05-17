import React from "react";
import { PopupWithForm } from "./PopupWithForm";

export function AddPlacePopup(props) {
  const { isOpen, onClose, onPlaceAdd } = props;

  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleLinkChange = (e) => {
    setLink(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();

    onPlaceAdd({
      name,
      link,
    })
      .then(onClose)
      .catch((e) => console.log(e));
  }

  return (
    <PopupWithForm
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      name="card-edit"
      title="Новое место"
    >
      <label className="popup__container-field">
        <input
          name="name"
          required
          minLength="2"
          maxLength="30"
          placeholder="Название"
          onChange={handleNameChange}
          value={name}
          className="popup__container-input popup__container-input_type-name"
        />
        <span className="popup__container-input-error popup__container-input-name-error"></span>
      </label>
      <label>
        <input
          name="link"
          type="url"
          required
          onChange={handleLinkChange}
          value={link}
          placeholder="Ссылка на картинку"
          className="popup__container-input popup__container-input_type-link"
        />
        <span className="popup__container-input-error popup__container-input-link-error"></span>
      </label>
    </PopupWithForm>
  );
}
