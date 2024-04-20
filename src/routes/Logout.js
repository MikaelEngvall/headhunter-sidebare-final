import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        // Remove the token from local storage
        localStorage.removeItem("headhunter-token");
        navigate("/");
        window.location.reload();  // Reloads the page since I haven't figured out how to re-render the sidebar in real time yet!!! TODO
    });

    return (
        <div className='logout'>
            <div className='logout-card'>
                <h1>Logout</h1>
            </div>
        </div>
    );
}

export default Logout;
