import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export function Card(props) {
  const { card, onCardClick, onCardLike, onCardDelete } = props;
  const currentUser = React.useContext(CurrentUserContext);

  function handleClick() {
    onCardClick(card);
  }

  function handleLike() {
    onCardLike(card);
  }

  function handleDelete() {
    onCardDelete(card);
  }

  const isOwn = card.owner._id === currentUser.id;
  const isLiked = card.likes.some((i) => i._id === currentUser.id);

  return (
    <div className="place-card">
      <img
        onClick={handleClick}
        className="place-card__illustration"
        src={card.link}
        alt={`Иллюстрация '${card.name}'`}
      />
      <div className="place-card__description">
        <h2 className="place-card__description-title">{card.name}</h2>
        <div className="place-card__description-like">
          <button
            onClick={handleLike}
            type="button"
            className={`place-card__description-like-btn ${
              isLiked ? "place-card__description-like-btn_active" : ""
            }`}
          ></button>
          <p className="place-card__description-like-count">
            {card.likes.length}
          </p>
        </div>
      </div>
      {isOwn && (
        <button
          onClick={handleDelete}
          type="button"
          className="place-card__delete-btn"
        ></button>
      )}
    </div>
  );
}
