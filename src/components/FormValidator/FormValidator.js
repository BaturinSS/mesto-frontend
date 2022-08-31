/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

function FormValidator() {
  const [isEventInput, setIsEventInput] = useState({})

  const [isValidForm, setIsValidForm] = useState(true)

  const [isValidInput, setIsValidInput] = useState(true)

  const [isOpenForm, setIsOpenForm] = useState(false)

  const [isErrorMessage, setIsErrorMessage] = useState({})

  useEffect(() => {
    const popupActive =
      document.querySelector('.onValidator');

    if (popupActive) {
      const formActivePopup =
        popupActive.querySelector('form');

      if (!formActivePopup) {
        return;
      } else {
        setIsValidForm(formActivePopup.checkValidity());
      }
    }

    return (() => {
      setIsEventInput({})
      setIsValidForm(false)
      setIsValidInput(true)
    });
  }, [isOpenForm]);

  useEffect(() => {
    if (Object.keys(isEventInput).length !== 0) {
      const { name } = isEventInput.target;
      setIsValidInput({
        ...isValidInput,
        [`${name}ValidInput`]: isEventInput.target.checkValidity()
      });

      setIsErrorMessage({
        ...isErrorMessage,
        [`${name}ErrorMessage`]: isEventInput.target.validationMessage
      });

      setIsValidForm(isEventInput.target.closest('form').checkValidity());
    }
  }, [isEventInput]);

  return {
    setIsEventInput,
    setIsOpenForm,
    isValidInput,
    isValidForm,
    isErrorMessage
  };
}

export default FormValidator;