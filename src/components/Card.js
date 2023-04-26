export function Card(props) {
  const { card, onCardClick } = props;

  function handleClick() {
    onCardClick(card);
  }

  return (
    <div className="place-card" onClick={handleClick}>
      <img
        className="place-card__illustration"
        src={card.link}
        alt={`Иллюстрация '${card.name}'`}
      />
      <div className="place-card__description">
        <h2 className="place-card__description-title">{card.name}</h2>
        <div className="place-card__description-like">
          <button
            type="button"
            className="place-card__description-like-btn"
          ></button>
          <p className="place-card__description-like-count">
            {card.likes.length}
          </p>
        </div>
      </div>
      <button type="button" className="place-card__delete-btn"></button>
    </div>
  );
}
