import React from "react";

export interface PopupWithFormProps {
    children:JSX.Element,
    name:string
    title:string,
    onClose():void,
    isOpen:boolean,
    onSubmit(e:React.ChangeEvent<HTMLFormElement>):void,
}