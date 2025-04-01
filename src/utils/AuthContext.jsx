import { createContext, useState, useEffect } from 'react';

const AuthContext = createContext({});
export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const signin = async (email, password) => {
        try {
            const response = await fetch("http://localhost:3000/signin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: email, password: password }),
                credentials: "include",
            });
            console.log("RESPONSE: ",response);
            if (response.ok) {
                setError(null);
                setIsAuthenticated(true);
            }
            else {
                setError('Invalid email or password');
            }
        } catch (err) {
            setError(err);
        }
    };

    const logout = async () => {
        try {
            await fetch('http://localhost:3000/logout', {
                method: 'POST',
                credentials: 'include',
            });
            setIsAuthenticated(false);
        } catch (err) {
            setError(err);
        }
    };

    // Check auth status on mount
    useEffect(() => {
        fetch('http://localhost:3000/profile', {
            method: 'GET',
            credentials: 'include',
        })
            .then((response) => response.json())
            .then((userInfo) => {
                setIsAuthenticated(!!userInfo.id);
                setLoading(false);
            })
            .catch((err) => {
                setError(err);
                setLoading(false);
            });
        //   console.log("Auth Context - isAuthenticated within useEffect => ", isAuthenticated);
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, signin, logout, loading, error }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;