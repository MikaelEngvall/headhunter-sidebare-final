import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import '../App.css';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { IconContext } from 'react-icons';


function Navbar({ isAuthorized }) {
    const [darkMode, setDarkMode] = useState(true);
    const [sidebar, setSidebar] = useState(false);
    const [glowIcons, setGlowIcons] = useState(!isAuthorized); // Initially glow if not authorized

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        const root = document.documentElement;
        root.style.setProperty('--bg-color-light', darkMode ? '#F3EBF6' : '#333333');
        root.style.setProperty('--text-color-light', darkMode ? '#333333' : '#f2f2f2');
        root.style.setProperty('--bg-color-dark', darkMode ? '#c2bcc4' : '#777777');
        root.style.setProperty('--text-color-dark', darkMode ? '#484649' : '#333333');
    };

    const showSidebar = () => {
        if (isAuthorized) {
            setSidebar(!sidebar); // Show sidebar if authorized
        } else {
            setGlowIcons(true); // Glow icons if not authorized
            setTimeout(() => setGlowIcons(false), 1000); // Remove glow after 1 second
        }
    };
    console.log("Sidebar ", sidebar);
    console.log("GlowIcons ", glowIcons);
    console.log("Authorized ", isAuthorized);
    return (
        <>
            <IconContext.Provider value={{ color: 'undefined' }}>
                <div className={`navbar ${darkMode ? 'dark' : 'light'}`}>
                    <Link to="#" className='menu-bars'>
                        <FaIcons.FaBars onClick={showSidebar} />
                    </Link>
                    <div className={`auth-icons ${glowIcons ? 'glow' : ''}`}>
                        <div className="toggle-switch">
                            <input
                                type="checkbox"
                                id="darkModeToggle"
                                checked={darkMode}
                                onChange={toggleDarkMode}
                            />
                            <label htmlFor="darkModeToggle" className={darkMode ? 'toggle-switch dark-mode' : 'toggle-switch'} onClick={toggleDarkMode} /> {/* Use onClick to toggle dark mode */}
                        </div>
                        <Link to="/signup" className={`auth-icon ${glowIcons ? 'glow' : ''}`}>
                            <FaIcons.FaUserPlus />
                        </Link>
                        <Link to="/login" className={`auth-icon ${glowIcons ? 'glow' : ''}`}>
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
                                <Link to={item.path}>
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
