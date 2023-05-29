import React, { useContext } from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

export default function Main({
  onEditProfile,
  onEditAvatar,
  onAddPlace,
  card,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__avatar" onClick={onEditAvatar}>
          <img
            className="profile__photo"
            src={currentUser.avatar}
            alt={currentUser.name}
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <p className="profile__description">{currentUser.about}</p>
          <button
            className="button profile__button profile__button_act_edit"
            type="button"
            onClick={onEditProfile}
          ></button>
        </div>
        <button
          className="button profile__button profile__button_act_add"
          type="button"
          onClick={onAddPlace}
        ></button>
      </section>

      <section className="elements">
        {card.map((card) => (
          <Card
            card={card}
            key={card._id}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}
