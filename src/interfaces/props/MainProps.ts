import {CardInterface} from "../CardInterface";

export interface MainProps {
    cards:Array<CardInterface>,
    cardClick(cards:CardInterface):void,
    onAddPlace():void,
    onEditProfile():void,
    onEditAvatar():void,
    onCardLike(cards:CardInterface):void,
    onDeletePopup(cards:CardInterface):void,
}