import {InputValuesInterface} from "../FormInterface";

export interface RegisterProps {
    isSubmitting: boolean,
    onRegister({email,password}:InputValuesInterface):void
}