import React, { useState, useEffect, useRef } from 'react';
import Lottie from 'lottie-react';
import animationData from './assets/reader.json';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loginAttempts, setLoginAttempts] = useState(0);
    const [loginErrorMessage, setLoginErrorMessage] = useState('');
    const navigate = useNavigate();
    const [lottieError, setLottieError] = useState(null);
    const lottieRef = useRef(null);

    useEffect(() => {
        console.log("animationData:", animationData);
        if (!animationData) {
            setLottieError("Lottie file not loaded");
        }
    }, [animationData]);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            return 'Email is required.';
        }
        if (!emailRegex.test(email)) {
            return 'Invalid email format.';
        }
        return '';
    };

    const validatePassword = (password) => {
        if (!password) {
            return 'Password is required.';
        }
        if (password.length < 8) {
            return 'Password must be at least 8 characters.';
        }
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/.test(password)) {
            return 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.';
        }
        return '';
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setEmailError(validateEmail(email));
        setPasswordError(validatePassword(password));

        if (emailError || passwordError) {
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/users/login', {
                email: email,
                password: password,
            });

            console.log("Full server response:", response.data); // Log the full response

            if (response.data && response.data.token && response.data.user) {
                localStorage.setItem('token', response.data.token);
                console.log("Token stored:", localStorage.getItem('token'));

                if (response.data.user.profileComplete === false) {
                    navigate('/additional-details');
                } else {
                    navigate('/home');
                }
            } else {
                setLoginErrorMessage("Login failed. Invalid response from server.");
                setLoginAttempts(loginAttempts + 1);
            }
        } catch (error) {
            console.error(error);
            setLoginErrorMessage("Login failed. Please check your credentials.");
            setLoginAttempts(loginAttempts + 1);
        }
    };

    return (
        <div className="login-page">
            <div className="lottie-container" style={{ width: '400px', height: '400px', backgroundColor: 'lightgray' }}>
                {lottieError ? (
                    <p className="error-message">{lottieError}</p>
                ) : (
                    <Lottie
                        animationData={animationData}
                        loop
                        autoplay
                        style={{ width: '100%', height: '100%' }}
                        lottieRef={lottieRef}
                    />
                )}
            </div>
            <div className="login-form-container">
                <form className="login-form" onSubmit={handleLogin}>
                    <h2>Login</h2>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setEmailError('');
                        }}
                        required
                        autoComplete="username"
                        className={emailError ? 'error' : ''}
                    />
                    {emailError && <p className="error-message">{emailError}</p>}
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setPasswordError('');
                        }}
                        required
                        autoComplete="current-password"
                        className={passwordError ? 'error' : ''}
                    />
                    {passwordError && <p className="error-message">{passwordError}</p>}

                    <button type="submit">Login</button>
                    {loginAttempts >= 2 && <p className="nuclear-warning">Nuclear warhead will fall upon you if you get it wrong again</p>}
                    {loginErrorMessage && <p className="error-message">{loginErrorMessage}</p>}
                </form>
            </div>
        </div>
    );
}

export default LoginPage;