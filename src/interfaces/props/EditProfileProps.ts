export interface EditProfileProps {
    isOpen: boolean,
    onClose(): void,
    onUpdateUser({}:UserUpdate):void,
    isSubmitting: boolean,
}

export interface UserUpdate {
    name:String,
    about:String,
}