/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { TranslationContext } from '../../contexts/CurrentUserContext';
import FormValidator from "../FormValidator/FormValidator";

function EditProfilePopup({
  isOpen,
  onClose,
  onUpdateUser,
  downloadText,
  isButtonDisabled,
  setIsButtonDisabled
}) {
  const {
    setIsEventInput,
    setIsOpenForm, isValidForm,
    isValidInput, isErrorMessage,
  } = FormValidator();

  const {
    nameErrorMessage = '',
    jobErrorMessage = '',
  } = isErrorMessage;

  const {
    nameValidInput = true,
    jobValidInput = true,
  } = isValidInput;

  const [name, setName] = useState({});

  const [description, setDescription] = useState({});

  function handleNameChange(event) {
    setIsEventInput(event);
    setName(event.target.value);
  }

  function handleJobChange(event) {
    setIsEventInput(event);
    setDescription(event.target.value);
  }

  const currentUser = useContext(TranslationContext);

  useEffect(() => {
    setIsOpenForm(isOpen);
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(event) {
    event.preventDefault();
    setIsButtonDisabled(true);
    onUpdateUser(name, description);
  }
  return (
    <>
      < PopupWithForm
        name="profile-edit"
        title="Редактировать профиль"
        buttonText={downloadText ? 'Сохраняем...' : 'Сохранить'}
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        isButtonDisabled={isButtonDisabled}
        isValidForm={isValidForm}
      >
        <input
          id="userName-input"
          className={`popup__input popup__input_user-name ${!nameValidInput ? "popup__input_type_error" : ''}`}
          required
          placeholder="Имя"
          spellCheck="true"
          type="text"
          name="name"
          minLength="4"
          maxLength="40"
          onChange={handleNameChange}
          value={name || ''}
        />
        <span className={`userName-input-error popup__input-error ${!nameValidInput ? "popup__input-error_active" : ''}`}>{nameErrorMessage}</span>
        <input
          id="userProfession-input"
          className={`popup__input popup__input_user-profession ${!jobValidInput ? "popup__input_type_error" : ''}`}
          required
          placeholder="О себе"
          spellCheck="true"
          type="text"
          name="job"
          minLength="4"
          maxLength="200"
          onChange={handleJobChange}
          value={description || ''}
        />
        <span className={`userProfession-input-error popup__input-error ${!jobValidInput ? "popup__input-error_active" : ''}`}>{jobErrorMessage}</span>
      </PopupWithForm>
    </>
  )
}

export default EditProfilePopup;