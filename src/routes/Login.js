import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = "http://localhost:8080/api/v1/users/login";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        // Retrieve theme preference from local storage
        const themePreference = localStorage.getItem("theme");
        // Apply theme preference if available
        if (themePreference === "dark") {
            // Apply dark mode styles
        } else {
            // Apply light mode styles
        }
    }, []); // Empty dependency array ensures this effect runs only once when the component mounts

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
        } catch (error) {
            console.error("Error logging in", error);
            // Check if the error indicates that the user does not exist or if login failed due to incorrect credentials
            if (error.response && error.response.status === 401) {
                // Navigate the user to the signup page
                navigate("/signup");
            } else {
                // Handle other errors more gracefully, e.g., display error message
            }
        }
    }

    const handleAuthentication = (token) => {
        localStorage.setItem("headhunter-token", token);
        navigate("/account");
        window.location.reload(); // Reloads the page since I haven't figured out how to re-render the sidebar in real time yet!!! TODO
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
