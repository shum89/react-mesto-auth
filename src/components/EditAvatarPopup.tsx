import React from 'react';
import PopupWithForm from './PopupWithForm';
import SubmitButton from './ui/SubmitButton';
import {EditAvatarProps} from "../interfaces/props/EditAvatarProps";

/**
 * @param {object} props
 * @param {boolean} props.isOpen
 * @param {function} props.onClose close popup
 * @param {function} props.onUpdateAvatar handles avatar update
 * @param {boolean} props.isSubmitting checks if user submitting a form to trigger animation
 * @returns {JSX.Element}
 */
function EditAvatarPopup({
  isOpen, onClose, onUpdateAvatar, isSubmitting,
}:EditAvatarProps) {
  /**
     * ref for avatar input
     */
  const avatarInput = React.useRef<HTMLInputElement>(null!);
  /**
     * avatar input form state
     */
  const [avatarValidity, setAvatarValidity] = React.useState(true);
  const [isDisabled, setDisable] = React.useState(false);
  const [avatarErrorMessage, setAvatarErrorMessage] = React.useState('');

  /**
     * submit handler
     * @param e
     */
  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarInput.current.value,
    });
    e.currentTarget.reset();
  };

  /**
     * change handler
     */
  const handleChange = () => {
    const { validity, validationMessage } = avatarInput.current;
    setAvatarValidity(validity.valid);
    setAvatarErrorMessage(validationMessage);
    setDisable(validity.valid);
  };

  /**
     * reseting form on close
     */
  React.useEffect(() => {
    setAvatarValidity(true);
    setDisable(false);
    setAvatarErrorMessage('');
    avatarInput.current.value = '';
  }, [isOpen]);

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить Аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        handleSubmit(e);
      }}
    >
      <>
      <label className="popup__form-label">
        <input
          ref={avatarInput}
          className={
                           `popup__input ${avatarValidity ? null : 'popup__input_type_error'}`
                       }
          id="input-title"
          name="avatar"
          type="url"
          placeholder="Ссылка на картинку"
          required
          onChange={handleChange}
        />
        <span className="popup__input-error" id="input-title-error">{avatarErrorMessage}</span>
      </label>
      <SubmitButton renderSubmitAnimation={isSubmitting} isDisabled={isDisabled} buttonTitle="Cохранить" />
        </>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
