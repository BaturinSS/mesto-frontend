import React, { useState } from "react";
import { Link, Route, withRouter } from 'react-router-dom';
import FormValidator from "../FormValidator/FormValidator";
import './Authorization.css';

function Authorization({
  title,
  name,
  buttonText,
  isButtonDisabled,
  setIsButtonDisabled,
  onSubmit,
  isEmail,
  setIsEmail,
  isValidFormRegister
}) {
  const { setIsEventInput, isValidForm, isValidInput, isErrorMessage } = FormValidator();

  const { emailErrorMessage = '', passwordErrorMessage = '' } = isErrorMessage;

  const { emailValidInput = true, passwordValidInput = true } = isValidInput;

  const [isPassword, setIsPassword] = useState({});

  function handleEmailChange(event) {
    setIsEmail(event.target.value.trim());
    setIsEventInput(event);
  }

  function handlePasswordChange(event) {
    setIsPassword(event.target.value);
    setIsEventInput(event);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setIsButtonDisabled(true);
    onSubmit(isPassword, isEmail)
  }

  return (
    <div className={`authorization authorization_type_${name} ${isValidFormRegister && "onValidator"}`}>
      <h1 className="authorization__title">{title}</h1>
      <form
        className={`authorization__form authorization__form_type_${name}`}
        name={`${name}Form`}
        noValidate
        onSubmit={handleSubmit}
      >
        <input
          id={`${name}Email-input`}
          className={`authorization__input authorization__input_${name}-email ${!emailValidInput ? "authorization__input_type_error" : ''}`}
          required
          placeholder="Email"
          spellCheck="true"
          type="Email"
          name='email'
          onChange={handleEmailChange}
          value={isEmail}
        />
        <span className={`authorization__input-error ${name}Email-input-error ${!emailValidInput ? "authorization__input-error_active" : ''}`}>{emailErrorMessage}</span>
        <input
          id={`${name}Password-input`}
          className={`authorization__input authorization__input_${name}-password ${!passwordValidInput ? "authorization__input_type_error" : ''}`}
          required
          placeholder="Пароль"
          spellCheck="true"
          type="password"
          name='password'
          minLength="6"
          maxLength="12"
          onChange={handlePasswordChange}
        />
        <span className={`authorization__input-error ${name}Password-input-error ${!passwordValidInput ? "authorization__input-error_active" : ''}`}>{passwordErrorMessage}</span>
        <button
          className={`authorization__save-button ${isButtonDisabled || isValidForm ? "authorization__save-button_active" : ''}`}
          type="submit"
          disabled={isButtonDisabled || !isValidForm ? true : false}
        >
          {buttonText}
        </button>
      </form>
      <Route exact path="/sign-up">
        <p className="authorization__comment">Уже зарегистрированы?
          <Link className="authorization__link-entry" to="/sign-in"> Войти</Link>
        </p>
      </Route>
    </div>
  )
}

export default withRouter(Authorization);