import { Outlet, Navigate } from 'react-router-dom';

export default function ProtectedRoutes(auth) {
    
    // console.log("PROTECTED_ROUTES isAuthenticated = ", auth);
    if (auth === null) {
        return <div className="">protectedroutes.jsx</div>;
    }

    return auth ? <Outlet /> : <Navigate to="/" />;
}