export interface AddPlaceProps {
    isOpen: boolean,
    onClose(): void,
    onAddPlace({}:AddPlaceUpdate):void,
    isSubmitting: boolean,
}

export interface AddPlaceUpdate {
    name:string,
    link:string,
}