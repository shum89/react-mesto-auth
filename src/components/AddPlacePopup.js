import React from 'react';
import PopupWithForm from './PopupWithForm';
import {reducerForForm} from '../utils/formHelper'
import SubmitButton from "./ui/SubmitButton";

/**
 * initial state of the form elements
 * @type {{inputValidities: {linkValidity: boolean, nameValidity: boolean}, inputErrors: {nameError: string, linkError: string}, formValid: boolean, inputValues: {name: string, link: string}}}
 */
const initialFormValueState = {
    inputValues: {
        name:'',
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
    formValid: false,
}

const reducerForAddPlaceForm = (state, action) => {
        return reducerForForm(state, action, initialFormValueState);
}


/**
 * modal window for adding place
 * @param {object} props
 * @param {function} props.onClose handles popup close
 * @param {function} props.onAddPlace handles add place
 * @param {function} props.isSubmitting handles form submit
 * @returns {JSX.Element}
 * @constructor
 */
function AddPlacePopup({isOpen, onClose, onAddPlace, isSubmitting}) {
    /**
     * reducer hook for form elemnts
     */
    const [formState, dispatchForm] = React.useReducer(reducerForAddPlaceForm, initialFormValueState);

    /**
     * destructured values for form elements
     */
    const {name, link} = formState.inputValues;
    const buttonDisabled = formState.formValid;
    const {nameValidity, linkValidity} = formState.inputValidities;
    const {nameError, linkError} = formState.inputErrors;

    /**
     * hadnler for form submit
     * @param e
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        onAddPlace({
            name,
            link,
        })
        e.target.reset();
    }

    /**
     * handler for change inputs
     * @param e
     */
    const handleChange = (e) => {
        dispatchForm({
            type: 'DISPATCH',
            field: e.target.name,
            value: e.target,
        })
    }

    /**
     * hook for form reset
     */
    React.useEffect( () => {
        dispatchForm({
            type:'RESET',
        })
    },[isOpen])

    return (
        <PopupWithForm name={'add-card'}
                       title={'Новое Место'}
                       buttonTitle={'Создать'}
                       isOpen={isOpen}
                       onClose={onClose}
                       onSubmit={handleSubmit}
                       renderSubmitAnimation={isSubmitting}
                       isDisabled={buttonDisabled}
        >
            <label className="popup__form-label">
                <input className={`popup__input ${nameValidity ? null : 'popup__input_type_error'}`}
                       id="input-title"
                       name="name"
                       type="text"
                       placeholder="Название"
                       minLength="2"
                       maxLength="30"
                       required
                       value={name}
                       onChange={handleChange}
                />
                <span className="popup__input-error" id="input-title-error">{nameError}</span>
            </label>
            <label className="popup__form-label">
                <input className={`popup__input ${linkValidity ? null : 'popup__input_type_error'}`}
                       id="input-subtitle"
                       name="link"
                       type="url"
                       placeholder="Ссылка на картинку"
                       required
                       value={link}
                       onChange={handleChange}
                />
                <span className={`popup__input-error`}
                      id="input-subtitle-error">{linkError}</span>
            </label>
            <SubmitButton renderSubmitAnimation={isSubmitting} isDisabled={buttonDisabled} buttonTitle={'Создать'} />
        </PopupWithForm>
    );
}

export default AddPlacePopup;