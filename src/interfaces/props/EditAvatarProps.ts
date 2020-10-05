export interface EditAvatarProps {
    isOpen: boolean,
    onClose(): void,
    onUpdateAvatar({}:EditAvatar):void,
    isSubmitting: boolean,
}

export interface EditAvatar {
    avatar:string | null,
}