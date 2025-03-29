import React, { useState } from 'react';
import { Link } from "react-router-dom";
import '../SignIn/SignIn.css'; //Using the same CSS file as SignIn for styling

export default function SignUp() {
    // State for form inputs and errors
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUserName] = useState('');
    const [errors, setErrors] = useState({ email: '', password: '', username: '' });

    // Validation functions
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        return !(password === '');
    };

    const validateUsername = (username) => {
        const usernameRegex = /^[a-zA-Z0-9_]+$/; // Alphanumeric and underscores only
        return usernameRegex.test(username);
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
            case 'username':
                if (value === '') {
                    return 'Username is required';
                }
                else if (value.length < 3 || value.length > 15) {
                    return 'Username must be between 3 and 15 characters long';
                }
                else {
                    return validateUsername(value) ? '' : 'Only letters, numbers, and underscores allowed';
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
        const usernameError = validateField('username', username);

        setErrors({ email: emailError, password: passwordError, username: usernameError });
    };

    return (
        <div className="container">
            <form className="form" onSubmit={handleSubmit}>
                <h2>Sign Up</h2>
                <div className="line"></div>
                <div className="input-group">
                    <input
                        type="text"
                        id="username"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    {errors.username && <p className="error">{errors.username}</p>}
                </div>
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
                <button type="submit">Sign Up</button>
                <div className="switch-method">
                    <p>
                        Already have an account? {" "}
                        <Link to="/signin" className="switch-method-link">Sign In</Link>
                    </p>
                </div>
            </form>

        </div>
    );
};