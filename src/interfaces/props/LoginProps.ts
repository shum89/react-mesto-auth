import {InputValuesInterface} from "../FormInterface";

export interface LoginProps {
    isSubmitting: boolean,
    onLogin({}:InputValuesInterface):void
}

