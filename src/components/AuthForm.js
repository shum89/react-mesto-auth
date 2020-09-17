import React from 'react';

/**
 * Auth form
 * @param children {JSX.Element}
 * @param title {string}
 * @param onChange {function} handles input changes
 * @param onSubmit {function} handles form submit
 * @param value {string} input values
 * @param validity {boolean} input validity
 * @param errors {object} input errors
 * @return {JSX.Element}
 * @constructor
 */
function AuthForm({
  children, title, onChange, onSubmit, value, validity, errors,
}) {
  return (
    <div className="popup__container popup__container_type_auth">
      <h2 className="popup__title popup__title_type_auth">{title}</h2>
      <form className="popup__form popup__form_type_auth" onSubmit={onSubmit}>
        <label className="popup__form-label popup__form-label_type_auth">
          <input
            className={`popup__input popup__input_type_auth ${validity.emailValidity ? null : 'popup__input_type_error'}`}
            id="title"
            name="email"
            type="email"
            placeholder="Email"
            minLength="2"
            maxLength="20"
            pattern="^[^@]+@[^@]+\.[^@]+$"
            required
            value={value.email}
            onChange={onChange}
          />
          <span className="popup__input-error" id="input-title-error">{errors.emailError}</span>
        </label>
        <label className="popup__form-label popup__form-label_type_auth">
          <input
            className={`popup__input popup__input_type_auth ${validity.passwordValidity ? null : 'popup__input_type_error'}`}
            id="subtitle"
            name="password"
            type="password"
            placeholder="Password"
            minLength="2"
            maxLength="200"
            value={value.password}
            onChange={onChange}
            required
          />
          <span className="popup__input-error" id="input-subtitle-error">{errors.passwordError}</span>
        </label>
        {children}
      </form>
    </div>
  );
}

export default AuthForm;
