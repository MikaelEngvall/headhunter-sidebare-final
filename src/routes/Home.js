import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import { SiOpenai } from "react-icons/si";

function Home() {
    return (
        <div className='home'>
            <div className='home-card'>
                <h2>HEADHUNTER</h2>
                <h2>INTELLIGENT RECRUITING</h2>
                <br></br>
                <h3>Powered by &nbsp;
                    <SiOpenai /></h3>
                <br></br>
                <h3>Welcome to my project. </h3>
                <br></br>
                <h4>This application will assist you in creating job advertisements.</h4>
                <h4>Please <Link to="/signup">sign up</Link> or <Link to="/login">login</Link></h4>
            </div>
        </div >
    );
}

export default Home;
