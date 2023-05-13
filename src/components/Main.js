import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Card } from "./Card";

export function Main(props) {
  const {
    cards,
    onCardLike,
    onCardDelete,
    onEditProfile,
    onAddPlace,
    onEditAvatar,
    handleCardClick,
  } = props;

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="traveller">
        <div className="traveller-image" onClick={onEditAvatar}>
          <img
            className="traveller-image__illustration"
            src={currentUser.avatar}
            alt="Фотография путешественника"
          />
          <div className="traveller-image__edit"></div>
        </div>
        <div className="traveller__info">
          <div className="traveller__info-full-name">
            <h1 className="traveller__info-full-name-label">
              {currentUser.name}
            </h1>

            <button
              type="button"
              onClick={onEditProfile}
              className="traveller__info-full-name-edit-btn"
            ></button>
          </div>
          <p className="traveller__info-description">
            {currentUser.description}
          </p>
        </div>
        <button
          type="button"
          onClick={onAddPlace}
          className="traveller__add-image-btn"
        ></button>
      </section>

      <section className="places">
        {cards.map((card) => (
          <Card
            card={card}
            key={card._id}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
            onCardClick={handleCardClick}
          />
        ))}
      </section>
    </main>
  );
}
