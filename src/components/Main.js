import React from "react";
import traveller from "../images/traveller.jpg";
import { api } from "../utils/Api";
import { Card } from "./Card";

export function Main(props) {
  const { onEditProfile, onAddPlace, onEditAvatar, handleCardClick } = props;

  const [userInfo, setUserInfo] = React.useState({
    name: "",
    description: "",
    avatar: "",
    id: "",
  });

  React.useEffect(() => {
    api.me().then((me) => {
      setUserInfo({
        name: me.name,
        description: me.about,
        avatar: me.avatar,
        id: me._id,
      });
    }).catch((e) => console.log(e));
  }, []);

  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getAllCards().then((cards) => {
      setCards(cards);
    }).catch((e) => console.log(e));
  }, []);

  return (
    <main>
      <section className="traveller">
        <div className="traveller-image" onClick={onEditAvatar}>
          <img
            className="traveller-image__illustration"
            src={userInfo.avatar}
            alt="Фотография путешественника"
          />
          <div className="traveller-image__edit"></div>
        </div>
        <div className="traveller__info">
          <div className="traveller__info-full-name">
            <h1 className="traveller__info-full-name-label">{userInfo.name}</h1>

            <button
              type="button"
              onClick={onEditProfile}
              className="traveller__info-full-name-edit-btn"
            ></button>
          </div>
          <p className="traveller__info-description">{userInfo.description}</p>
        </div>
        <button
          type="button"
          onClick={onAddPlace}
          className="traveller__add-image-btn"
        ></button>
      </section>

      <section className="places">
        {cards.map((card) => (
          <Card card={card} key={card._id} onCardClick={handleCardClick} />
        ))}
      </section>
    </main>
  );
}
