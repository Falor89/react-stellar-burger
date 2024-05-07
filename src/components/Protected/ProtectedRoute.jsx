import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, useLocation } from "react-router-dom";
import { routes } from "../../utils/path";

const ProtectedRoute = ({ children, requires, ...rest }) => {
    const location = useLocation();

    if (!requires) {
        return (
            <Redirect to={{
                pathname: routes.login,
                state: { from: location }
            }} />
        )
    }

    return <Route {...rest}>{children}</Route>;
}

export default ProtectedRoute