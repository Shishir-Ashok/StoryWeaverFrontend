import React, { useState } from 'react';
import { Link, Navigate } from "react-router-dom";
import './SignIn.css';

export default function SignIn() {
    // State for form inputs and errors
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [errors, setErrors] = useState({ email: '', password: '', credentials: '' });



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
            const response = await fetch("http://localhost:3000/signin", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({email: email, password: password}),
                credentials: "include",
            });
            
            if (response.ok) {
                setErrors({ email: '', password: '', credentials: '' });
                setRedirect(true);
            }
            else {
                const errorData = await response.json();
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    credentials: 'Invalid email or password',
                }));   
            }
        };
    };

    if (redirect) {
        return <Navigate to={"/home"} />;
    }

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