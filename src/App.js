import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './routes/Home';
import Account from './routes/Account';
import Admin from './routes/Admin';
import Ads from './routes/Ads';
import Logout from './routes/Logout';
import Login from './routes/Login';
import Signup from './routes/Signup';

function App() {
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Here you can implement your authentication logic.
    // For example, check if the user is logged in and update isAuthorized accordingly.
    const checkAuthentication = () => {
      // Example: Check if the user is logged in by accessing authentication state from localStorage
      const token = localStorage.getItem('token');
      if (token) {
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    };

    // Call the authentication check function when the component mounts
    checkAuthentication();
  }, []);

  return (
    <>
      <Router>
        <Navbar isAuthorized={isAuthorized} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/account" element={<Account />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/ads" element={<Ads />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
