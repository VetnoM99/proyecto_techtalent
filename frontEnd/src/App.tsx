import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import NavBar from './components/NavBar';
import FooterBar from './components/FooterBar';
import Home from './pages/Home';
import QuienesSomos from './pages/QuienesSomos';
import Proyecto from './pages/Proyecto';
import Contacto from './pages/Contacto';
import Participa from './pages/Participa';
import LoginDialog from './settings/Login';
import RegisterForm from './settings/RegisterForm';
import UserProfile from './pages/UserProfile';
import { validateToken } from './api/userApi';

const App: React.FC = () => {
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [registerDialogOpen, setRegisterDialogOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const storedToken = localStorage.getItem('token');
      const storedUserId = localStorage.getItem('userId');
      const storedUserName = localStorage.getItem('userName');

      if (storedToken && storedUserId && storedUserName) {
        try {
          await validateToken(storedToken); // Verifica el token

          // Si la validación del token es exitosa
          setIsLoggedIn(true);
          setUserName(storedUserName);
          setUserId(Number(storedUserId));
        } catch (error) {
          // Si la validación del token falla
          console.error('Token validation failed:', error);
          handleLogout(); // Cierra sesión si el token no es válido
        }
      } else {
        setIsLoggedIn(false);
        setUserName('');
        setUserId(null);
      }
    };

    checkAuthStatus();
  }, []);

  const handleLoginSuccess = (username: string, id: number, token: string) => {
    localStorage.setItem('userName', username);
    localStorage.setItem('userId', id.toString());
    localStorage.setItem('token', token); // Almacena el token real
    setIsLoggedIn(true);
    setUserName(username);
    setUserId(id);
  };

  const handleRegisterSuccess = (username: string) => {
    setIsLoggedIn(true);
    setUserName(username);
  };

  const handleLogout = () => {
    // Limpia localStorage y actualiza el estado
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUserName('');
    setUserId(null);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Router>
        <NavBar
          setLoginDialogOpen={setLoginDialogOpen}
          setRegisterDialogOpen={setRegisterDialogOpen}
          isLoggedIn={isLoggedIn}
          userName={userName}
          userId={userId ?? 0}
          onLogout={handleLogout}
        />
        <Box
          sx={{
            flex: '1 0 auto',
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/inicio" element={<Home />} />
            <Route path="/quienes-somos" element={<QuienesSomos />} />
            <Route path="/proyecto" element={<Proyecto />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/participa" element={<Participa />} />
            <Route path="/register" element={<RegisterForm open={registerDialogOpen} onClose={() => setRegisterDialogOpen(false)} onRegisterSuccess={handleRegisterSuccess} />} />
            <Route path="/profile/:userId" element={isLoggedIn ? <UserProfile userId={userId ?? 0} onClose={() => { /* Define una función para manejar el cierre del perfil */ }} /> : <Navigate to="/" />} />
          </Routes>
        </Box>
        <FooterBar />
        <LoginDialog
          open={loginDialogOpen}
          onClose={() => setLoginDialogOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />
        <RegisterForm
          open={registerDialogOpen}
          onClose={() => setRegisterDialogOpen(false)}
          onRegisterSuccess={handleRegisterSuccess}
        />
      </Router>
    </Box>
  );
};

export default App;
