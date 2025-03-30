import React, { useState } from 'react';
import { Link, Navigate } from "react-router-dom";
import '../SignIn/SignIn.css'; //Using the same CSS file as SignIn for styling

export default function SignUp() {
    // State for form inputs and errors
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUserName] = useState('');
    const [success, setSuccess] = useState(false);
    const [redirect, setRedirect] = useState(false);
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
                    return 'Email required';
                }
                else {
                    return validateEmail(value) ? '' : 'Invalid email address';
                }
            case 'password':
                if (value.length < 8 && value.length > 0) {
                    return 'Password must be at least 8 characters long';
                }
                else {
                    return validatePassword(value) ? '' : 'Password required';
                }
            case 'username':
                if (value === '') {
                    return 'Username required';
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
    const handleSubmit = async (e) => {
        e.preventDefault();
        const emailError = validateField('email', email);
        const passwordError = validateField('password', password);
        const usernameError = validateField('username', username);

        // setErrors({ email: emailError, password: passwordError, username: usernameError });
        setErrors((prevErrors) => {
            const newErrors = {
                email: emailError,
                password: passwordError,
                username: usernameError,
            };
            return newErrors;
        });
        if (!emailError && !passwordError && !usernameError) {
            const response = await fetch("http://localhost:3000/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    username: username.toLowerCase(),
                }),
            });
            const backendError = await response.json();
            if (response.ok) {
                setErrors({ email: '', password: '', username: '' });
                setSuccess(true);
                setTimeout(() => {
                    setRedirect(true);
                }, 2000);
            }
            else if (backendError.value === 'email') {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    email: backendError.message,
                }));
            }
            else if (backendError.value === 'username') {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    username: backendError.message,
                }));
            }
        };
    };

    if(redirect) {
        return (
            <Navigate to={"/signin"} />
        );
    }
    return (
        <div className="container">
            {!success ? (
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
                        {errors.credentials && <p className="error">{errors.credentials}</p>}
                    </div>
                    <button type="submit">Sign Up</button>
                    <div className="switch-method">
                        <p>
                            Already have an account? {" "}
                            <Link to="/signin" className="switch-method-link">Sign In</Link>
                        </p>
                    </div>
                </form>
            ) : (
                <div className="success-message">
                    <p>Sign-up successful! Redirecting to sign-in page...</p>
                    <div className="progress-line"></div>
                </div>
            )}
        </div>
    );
};