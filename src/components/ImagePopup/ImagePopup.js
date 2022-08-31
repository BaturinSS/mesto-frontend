import React, { useEffect, useState } from "react";
import './ImagePopup.css';
import cross from '../../images/image-cross.svg';

function ImagePopup({ card }) {
  const [name, setName] = useState('');

  const [link, setlink] = useState('');

  useEffect(() => {
    if (card) {
      setName(card.name);
      setlink(card.link);
    }
  }, [card]);

  return (
    <div className={`popup popup_type_image-zoom ${card && "popup_opened"}`} >
      <div className="popup__box">
        <button className="popup__close" type="button" >
          <img className="popup__image-cross" src={cross} alt="иконка" />
        </button>
        <img className="popup__image" src={link} alt={name} />
        <h2 className="popup__subtitle">{name}</h2>
      </div>
    </div>
  )
}

export default ImagePopup;