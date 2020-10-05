import {InputErrorsInterface, InputValidityInterface, InputValuesInterface} from "../FormInterface";
import React from "react";

export interface AuthFormProps {
    children: React.ReactNode,
    title: string,
    onChange(event: React.ChangeEvent<HTMLInputElement>): void,
    onSubmit(event: React.FormEvent<HTMLFormElement>):void,
    value:InputValuesInterface,
    validity: InputValidityInterface,
    errors: InputErrorsInterface,
}