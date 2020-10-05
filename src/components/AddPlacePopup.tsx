import React from 'react';
import PopupWithForm from './PopupWithForm';
import { reducerForForm } from '../utils/formHelper';
import SubmitButton from './ui/SubmitButton';
import {FormInterface} from "../interfaces/FormInterface";
import {Action, ActionInterface} from "../interfaces/Action";
import {AddPlaceProps} from "../interfaces/props/AddPlaceProps";

/**
 * initial state of the form elements
 * @type {{inputValidities: {linkValidity: boolean, nameValidity: boolean},
 * inputErrors: {nameError: string, linkError: string},
 * formValid: boolean,
 * inputValues: {name: string, link: string}}}
 */
const initialFormValueState:FormInterface = {
  inputValues: {
    name: '',
    link: '',
  },
  inputValidities: {
    nameValidity: true,
    linkValidity: true,
  },
  inputErrors: {
    nameError: '',
    linkError: '',
  },
  formValidity: false,
};

const reducerForAddPlaceForm = (state:FormInterface, action:ActionInterface) => reducerForForm(state, action, initialFormValueState);

/**
 * modal window for adding place
 * @param onClose {function}  handles popup close
 * @param onAddPlace {function}  handles add place
 * @param isSubmitting {Function}  handles form submit
 * @returns {JSX.Element}
 * @constructor
 */
function AddPlacePopup({
  isOpen, onClose, onAddPlace, isSubmitting,
}:AddPlaceProps) {
  /**
     * reducer hook for form elemnts
     */
  const [formState, dispatchForm] = React.useReducer(reducerForAddPlaceForm, initialFormValueState);



  /**
     * destructured values for form elements
     */
  const { name = '', link = '' } = formState.inputValues;
  const buttonDisabled = formState.formValidity;
  const { nameValidity, linkValidity } = formState.inputValidities;
  const { nameError, linkError } = formState.inputErrors;

  /**
     * hadnler for form submit
     * @param e
     */
  const handleSubmit = (e:React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAddPlace({
      name,
      link,
    });
    dispatchForm({
      type: Action.RESET,
    });
  };

  /**
     * handler for change inputs
     */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    dispatchForm({
      type:Action.DISPATCH,
      field: e.target.name,
      value: e,
    });
  };

  /**
     * hook for form reset
     */
  React.useEffect(() => {
    dispatchForm({
      type:Action.RESET,
    });
  }, [isOpen]);

  return (
    <PopupWithForm
      name="add-card"
      title="Новое Место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <>
      <label className="popup__form-label">
        <input
          className={`popup__input ${nameValidity ? null : 'popup__input_type_error'}`}
          id="input-title"
          name="name"
          type="text"
          placeholder="Название"
          minLength={2}
          maxLength={30}
          required
          value={name as string}
          onChange={handleChange}
        />
        <span className="popup__input-error" id="input-title-error">{nameError}</span>
      </label>
      <label className="popup__form-label">
        <input
          className={`popup__input ${linkValidity ? null : 'popup__input_type_error'}`}
          id="input-subtitle"
          name="link"
          type="url"
          placeholder="Ссылка на картинку"
          required
          value={link as string}
          onChange={(e) => {
            handleChange(e)}}
        />
        <span
          className="popup__input-error"
          id="input-subtitle-error"
        >
          {linkError}
        </span>
      </label>
      <SubmitButton renderSubmitAnimation={isSubmitting} isDisabled={buttonDisabled} buttonTitle="Создать" />
    </>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
