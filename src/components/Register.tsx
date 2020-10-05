import React from 'react';
import { NavLink } from 'react-router-dom';
import SubmitButton from './ui/SubmitButton';
import AuthForm from './AuthForm';
import { reducerForForm } from '../utils/formHelper';
import {FormInterface} from "../interfaces/FormInterface";
import {Action, ActionInterface} from "../interfaces/Action";
import {RegisterProps} from "../interfaces/props/RegisterProps";

/**
 * initial form value state
 * @type {{inputValidities: {emailValidity: boolean, passwordValidity: boolean}, inputErrors: {emailError: string, passwordError: string}, formValid: boolean, inputValues: {password: string, email: string}}}
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
 * reducer for register form
 * @param state {object} form state
 * @param action {string} form action
 * @return
 */
function reducerRegister(state:FormInterface, action:ActionInterface) {
  return reducerForForm(state, action, initialFormValueState);
}

/**
 * Register component
 * @param isSubmitting {boolean} checks if form is submitting
 * @param onRegister {function} handles form submit
 * @return {JSX.Element}
 * @constructor
 */
function Register({ isSubmitting, onRegister }:RegisterProps) {
  const [formState, dispatchForm] = React.useReducer(reducerRegister, initialFormValueState);
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    dispatchForm({
      type: Action.DISPATCH,
      field: e.target.name,
      value: e,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onRegister(formState.inputValues);
  };
  return (
    <AuthForm
      title="Регистрация"
      onChange={handleChange}
      onSubmit={handleSubmit}
      value={formState.inputValues}
      validity={formState.inputValidities}
      errors={formState.inputErrors}
    >
      <SubmitButton name="auth" renderSubmitAnimation={isSubmitting} buttonTitle="Зарегистрироваться" isDisabled={formState.formValidity} />
      <NavLink to="/sign-in" className="nav-link nav-link_type_form">Уже зарегистрированы? Войти</NavLink>
    </AuthForm>
  );
}

export default Register;
