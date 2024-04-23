import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { extractEmailFromToken, extractUsernameFromToken } from '../functions/extractFromToken'; // Import the utility functions

function Account({ isAuthorized }) {
    const [newEmail, setNewEmail] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        // Prefill the form fields with the user's email and username when the component mounts
        setNewEmail(extractEmailFromToken());
        setNewUsername(extractUsernameFromToken());
    }, []); // Empty dependency array to ensure this effect runs only once

    const handleChangeEmail = (e) => {
        setNewEmail(e.target.value);
    };

    const handleChangeUsername = (e) => {
        setNewUsername(e.target.value);
    };

    const handleChangePassword = (e) => {
        setNewPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Construct the request body dynamically
            const requestBody = {};

            // Add the email to the request body
            if (newEmail.trim() !== '') {
                requestBody.email = newEmail; // Use the new email if it's not empty
            } else {
                requestBody.email = extractEmailFromToken(); // Use the email from the token if the field is empty
            }

            // Add username to the request body if it's not empty
            if (newUsername.trim() !== '') {
                requestBody.username = newUsername;
            }

            // Add password to the request body if it's not empty
            if (newPassword.trim() !== '') {
                requestBody.password = newPassword;
            }
            console.log(requestBody);
            // Make the HTTP request with the constructed request body
            const response = await axios.put(
                `http://localhost:8080/api/v1/users/update/${extractEmailFromToken()}`,
                requestBody,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("headhunter-token")}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            setSuccessMessage("User information updated successfully.");
            setErrorMessage('');
        } catch (error) {
            setErrorMessage("Failed to update user information. Please try again.");
            setSuccessMessage('');
            console.error("Error updating user information:", error);
        }
    };

    return (
        <div className='account'>
            <div className='account-card'>
                <h1>Account</h1>
                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor='newEmail'>New Email:</label>
                        <input type='email' id='newEmail' name='newEmail' value={newEmail} onChange={handleChangeEmail} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='newUsername'>New Username:</label>
                        <input type='text' id='newUsername' name='newUsername' value={newUsername} onChange={handleChangeUsername} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='newPassword'>New Password:</label>
                        <input type='password' id='newPassword' name='newPassword' value={newPassword} onChange={handleChangePassword} />
                    </div>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    {successMessage && <div className="success-message">{successMessage}</div>}
                    <button type='submit'>Update</button>
                </form>
            </div>
        </div>
    );
}

export default Account;
