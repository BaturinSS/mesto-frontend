import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function ConfirmDeletePopup({
  isOpen,
  isConfirm,
  card,
  downloadText,
  setIsButtonDisabled,
  isButtonDisabled
}) {

  function handleSubmit(event) {
    event.preventDefault();
    setIsButtonDisabled(true);
    isConfirm(card);
  }
  return (
    <PopupWithForm
      name="delete-confirm"
      title="Вы уверены?"
      buttonText={downloadText ? "Удаляем карточку..." : "Да"}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      isButtonDisabled={isButtonDisabled}
      isValidForm={true}
    >
    </PopupWithForm>
  )
}

export default ConfirmDeletePopup;