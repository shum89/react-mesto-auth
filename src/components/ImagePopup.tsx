import React from 'react';
import {ImagePopupProps} from "../interfaces/props/ImagePopupProps";

/**
 * popup with image component
 * @param {Object} props
 * @param {Object} props.card - card object
 * @param {function} props.onClose  - handler for closing popup
 * @return {JSX.Element}
 */
function ImagePopup({onClose, card}:ImagePopupProps) {
    const {link, name} = card ?? {link: '', name:''};
  return (
    <div className={`popup popup_type_image ${card ? 'popup_opened' : null}`}>
      <figure className="popup__image-container">
        <button className="popup__button-close" type="button" onClick={onClose} />
        <img className="popup__photo" src={link} alt={name} />
        <figcaption className="popup__caption">{name}</figcaption>
      </figure>
      <div className="popup__overlay popup__overlay_image" onClick={onClose} />
    </div>
  );
}

export default ImagePopup;
