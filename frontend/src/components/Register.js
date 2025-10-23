import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../services/api';
import { loginUser } from '../services/api';
import './Register.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await registerUser({ username, password, email });
            if (response.status === 201) {
                setSuccess('Account created successfully! Logging in...');
                const login_response = await loginUser({ username, password });
                if (login_response.status === 200) {
                    setTimeout(() => {
                        navigate('/home');
                        localStorage.setItem("access_token", login_response.data.access);
                        localStorage.setItem("refresh_token", login_response.data.refresh);
                    }, 2500);
                }
            }
        } catch (error) {
            setError(error.response?.data?.detail || 'Registration failed');
        }
    };

    useEffect(() => {
        if (error) {
          // Define the display time in milliseconds (e.g., 3000ms = 3 seconds)
          const DISPLAY_TIME = 3000;

          // Start the timer
          const timer = setTimeout(() => {
            setError(null);
          }, DISPLAY_TIME);

          // Clean-up function: This is crucial! It cancels the timer
          // if the component unmounts or if a new error is set before
          // the timer finishes.
          return () => clearTimeout(timer);
        }
    }, [error]);

    return (
        <div className="register-container">
            <form onSubmit={handleSubmit} className="register-form">
                <h2>Register</h2>
                {error && <p className="error-banner">{error}</p>}
                {success && <div className="success-banner">{success}</div>}
                <label>
                    Username:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <label>
                    Email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <button type="submit">Register</button>
                <p>Have an account? <Link to="/login">Login</Link></p>
            </form>
        </div>
    );
};

export default Register;