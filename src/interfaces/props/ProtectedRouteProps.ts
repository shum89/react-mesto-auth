import React from "react";
import {MainProps} from "./MainProps";

export interface ProtectedRouteProps extends MainProps{
    component: React.ComponentType<any>,
    loggedIn: boolean,
    isLoading: boolean
    path:string,
}

