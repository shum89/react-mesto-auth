/**
 * helper function for a reducer to validate and dispatch values
 * @param state  state
 * @param action
 * @param action.field field name
 * @param action.type action type
 * @param action.value field value
 * @param initialFormValueState initial values
 * @returns {object} changed state
 */
import {
  FormInterface,
  InputErrorsInterface,
  InputValidityInterface,
   InputValuesInterface
} from '../interfaces/FormInterface'
import {Action, ActionInterface} from "../interfaces/Action";



export const reducerForForm = (state:FormInterface, action:ActionInterface, initialFormValueState:FormInterface):FormInterface => {
  switch (action.type) {
    case Action.DISPATCH: {
      const updateValues:InputValuesInterface = {
        ...state.inputValues,
        [action.field as string]: action.value!.target.value,
      };
      const updatedValidities:InputValidityInterface = {
        ...state.inputValidities,
        [`${action.field}Validity`]: action.value!.target.validity.valid,
      };
      const updateErrors:InputErrorsInterface = {
        ...state.inputErrors,
        [`${action.field}Error`]: action.value!.target.validationMessage,
      };
      let formIsValid = true;
      if (updatedValidities) {
        for (const key in updatedValidities) {
          const keyValue = key.replace('Validity', '');
          formIsValid = (formIsValid && updatedValidities[key] && !!updateValues[keyValue]?.trim());
        }
      }
      const updatedFormValues:FormInterface = {
        inputValidities: updatedValidities,
        inputErrors: updateErrors,
        formValidity: formIsValid,
        inputValues: updateValues,
      };
      return updatedFormValues
    }
    case Action.RESET:
      return initialFormValueState;
  }
};
