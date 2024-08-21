import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import './css/login.css';

const LoginForm: React.FC = () => {
    const [signIn, setSignIn] = useState<boolean>(true);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        mobileNo: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleTabChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSignIn(event.target.id === 'tab-1');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (signIn) {
                // Login request
                const response = await axios.post('http://localhost:8080/user/validateLogin', {
                    username: formData.username,
                    password: formData.password
                });
                console.log(response.data);
                alert("Login success!")
                navigate("/home");
            } else {
                // Sign up request
                const response = await axios.post('http://localhost:8080/user/save', {
                    username: formData.username,
                    email: formData.email,
                    mobileNo: formData.mobileNo,
                    password: formData.password
                });
                console.log(response.data);
                alert("Sign up successful");
                setSuccessMessage("Sign up successful!"); // Set success message
            }
            // Clear error message
            setErrorMessage('');
        } catch (error: any) {
            setErrorMessage(error.response.data);
            // Clear success message
            setSuccessMessage('');
        }
    };

    return (
        <div className="loginbg">
            <div className="login-wrap">
                <div className="login-html">
                    <form onSubmit={handleSubmit}>
                        {/* Radio buttons for switching between Sign In and Sign Up */}
                        <input
                            id="tab-1"
                            type="radio"
                            name="tab"
                            className="sign-in"
                            checked={signIn}
                            onChange={handleTabChange}
                        />
                        <label htmlFor="tab-1" className="tab">
                            Sign In
                        </label>
                        <input
                            id="tab-2"
                            type="radio"
                            name="tab"
                            className="sign-up"
                            checked={!signIn}
                            onChange={handleTabChange}
                        />
                        <label htmlFor="tab-2" className="tab">
                            Sign Up
                        </label>
                        {/* Form fields */}
                        <div className="login-form">
                            <div className={signIn ? 'sign-in-htm' : 'sign-up-htm'}>
                                <div className="group">
                                    <label htmlFor="username" className="label">
                                        Username
                                    </label>
                                    <input
                                        id="username"
                                        type="text"
                                        className="input"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="group">
                                    <label htmlFor="password" className="label">
                                        Password
                                    </label>
                                    <input
                                        id="password"
                                        type="password"
                                        className="input"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </div>
                                {/* Additional fields for sign up */}
                                {!signIn && (
                                    <>
                                        <div className="group">
                                            <label htmlFor="email" className="label">
                                                Email
                                            </label>
                                            <input
                                                id="email"
                                                type="email"
                                                className="input"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="group">
                                            <label htmlFor="mobileNo" className="label">
                                                Mobile Number
                                            </label>
                                            <input
                                                id="mobileNo"
                                                type="tel"
                                                className="input"
                                                name="mobileNo"
                                                value={formData.mobileNo}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </>
                                )}
                                {/* Submit button */}
                                <div className="group">
                                    <input type="submit" className="button" value={signIn ? 'Sign In' : 'Sign Up'} />
                                </div>
                                {/* Error message */}
                                {errorMessage && <p className="error-message">{errorMessage}</p>}
                                <div className="hr"></div>
                                <div className="foot-lnk">
                                    {/* Link to toggle between sign in and sign up */}
                                    {signIn ? (
                                        <label>Don't have an account? <a href="#tab-2">Sign Up</a></label>
                                    ) : (
                                        <label>Already have an account? <a href="#tab-1">Sign In</a></label>
                                    )}
                                </div>
                            </div>
                        </div>
                        {/* Error message */}
                        {errorMessage && <p className="error-message" style={{color: "red"}}>{errorMessage}</p>}
                        {/* Success message */}
                        {successMessage && <p className="success-message">{successMessage}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
