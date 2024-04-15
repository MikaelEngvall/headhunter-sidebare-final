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
        // Additional logic to toggle dark mode theme
    };

    return (
        <>
            <IconContext.Provider value={{ color: 'undefined' }}>
                <div className="navbar">
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
                            <label htmlFor="darkModeToggle" />
                        </div>
                        <Link to="/signup" className="auth-icon">
                            {/* Replace with your signup icon */}
                            <FaIcons.FaUserPlus />
                        </Link>
                        <Link to="/login" className="auth-icon">
                            {/* Replace with your login icon */}
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
