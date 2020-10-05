import React from 'react';
import {SubmitButtonProps} from "../../interfaces/props/SubmitButtonProps";

/**
 * button that submits form
 * @param renderSubmitAnimation {function}
 * @param isDisabled {boolean}
 * @param buttonTitle {string}
 * @param name {string}
 * @param onSubmit {function}
 * @return {JSX.Element}
 * @constructor
 */
function SubmitButton({
  renderSubmitAnimation, isDisabled, buttonTitle, name,
}:SubmitButtonProps) {
  return (
    <button
      className={`popup__button-submit popup__button-submit_type_${name}
                    ${renderSubmitAnimation ? 'popup__button-submit_loading' : null}
                    ${isDisabled ? null : 'popup__button-submit_disabled'}`}
      type="submit"
    >
      {buttonTitle}
    </button>
  );
}

export default SubmitButton;
