import React from 'react';
import PopupWithForm from './PopupWithForm';
import SubmitButton from './ui/SubmitButton';
import {ConfirmDeleteProps} from "../interfaces/props/ConfirmDeleteProps";

/**
 * modal window for card delete
 * @param {object} props
 * @param {function} props.onClose handles popup close
 * @param {function} props.onDeleteSubmit handles delete
 * @param {boolean} props.isSubmitting checks if user submitting to set an animation
 * @param {object} props.card card element
 * @returns {JSX.Element}
 * @constructor
 */

function ConfirmDeletePopup({
  isOpen, onClose, onDeleteSubmit, card, isSubmitting,
}:ConfirmDeleteProps) {
  const handleDeleteSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (card) {
      onDeleteSubmit(card);
    }
  };

  return (
    <PopupWithForm
      name="popup-delete"
      title="Вы уверены?"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleDeleteSubmit}
    >
      <SubmitButton renderSubmitAnimation={isSubmitting} isDisabled buttonTitle="Да" />
    </PopupWithForm>
  );
}

export default ConfirmDeletePopup;
