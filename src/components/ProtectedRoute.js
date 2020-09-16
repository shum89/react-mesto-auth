import React from 'react';
import { Route, Redirect } from "react-router-dom";

/**
 * HOC for route if user is not logged in
 * @param Component
 * @param props
 * @return {JSX.Element}
 * @constructor
 */
const ProtectedRoute = ({ component: Component, ...props}) => {
    return (
        <Route>
            {
                () => props.loggedIn ? <Component {...props} /> : <Redirect to="./sign-in" />
            }
        </Route>
    )}

export default ProtectedRoute;