/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import FormValidator from "../FormValidator/FormValidator";

function AddPlacePopup({
  isOpen,
  onAddPlace,
  downloadText,
  isButtonDisabled,
  setIsButtonDisabled
}) {
  const { setIsEventInput, setIsOpenForm, isValidForm, isValidInput, isErrorMessage } = FormValidator();

  const { cardTitleErrorMessage = '', cardLinkErrorMessage = '' } = isErrorMessage;

  const { cardTitleValidInput = true, cardLinkValidInput = true } = isValidInput;

  const [name, setName] = useState("");

  const [link, setLink] = useState("");

  function handleNameChange(event) {
    setIsEventInput(event);
    setName(event.target.value);
  };

  function handleLinkChange(event) {
    setIsEventInput(event);
    setLink(event.target.value);
  };

  useEffect(() => {
    setIsOpenForm(isOpen)
    setName("");
    setLink("");
  }, [isOpen]);

  function handleSubmit(event) {
    event.preventDefault();
    setIsButtonDisabled(true);
    onAddPlace(name, link);
  }

  return (
    <PopupWithForm
      name="card-add"
      title="Новое место"
      buttonText={downloadText ? "Добавляем карточку..." : "Добавить"}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      isButtonDisabled={isButtonDisabled}
      isValidForm={isValidForm}
    >
      <input
        id='cardTitle-input'
        className={`popup__input popup__input_card-title ${!cardTitleValidInput ? "popup__input_type_error" : ''}`}
        required
        placeholder="Название"
        spellCheck="true"
        type="text"
        name="cardTitle"
        minLength="2"
        maxLength="30"
        value={name}
        onChange={handleNameChange}
      />
      <span className={`cardTitle-input-error popup__input-error ${!cardTitleValidInput ? "popup__input-error_active" : ''}`}>{cardTitleErrorMessage}</span>
      <input
        id="cardLink-input"
        className={`popup__input popup__input_card-link ${!cardLinkValidInput ? "popup__input_type_error" : ''}`}
        required
        placeholder="Ссылка на картинку"
        spellCheck="true"
        type="url"
        name="cardLink"
        value={link}
        onChange={handleLinkChange}
      />
      <span className={`cardLink-input-error popup__input-error ${!cardLinkValidInput ? "popup__input-error_active" : ''}`}>{cardLinkErrorMessage}</span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;