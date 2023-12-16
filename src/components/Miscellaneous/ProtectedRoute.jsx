import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import {useSelector} from "react-redux";

export const ProtectedRoute = ({ children }) => {

    const location = useLocation();
    const isAuthenticated =useSelector((state) => state.token.token)

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};
