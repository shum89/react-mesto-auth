import React from "react";
import {CurrentUserInterface} from "./CurrentUserInterface";
export enum Action {
    DISPATCH,
    RESET
}

export interface ActionInterface {
    type: Action,
    value?: React.ChangeEvent<HTMLInputElement>,
    field?: string,
    currentUser?:CurrentUserInterface
}