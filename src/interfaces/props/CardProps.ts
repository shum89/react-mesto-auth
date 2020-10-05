import {CardInterface} from "../CardInterface";

export interface CardProps {
    onCardClick(card:CardInterface):void,
    onCardLike(card:CardInterface):void,
    onCardDelete(card:CardInterface):void,
    card:CardInterface,
}