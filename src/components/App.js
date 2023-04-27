import React from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { ImagePopup } from "./ImagePopup";
import { Main } from "./Main";
import { PopupWithForm } from "./PopupWithForm";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }
  function closeAllPopups() {
    setSelectedCard(null);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
  }

  return (
    <>
      <div className="page">
        <Header />

        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          handleCardClick={setSelectedCard}
        />

        <Footer />

        <PopupWithForm
          onClose={closeAllPopups}
          isOpen={isEditProfilePopupOpen}
          name="profile-edit"
          title="Редактировать профиль"
        >
          <label className="popup__container-field">
            <input
              name="name"
              placeholder="Имя"
              required
              minLength="2"
              maxLength="40"
              className="popup__container-input popup__container-input_type-name"
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
            />
            <span className="popup__container-input-error popup__container-input-description-error"></span>
          </label>
        </PopupWithForm>

        <PopupWithForm
          onClose={closeAllPopups}
          isOpen={isAddPlacePopupOpen}
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
              className="popup__container-input popup__container-input_type-name"
            />
            <span className="popup__container-input-error popup__container-input-name-error"></span>
          </label>
          <label>
            <input
              name="link"
              type="url"
              required
              placeholder="Ссылка на картинку"
              className="popup__container-input popup__container-input_type-link"
            />
            <span className="popup__container-input-error popup__container-input-link-error"></span>
          </label>
        </PopupWithForm>

        <PopupWithForm
          onClose={closeAllPopups}
          isOpen={isEditAvatarPopupOpen}
          name="avatar-edit"
          title="Обновить аватар"
        >
          <label>
            <input
              name="link"
              type="url"
              required
              placeholder="Ссылка на картинку"
              className="popup__container-input popup__container-input_type-link"
            />
            <span className="popup__container-input-error popup__container-input-link-error"></span>
          </label>
        </PopupWithForm>

        <PopupWithForm name="card-confirm" title="Вы уверены?">
          <input
            name="id"
            required
            type="hidden"
            className="popup__container-input popup__container-input_type-id"
          />
        </PopupWithForm>

        <ImagePopup onClose={closeAllPopups} card={selectedCard} />
      </div>
    </>
  );
}

export default App;
