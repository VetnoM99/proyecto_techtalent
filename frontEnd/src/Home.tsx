import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import './Home.css';

const Home: React.FC = () => {
    const [navbarOpacity, setNavbarOpacity] = useState(0);

    const handleScroll = () => {
        const scrollTop = window.scrollY;
        const maxOpacity = 0.9;
        const opacity = Math.min(scrollTop / 300, maxOpacity);
        setNavbarOpacity(opacity);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="home-container">
            <Navbar opacity={navbarOpacity} />
            <div className="main-section">
                <div className="logo-container">
                    <img src="/assets/logo_blanco.png" alt="Logo de la ONG" className="logo" />
                </div>
                <div className="description">
                    <h1>Saborea, conserva y colabora</h1>
                    <button className="join-button">Conocer más</button>
                </div>
            </div>
      
        </div>
    );
};

export default Home;
