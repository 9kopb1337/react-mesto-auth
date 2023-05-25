import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const handleCardClick = () => onCardClick(card);
  const handleCardLike = () => onCardLike(card);
  const handleCardDelete = () => onCardDelete(card);

  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((card) => card._id === currentUser._id);
  const cardLikeButtonClassName = `element__like ${
    isLiked && "element__like_active"
  }`;

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="element">
        {isOwn && (
          <button
            className="button element__delete"
            onClick={handleCardDelete}
          ></button>
        )}
        <img
          className="element__picture"
          src={card.link}
          alt={card.name}
          onClick={handleCardClick}
        />
        <div className="element__text">
          <h2 className="element__title">{card.name}</h2>
          <div className="element__likes">
            <button
              className={cardLikeButtonClassName}
              type="button"
              onClick={handleCardLike}
            ></button>
            <p className="element__likes-number">{card.likes.length}</p>
          </div>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}
