import {CardInterface} from "../CardInterface";

export interface ImagePopupProps {
    card:CardInterface|null,
    onClose():void,
}