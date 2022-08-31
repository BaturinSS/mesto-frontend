/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import FormValidator from "../FormValidator/FormValidator";

function EditAvatarPopup({
  isOpen,
  onUpdateAvatar,
  downloadText,
  isButtonDisabled,
  setIsButtonDisabled
}) {
  const { setIsEventInput,
    setIsOpenForm, isValidForm,
    isValidInput, isErrorMessage
  } = FormValidator();

  const { avatarUrlErrorMessage = '' } = isErrorMessage;

  const { avatarUrlValidInput = true } = isValidInput;

  const avatarRef = useRef();

  useEffect(() => {
    setIsOpenForm(isOpen);
    avatarRef.current.value = "";
  }, [isOpen]);

  function handleSubmit(event) {
    event.preventDefault();
    setIsButtonDisabled(true);
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  function handleUrlChange(event) {
    setIsEventInput(event);
  }

  return (
    <PopupWithForm
      name="avatar-edit"
      title="Обновить аватар"
      buttonText={downloadText ? "Загружаем аватар..." : "Загрузить"}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      isButtonDisabled={isButtonDisabled}
      isValidForm={isValidForm}
    >
      <input
        id="avatarUrl-input"
        className={`popup__input popup__input_avatar-url ${!avatarUrlValidInput ? "popup__input_type_error" : ''}`}
        required
        placeholder="Ссылка на картинку"
        spellCheck="true"
        type="url"
        name="avatarUrl"
        ref={avatarRef}
        onChange={handleUrlChange}
      />
      <span className={`avatarUrl-input-error popup__input-error ${!avatarUrlValidInput ? "popup__input-error_active" : ''}`}>{avatarUrlErrorMessage}</span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;