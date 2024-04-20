import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import '../App.css';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { IconContext } from 'react-icons';

function Navbar() {
    const [darkMode, setDarkMode] = useState(true);
    const [sidebar, setSidebar] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("headhunter-token");
        setAuthenticated(!!token);
        handleAuthentication(token);
    }, [authenticated]);

    const handleAuthentication = (token) => {
        setAuthenticated(!!token); // Update authentication state based on token presence
    };

    const showSidebar = () => setSidebar(!sidebar);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        const root = document.documentElement;
        root.style.setProperty('--bg-color-light', darkMode ? '#F3EBF6' : '#333333');
        root.style.setProperty('--text-color-light', darkMode ? '#333333' : '#f2f2f2');
        root.style.setProperty('--bg-color-dark', darkMode ? '#c2bcc4' : '#777777');
        root.style.setProperty('--text-color-dark', darkMode ? '#484649' : '#333333');
    };

    return (
        <>
            <IconContext.Provider value={{ color: 'undefined' }}>
                <div className={`navbar ${darkMode ? 'dark' : 'light'}`}>
                    <Link to="#" className='menu-bars'>
                        <FaIcons.FaBars onClick={showSidebar} />
                    </Link>
                    <div className="auth-icons">
                        <div className="toggle-switch">
                            <input
                                type="checkbox"
                                id="darkModeToggle"
                                checked={darkMode}
                                onChange={toggleDarkMode}
                            />
                            <label htmlFor="darkModeToggle" className="toggle-switch" />
                        </div>
                        <Link to="/signup" className="auth-icon">
                            <FaIcons.FaUserPlus />
                        </Link>
                        <Link to="/login" className="auth-icon">
                            <FaIcons.FaSignInAlt />
                        </Link>
                    </div>
                </div>
                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <ul className="nav-menu-items" onClick={showSidebar}>
                        <li className="navbar-toggle">
                            <Link to="#" className="menu-bars">
                                <AiIcons.AiOutlineClose />
                            </Link>
                        </li>
                        {SidebarData.map((item, index) => (
                            <li key={index} className={item.cName}>
                                {/* Conditionally render based on authentication state */}
                                <Link to={item.path} className={!authenticated && (item.path === '/admin' || item.path === '/account' || item.path === '/ads') ? 'inactive' : ''}>
                                    {item.icon}
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </IconContext.Provider>
        </>
    );
}

export default Navbar;
