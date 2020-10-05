export interface UserLoginInterface {
    email: string,
    _id: string,
}

export interface CurrentUserInterface {
    name: string,
    about: string,
    avatar: string,
    _id: string,
    login:UserLoginInterface,
}

