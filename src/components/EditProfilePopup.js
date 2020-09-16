import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import React from "react";
import {reducerForForm} from "../utils/formHelper"
import SubmitButton from "./ui/SubmitButton";

/**
 * initial state of form elements
 * @type {{inputValidities: {nameValidity: boolean, aboutValidity: boolean}, inputErrors: {nameError: string, aboutError: string}, formValid: boolean, inputValues: {name: string, about: string}}}
 */
const initialFormValueState = {
    inputValues: {
        name: '',
        about:'',
    },
  inputValidities: {
       nameValidity: true,
       aboutValidity: true,
   },
    inputErrors: {
      nameError: '',
        aboutError: '',
    },
    formValid: false,
}

/**
 * reducer for a form
 * @param state
 * @param action
 * @returns {function} handler for reducer
 */
function reducerForEditProfileForms(state, action) {
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
function EditProfilePopup({isOpen, onClose, onUpdateUser, isSubmitting}) {
    /**
     * current user context
     * @type {object}
     */
    const currentUserValue = React.useContext(CurrentUserContext);

    /**
     * reducer hook for form elements
     */
    const [formState, dispatchForm] = React.useReducer(reducerForEditProfileForms, initialFormValueState);

    /**
     * destructured values for form elements
     */
    const {nameValidity, aboutValidity} = formState.inputValidities;
    const {nameError, aboutError} = formState.inputErrors;
    const {name, about} = formState.inputValues;
    const buttonState = formState.formValid;

    /**
     * submit handler
     * @param e
     */
    const handleSubmit = e => {
        e.preventDefault();
            onUpdateUser({
            name,
            about: about,
        });
            e.target.reset();
    };

    /**
     * change input handler
     * @param e
     */
    const handleChange = e => {
        /**
         * dispatching form with a certain action type
         */
        dispatchForm({
            type: 'DISPATCH',
            field: e.target.name,
            value: e.target,
            currentUser: currentUserValue,
        })
    };
    /**
     * hook for setting initial values
     */
    React.useEffect(() => {
        /**
         * reseting form with a certain action type
         */
        dispatchForm({
            type:'RESET',
            currentUser: currentUserValue,
        })
    }, [isOpen,currentUserValue]);


    return (
        <PopupWithForm name={'edit-profile'} title={'Редактировать Профиль'}
                       isOpen={isOpen}
                       onClose={onClose}
                       onSubmit={handleSubmit}

        >
            <label className="popup__form-label">
                <input className={`popup__input ${nameValidity ? null : 'popup__input_type_error'}`}
                       id="title"
                       name="name"
                       type="text"
                       placeholder="ФИО"
                       minLength="2"
                       maxLength="20"
                       pattern="[a-zA-ZА-ЯЁа-яё\s\-]+"
                       required
                       value={name}
                       onChange={(e) => {
                           handleChange(e)
                       }}
                       />
                <span className={`popup__input-error`}  id="input-title-error">{nameError}</span>
            </label>
            <label className="popup__form-label">
                <input className={`popup__input ${aboutValidity ? null : 'popup__input_type_error'}`}
                       id="subtitle"
                       name="about"
                       type="text"
                       placeholder="Профессия"
                       minLength="2"
                       maxLength="200"
                       pattern="^[^\s\-].+[^\s']$"
                       value={about}
                       onChange={ (e) => {
                           handleChange(e)
                       }}
                        required/>
                <span className="popup__input-error" id="input-subtitle-error">{aboutError}</span>
            </label>
            <SubmitButton renderSubmitAnimation={isSubmitting} isDisabled={buttonState} buttonTitle={'Сохранить'} />
        </PopupWithForm>
    );
}

export default EditProfilePopup;