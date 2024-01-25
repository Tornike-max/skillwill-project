import React from 'react';
import { useAuth } from '../context/useAuth';
import { Navigate, Outlet } from 'react-router-dom';

console.log(React)

const ProtectedRoute = () => {
    const { authTokens } = useAuth();
    const isAuthenticated = authTokens !== null;

    return isAuthenticated ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;
