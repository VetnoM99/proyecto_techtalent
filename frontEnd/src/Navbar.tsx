import React from 'react';
import './Navbar.css';

interface NavbarProps {
    opacity: number;
}

const Navbar: React.FC<NavbarProps> = ({ opacity }) => {
    return (
        <nav className="navbar" style={{ backgroundColor: `rgba(0, 0, 0, ${opacity})` }}>
            <div className="navbar-content">
                <img src="/img/logo_blanco.png" alt="Logo" className="navbar-logo" />
                <ul className="navbar-links">
                    <li>Quienes somos</li>
                    <li>Proyecto</li>
                    <li>Contacto</li>
                    <li>Participa</li>
                </ul>
                <div className="navbar-auth">
                    <button className="login-button">Login</button>
                    <button className="register-button">Registrarse</button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
