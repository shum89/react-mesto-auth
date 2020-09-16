import React from "react";

/**
 * popup with form component
 * @property {Object} props
 * @property {string} name - name for a popup class type
 * @property {string} title - title for a popup
 * @property {function} onClose - handler for closing popup
 * @property {Boolean} isOpen - popup state
 */
function PopupWithForm({ children, name, title,
                           onClose, isOpen, onSubmit,

}){

    return (
        <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : null}`}>
            <div className="popup__container">
                <h2 className="popup__title">{title}</h2>
                <button className="popup__button-close" onClick={onClose} type="button"/>
                <form className="popup__form" name={name} onSubmit={onSubmit}>
                    {children}
                </form>
            </div>
            <div className="popup__overlay" onClick={onClose}/>
        </div>
    )
}

export default PopupWithForm