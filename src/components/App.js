import React from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { ImagePopup } from "./ImagePopup";
import { Main } from "./Main";
import { PopupWithForm } from "./PopupWithForm";
import { api } from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { EditProfilePopup } from "./EditProfilePopup";
import { EditAvatarPopup } from "./EditAvatarPopup";
import { AddPlacePopup } from "./AddPlacePopup";

function App() {
  const [currentUser, setCurrentUser] = React.useState({
    name: "",
    description: "",
    avatar: "",
    id: "",
  });

  React.useEffect(() => {
    api
      .me()
      .then((me) => {
        setCurrentUser({
          name: me.name,
          description: me.about,
          avatar: me.avatar,
          id: me._id,
        });
      })
      .catch((e) => console.log(e));
  }, []);

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] =
    React.useState(false);
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

  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api
      .getAllCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch((e) => console.log(e));
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser.id);

    api.likeCard(card._id, isLiked).then((newCard) => {
      const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
      setCards(newCards);
    });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      const newCards = cards.filter((c) => c._id !== card._id);
      setCards(newCards);
    });
  }

  function handleUpdateUser({ name, description }) {
    return api
      .updateProfile({
        name,
        about: description,
      })
      .then(() => {
        setCurrentUser({
          ...currentUser,
          name,
          description,
        });
      })
      .catch((e) => console.log(e));
  }

  function handleUpdateAvatar({ avatar }) {
    return api
      .updateProfileAvatar({
        avatar,
      })
      .then(() => {
        setCurrentUser({
          ...currentUser,
          avatar,
        });
      })
      .catch((e) => console.log(e));
  }

  function handleAddNewPlace(data) {
    return api
      .submitCard(data)
      .then((newCard) => {
        setCards([...cards, newCard]);
      })
      .catch((e) => console.log(e));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />

        <Main
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          handleCardClick={setSelectedCard}
        />

        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onPlaceAdd={handleAddNewPlace}
        />

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
    </CurrentUserContext.Provider>
  );
}

export default App;
