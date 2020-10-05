import React from 'react';
import success from '../images/success.svg';
import fail from '../images/fail.svg';
import {InfoTooltipProps} from "../interfaces/props/InfoTooltipProps";

/**
 * Info tooltip popup that shows whether request to login or register was successful
 * @param name {string} popup name
 * @param message {string} success or fail message
 * @param onClose {function} closes popup
 * @param isOpen {function} opens popup
 * @return {JSX.Element}
 * @constructor
 */
function InfoTooltip({
  name, message, onClose, isOpen,
}:InfoTooltipProps) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : null}`}>
      <div className="popup__container">
        <button className="popup__button-close popup__button-close_type_tooltip" onClick={onClose} type="button" />
        <img className="popup__image-tooltip" alt="success or fail" src={message && message.includes('успешно') ? success : fail} />
        <h2 className="popup__tooltip-message">{message}</h2>
      </div>
      <div className="popup__overlay" onClick={onClose} />
    </div>
  );
}

export default InfoTooltip;
