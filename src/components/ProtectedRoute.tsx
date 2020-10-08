import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {ProtectedRouteProps} from "../interfaces/props/ProtectedRouteProps";
import Spinner from "./Spinner";

/**
 * HOC for route if user is not logged in
 * @param component {JSX.Element}
 * @param props
 * @return {JSX.Element}
 * @constructor
 */
const ProtectedRoute = ({ component: Component, ...props }:ProtectedRouteProps) => (
  <Route>
    {
      () => (props.loggedIn ? (props.isLoading ? <Spinner /> : <Component {...props} />) : <Redirect to="./sign-in" />)
            }
  </Route>
);

export default ProtectedRoute;