import React, { useState, useContext } from 'react';
import AuthContext from '../../utils/AuthContext';
import { Link, Navigate } from "react-router-dom";
import './SignIn.css';

export default function SignIn() {
    // State for form inputs and errors
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ email: '', password: '', credentials: '' });

    const { error, isAuthenticated, loading, signin } = useContext(AuthContext);

    // Validation functions
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        return !(password === '');
    };

    // Check fields and return error messages
    const validateField = (field, value) => {
        switch (field) {
            case 'email':
                if (value === '') {
                    return 'Email required';
                }
                else {
                    return validateEmail(value) ? '' : 'Invalid email address';
                }
            case 'password':
                return validatePassword(value) ? '' : 'Bold of you to sign in without a password';
            default:
                return '';
        }
    };

    // Handle form submission
    const handleSubmit = async(e) => {
        e.preventDefault();
        const emailError = validateField('email', email);
        const passwordError = validateField('password', password);

        setErrors({ email: emailError, password: passwordError });

        if (!emailError && !passwordError) {
            const response = signin(email, password);
            
            if (error === null) {
                setErrors({ email: '', password: '', credentials: '' });
            }
            else {
                setErrors({credentials : error});
            }
        };
    };

    if (loading && isAuthenticated) {
        return <Navigate to={"/home"} />;
    }

    return (
        <div className="container">
            <form className="form" onSubmit={handleSubmit}>
                <h2>Sign In</h2>
                <div className="line"></div>
                <div className="input-group">
                    <input
                        type="text" //changing it from email to text cause browser validates email before letting the form to be submitted
                        id="email"
                        placeholder="Email ID"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <p className="error">{errors.email}</p>}
                </div>
                <div className="input-group">
                    <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && <p className="error">{errors.password}</p>}
                    {errors.credentials && <p className="error">{errors.credentials}</p>}
                </div>

                <button type="submit">Sign In</button>
                <div className="switch-method">
                    <p>
                        Don't have an account? {" "}
                        <Link to="/signup" className="switch-method-link">Sign Up</Link>
                    </p>
                </div>
            </form>

        </div>
    );
};