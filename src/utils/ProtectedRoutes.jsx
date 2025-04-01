import { Outlet, Navigate } from 'react-router-dom';
import AuthContext from './AuthContext';
import { useContext } from 'react';

export default function ProtectedRoutes(auth) {
    
    const { isAuthenticated, loading } = useContext(AuthContext);
    // console.log("PROTECTED_ROUTES isAuthenticated = ", isAuthenticated);
    if (loading) {
        return <div className="">protectedroutes.jsx</div>;
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}