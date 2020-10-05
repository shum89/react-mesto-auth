import React from "react";

export interface ProtectedRouteProps {
  component: React.ComponentType<any>,
    loggedIn: boolean,
    path:string,
}

