import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = "http://localhost:8080/api/v1/users/login";

function Login({ setIsAuthorized }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const basicAuth = btoa(`${email}:${password}`);

        try {
            const response = await axios.post(
                API_URL,
                { email, password },
                {
                    headers: {
                        Authorization: `Basic ${basicAuth}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            handleAuthentication(response.data.data.token);
            setIsAuthorized(true);
        } catch (error) {
            console.error("Error logging in", error);
            // Handle errors more gracefully, e.g., display error message
        }
    }

    const handleAuthentication = (token) => {
        localStorage.setItem("headhunter-token", token);
        navigate("/account");
    }

    return (
        <div className='login-container'>
            <div className='login-card'>
                <h1>Login</h1>
                <form onSubmit={handleLogin}>
                    <div className='form-group'>
                        <label htmlFor='email'>Email:</label>
                        <input type='email' id='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password'>Password:</label>
                        <input type='password' id='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type='submit'>Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
