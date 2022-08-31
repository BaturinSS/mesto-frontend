import './PopupWithForm.css';

import React from "react";

import cross from '../../images/image-cross.svg';

function PopupWithForm({
  name,
  isOpen,
  title,
  buttonText,
  children,
  onSubmit,
  isButtonDisabled,
  isValidForm
}) {
  return (
    <div
      className={`popup popup_type_${name} ${isOpen && "popup_opened onValidator"}`}>
      <div className="popup__container">
        <button className="popup__close" type="button">
          <img className="popup__image-cross" src={cross} alt="иконка" />
        </button>
        <h3 className={`popup__title popup__title_${name}`}>{title}</h3>
        <form
          className={`popup__form popup__form_type_${name}`}
          name={`${name}`}
          onSubmit={onSubmit}
          noValidate
        >
          {children}
          <button
            className={`popup__save-button ${!isValidForm
              ? "popup__save-button_disabled"
              : ''}`
            }
            type="submit"
            disabled={isButtonDisabled || !isValidForm
              ? true
              : false}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;