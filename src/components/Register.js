import React from 'react';
import SubmitButton from "./ui/SubmitButton";
import {NavLink} from "react-router-dom";
import AuthForm from "./AuthForm";
import {reducerForForm} from "../utils/formHelper"

/**
 * initial form value state
 * @type {{inputValidities: {emailValidity: boolean, passwordValidity: boolean}, inputErrors: {emailError: string, passwordError: string}, formValid: boolean, inputValues: {password: string, email: string}}}
 */
const initialFormValueState = {
    inputValues: {
        email: '',
        password:'',
    },
    inputValidities: {
        emailValidity: true,
        passwordValidity: true,
    },
    inputErrors: {
        emailError: '',
        passwordError: '',
    },
    formValid: false,
}

/**
 * reducer for register form
 * @param state {object} form state
 * @param action {string} form action
 * @return
 */
function reducerRegister(state, action) {
    return reducerForForm(state, action, initialFormValueState);
}

/**
 * Register component
 * @param isSubmitting {boolean} checks if form is submitting
 * @param onRegister {function} handles form submit
 * @return {JSX.Element}
 * @constructor
 */
function Register({isSubmitting, onRegister}) {
    const [formState, dispatchForm] = React.useReducer(reducerRegister, initialFormValueState);
    const handleChange = (e) => {
        dispatchForm({
            type: 'DISPATCH',
            field: e.target.name,
            value: e.target,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onRegister(formState.inputValues)
    }
    return (
        <AuthForm title={'Регистрация'}
                  onChange={handleChange}
                  onSubmit={handleSubmit}
                  value={formState.inputValues}
                  validity={formState.inputValidities}
                  errors={formState.inputErrors}>
            <SubmitButton name='auth' renderSubmitAnimation={isSubmitting} buttonTitle={'Зарегистрироваться'} isDisabled={formState.formValid}/>
            <NavLink to='/sign-in' className="nav-link nav-link_type_form">Уже зарегистрированы? Войти</NavLink>
        </AuthForm>
    );
}

export default Register;