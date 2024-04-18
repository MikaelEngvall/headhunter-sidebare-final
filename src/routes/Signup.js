import React, { useState } from 'react';


function Signup() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [emailValid, setEmailValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);

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

    return (
        <div className='signup-container'>
            <div className='signup-card'>
                <h1>Sign Up</h1>
                <form>
                    <div className='form-group'>
                        <label htmlFor='email'>Email:</label>
                        <input type='email' id='email' name='email' value={email} onChange={handleEmailChange} required />
                        {emailValid && <i className='fas fa-check'></i>}
                    </div>
                    <div className='form-group'>
                        <label htmlFor='username'>Username:</label>
                        <input type='text' id='username' name='username' value={username} onChange={handleUsernameChange} required />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password'>Password:</label>
                        <input type='password' id='password' name='password' value={password} onChange={handlePasswordChange} required />
                        {passwordValid && <i className='fas fa-check'></i>}
                    </div>
                    <button type='submit'>Sign Up</button>
                </form>
            </div>
        </div>
    );
}

export default Signup;
