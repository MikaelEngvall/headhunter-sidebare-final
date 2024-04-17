import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import '../App.css';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { IconContext } from 'react-icons';


function Navbar() {
    const [darkMode, setDarkMode] = useState(false);
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        const root = document.documentElement;
        root.style.setProperty('--bg-color-light', darkMode ? '#f2f2f2' : '#333333');
        root.style.setProperty('--text-color-light', darkMode ? '#333333' : '#f2f2f2');
        root.style.setProperty('--bg-color-dark', darkMode ? '#cfc6c1' : '#777777');
        root.style.setProperty('--text-color-dark', darkMode ? '#f2f2f2' : '#333333');
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
                                onChange={() => { }} // Remove onChange event
                            />
                            <label htmlFor="darkModeToggle" className={darkMode ? 'toggle-switch dark-mode' : 'toggle-switch'} onClick={toggleDarkMode} /> {/* Use onClick to toggle dark mode */}
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
