import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { reducerForForm } from '../utils/formHelper';
import SubmitButton from './ui/SubmitButton';
import {FormInterface} from "../interfaces/FormInterface";
import {Action, ActionInterface} from "../interfaces/Action";
import {EditProfileProps} from "../interfaces/props/EditProfileProps";


const initialFormValueState:FormInterface = {
  inputValues: {
    name: '',
    about: '',
  },
  inputValidities: {
    nameValidity: true,
    aboutValidity: true,
  },
  inputErrors: {
    nameError: '',
    aboutError: '',
  },
  formValidity: false,
};

/**
 * reducer for a form
 * @param state
 * @param action
 * @returns {function} handler for reducer
 */
function reducerForEditProfileForms(state:FormInterface, action:ActionInterface) {
  /**
     * setting initial values from context
     */
  Object.assign(initialFormValueState.inputValues, action.currentUser);
  return reducerForForm(state, action, initialFormValueState);
}

/**
 * modal window for editing profile info
 * @param {object} props
 * @param {function} props.onClose handles popup close
 * @param {function} props.onUpdateUser handles user info update
 * @param {function} props.isSubmitting handles form submit
 * @returns {JSX.Element}
 * @constructor
 */
function EditProfilePopup({
  isOpen, onClose, onUpdateUser, isSubmitting,
}:EditProfileProps){
  /**
     * current user context
     * @type {object}
     */
  const currentUserValue = React.useContext(CurrentUserContext);

  /**
     * reducer hook for form elements
     */
  const [formState, dispatchForm] = React.useReducer<React.Reducer<FormInterface, ActionInterface>>(reducerForEditProfileForms, initialFormValueState );

  /**
     * destructured values for form elements
     */
  const { nameValidity, aboutValidity } = formState.inputValidities;
  const { nameError, aboutError } = formState.inputErrors;
  const { name = '', about = '' } = formState.inputValues;
  const buttonState = formState.formValidity;

  /**
     * submit handler
     * @param e
     */
  const handleSubmit = (e:React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    onUpdateUser({
      name,
      about,
    });
    dispatchForm({
      type: Action.RESET,
    });
  };

  /**
     * change input handler
     * @param e
     */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
    e.persist();
    /**
         * dispatching form with a certain action type
         */
    dispatchForm({
      type: Action.DISPATCH,
      field: e.target.name,
      value: e,
      currentUser: currentUserValue,
    });
  };
    /**
     * hook for setting initial values
     */
  React.useEffect(() => {
    /**
         * reseting form with a certain action type
         */
    dispatchForm({
      type: Action.RESET,
      currentUser: currentUserValue,
    });
  }, [isOpen, currentUserValue]);

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать Профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <>
      <label className="popup__form-label">
        <input
          className={`popup__input ${nameValidity ? null : 'popup__input_type_error'}`}
          id="title"
          name="name"
          type="text"
          placeholder="ФИО"
          minLength={2}
          maxLength={20}
          pattern="[a-zA-ZА-ЯЁа-яё\s\-]+"
          required
          value={name as string}
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <span className="popup__input-error" id="input-title-error">{nameError}</span>
      </label>
      <label className="popup__form-label">
        <input
          className={`popup__input ${aboutValidity ? null : 'popup__input_type_error'}`}
          id="subtitle"
          name="about"
          type="text"
          placeholder="Профессия"
          minLength={2}
          maxLength={200}
          pattern="^[^\s\-].+[^\s']$"
          value={about as string}
          onChange={(e) => {
            handleChange(e);
          }}
          required
        />
        <span className="popup__input-error" id="input-subtitle-error">{aboutError}</span>
      </label>
      <SubmitButton renderSubmitAnimation={isSubmitting} isDisabled={buttonState} buttonTitle="Сохранить" name="" />
      </>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
