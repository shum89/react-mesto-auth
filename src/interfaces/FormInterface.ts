export interface InputValuesInterface {
    [key:string]: string

}

export interface InputValidityInterface {
    [key:string]: boolean,
}

export interface InputErrorsInterface {
    [key:string]: string,
}

export interface FormInterface {
    inputValues: InputValuesInterface,
    inputValidities:InputValidityInterface,
    inputErrors:InputErrorsInterface,
    formValidity: boolean,
}


