import React from 'react';
import { NavLink } from 'react-router-dom';
import AuthForm from './AuthForm';
import SubmitButton from './ui/SubmitButton';
import { reducerForForm } from '../utils/formHelper';
import {FormInterface} from "../interfaces/FormInterface";
import {Action, ActionInterface} from "../interfaces/Action";
import {LoginProps} from "../interfaces/props/LoginProps";

/**
 * initial state of form elements
 * @type {{inputValidities: {nameValidity: boolean, aboutValidity: boolean}, inputErrors: {nameError: string, aboutError: string}, formValid: boolean, inputValues: {name: string, about: string}}}
 */
const initialFormValueState:FormInterface = {
  inputValues: {
    email: '',
    password: '',
  },
  inputValidities: {
    emailValidity: true,
    passwordValidity: true,
  },
  inputErrors: {
    emailError: '',
    passwordError: '',
  },
  formValidity: false,
};

/**
 * reducer for login
 * @param state {object} state
 * @param action {string} action type
 * @return
 */
function reducerLogin(state:FormInterface, action:ActionInterface) {
  return reducerForForm(state, action, initialFormValueState);
}

/**
 * Login form component
 * @param isSubmitting starts anitmation
 * @param onLogin
 * @return {JSX.Element}
 * @constructor
 */
function Login({ isSubmitting, onLogin }:LoginProps) {
  const [formState, dispatchForm] = React.useReducer(reducerLogin, initialFormValueState);

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    dispatchForm({
      type: Action.DISPATCH,
      field: e.target.name,
      value: e,
    });
  };

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onLogin(formState.inputValues);
  };
  return (
    <AuthForm title="Войти" onChange={handleChange} onSubmit={handleSubmit} value={formState.inputValues} validity={formState.inputValidities} errors={formState.inputErrors}>
      <SubmitButton name="auth" renderSubmitAnimation={isSubmitting} buttonTitle="Войти" isDisabled={formState.formValidity} />
      <NavLink to="/sign-up" className="nav-link nav-link_type_form">Ещё не зарегистрированы? Регистрация</NavLink>
    </AuthForm>
  );
}

export default Login;
