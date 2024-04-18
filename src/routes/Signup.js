import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import axios from "axios";
import { useNavigate } from 'react-router-dom';


function Signup() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [emailValid, setEmailValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);

    const navigate = useNavigate();

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validatePassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(password);
    };

    const handleEmailChange = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        setEmailValid(validateEmail(newEmail));
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        setPasswordValid(validatePassword(newPassword));
    };

    /**
     * When clicking the submit button at the end of the sign up form, a HTTP request with a email, username, and password is being sent to the backend for registration.
     *
     * On success: Logs a success message in the console.
     * On failure: Logs a failure message in the console.
     *
     * @function
     * @async
     */

    async function handleSignUp() {
        const url = "http://localhost:8080/api/v1/users/register";

        try {
            const response = await axios.post(
                url,
                {
                    email: email,
                    username: username,
                    password: password,
                    roles: "user",
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log("New User Sign Up Success", response.data.data);
            navigate('/login');
        } catch (error) {
            console.error("Error signing up", error);
        }
    }


    return (
        <div className='signup-container'>
            <div className='signup-card'>
                <h1>Sign Up</h1>
                <form>
                    <div className='form-group'>
                        <label htmlFor='email'>Email:</label>
                        <div className='input-with-icon'>
                            <input type='email' id='email' name='email' value={email} onChange={handleEmailChange} required />
                            {emailValid && <FaIcons.FaCheck className='check-icon' />}
                        </div>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='username'>Username:</label>
                        <input type='text' id='username' name='username' value={username} onChange={handleUsernameChange} required />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password'>Password:</label>
                        <div className='input-with-icon'>
                            <input type='password' id='password' name='password' value={password} onChange={handlePasswordChange} required />
                            {passwordValid && <FaIcons.FaCheck className='check-icon' />}
                        </div>
                    </div>
                    <button type='submit' onClick={(e) => {
                        e.preventDefault();
                        handleSignUp();
                    }}>
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Signup;
