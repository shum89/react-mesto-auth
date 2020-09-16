import React from 'react';
import AuthForm from "./AuthForm";
import SubmitButton from "./ui/SubmitButton";
import {NavLink} from "react-router-dom";
import {reducerForForm} from "../utils/formHelper"

/**
 * initial state of form elements
 * @type {{inputValidities: {nameValidity: boolean, aboutValidity: boolean}, inputErrors: {nameError: string, aboutError: string}, formValid: boolean, inputValues: {name: string, about: string}}}
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
 * reducer for login
 * @param state {object} state
 * @param action {string} action type
 * @return
 */
function reducerLogin(state, action) {
    return reducerForForm(state, action, initialFormValueState);
}

/**
 * Login form component
 * @param isSubmitting starts anitmation
 * @param onLogin
 * @return {JSX.Element}
 * @constructor
 */
function Login({isSubmitting, onLogin}) {
    const [formState, dispatchForm] = React.useReducer(reducerLogin, initialFormValueState);
    const handleChange = (e) => {
        dispatchForm({
            type: 'DISPATCH',
            field: e.target.name,
            value: e.target,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
       onLogin(formState.inputValues);
    }
    return (
        <AuthForm title={'Войти'} onChange={handleChange} onSubmit={handleSubmit} value={formState.inputValues} validity={formState.inputValidities} errors={formState.inputErrors} >
            <SubmitButton name='auth' renderSubmitAnimation={isSubmitting} buttonTitle={'Войти'} isDisabled={formState.formValid} />
            <NavLink to='/sign-up' className="nav-link nav-link_type_form">Ещё не зарегистрированы? Регистрация</NavLink>
        </AuthForm>
    );
}

export default Login;