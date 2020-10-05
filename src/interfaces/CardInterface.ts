import {CurrentUserInterface} from "./CurrentUserInterface";

export interface CardInterface {
    name: string,
    link: string,
    likes: [any],
    owner:CurrentUserInterface,
    _id:string,
}