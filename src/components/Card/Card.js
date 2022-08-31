import React, { useContext } from "react";
import './Card.css';
import imageBasket from '../../images/delete.svg';
import { TranslationContext } from '../../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(TranslationContext);
  const isOwn = card.owner === currentUser._id;

  const isLiked = card.likes.some(i => i === currentUser._id);

  const handleLikeClick = () => {
    onCardLike(card);
  }

  const handleDeleteClick = () => {
    onCardDelete(card);
  }

  const handleClick = () => {
    onCardClick(card);
  };

  return (
    <li className="elements__element">
      <button type="button"
        className="elements__delete"
        style={isOwn
          ? { visibility: "visible" }
          : { visibility: "hidden" }}
        onClick={handleDeleteClick}
      >
        <img className="elements__image-delete" src={imageBasket} alt="иконка" />
      </button>
      <figure className="elements__rectangle">
        <img className="elements__mask-group" src={card.link} alt={card.name} onClick={handleClick} />
        <figcaption>
          <h2 className="elements__title">{card.name}</h2>
        </figcaption>
      </figure>
      <div className="elements__group-likes">
        <button type="button" className={`elements__group ${isLiked ? 'elements__group_active' : ''}`} onClick={handleLikeClick}></button>
        <span className="elements__number-likes">{card.likes.length}</span>
      </div>
    </li >
  )
}

export default Card;