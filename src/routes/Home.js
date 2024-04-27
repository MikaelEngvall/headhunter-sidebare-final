import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SiOpenai } from 'react-icons/si';
import styled, { keyframes } from 'styled-components';

const glowAnimation = keyframes`
  0% {
    color: #fff;
    text-shadow: 0 0 10px yellow;
  }
  50% {
    color: yellow;
    text-shadow: 0 0 20px yellow;
  }
  100% {
    color: #fff;
    text-shadow: 0 0 10px yellow;
  }
`;

const GlowingLetter = styled.span`
  animation: ${glowAnimation} 2s infinite alternate;
  display: inline-block;
`;

function GlowingText({ text }) {
    const [glowingIndex, setGlowingIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setGlowingIndex((prevIndex) => (prevIndex + 1) % text.length);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [text]);

    return (
        <>
            {text.split('').map((letter, index) => (
                <GlowingLetter key={index} style={{ color: index === glowingIndex ? 'yellow' : '#fff' }}>
                    {letter}
                </GlowingLetter>
            ))}
        </>
    );
}

function Home() {
    return (
        <div className='home'>
            <div className='home-card'>
                <h2>
                    <GlowingText text='HEADHUNTER' />
                </h2>
                <h2>INTELLIGENT RECRUITING</h2>
                <br />
                <h3>
                    Powered by &nbsp;
                    <SiOpenai />
                </h3>
                <br />
                <h3>Welcome to my project. </h3>
                <br />
                <h4>This application will assist you in creating job advertisements.</h4>
                <h4>
                    Please <Link to='/signup'>sign up</Link> or <Link to='/login'>login</Link>
                </h4>
            </div>
        </div>
    );
}

export default Home;
