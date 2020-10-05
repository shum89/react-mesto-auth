import {CardInterface} from "../CardInterface";

export interface ConfirmDeleteProps {
    isOpen: boolean,
    onClose:() => void,
    onDeleteSubmit:({}:CardInterface) => void ,
    card: CardInterface | null,
    isSubmitting: boolean,
}