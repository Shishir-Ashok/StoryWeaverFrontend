import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './SignIn.css';

export default function SignIn() {
    // State for form inputs and errors
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ email: '', password: '' });

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
                    return 'Email is required';
                }
                else {
                    return validateEmail(value) ? '' : 'Invalid email address';
                }
            case 'password':
                if (value.length < 8 && value.length > 0) {
                    return 'Password must be at least 8 characters long';
                }
                else {
                    return validatePassword(value) ? '' : 'Bold of you to sign in without a password';
                }
            default:
                return '';
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const emailError = validateField('email', email);
        const passwordError = validateField('password', password);

        setErrors({ email: emailError, password: passwordError });
    };

    return (
        <div className="container">
            <form className="form" onSubmit={handleSubmit}>
                <h2>Sign In</h2>
                <div className="line"></div>
                <div className="input-group">
                    <input
                        type="email"
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