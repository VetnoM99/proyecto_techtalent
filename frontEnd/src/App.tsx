// src/App.tsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import NavBar from './components/NavBar';
import FooterBar from './components/FooterBar';
import Home from './pages/Home';
import QuienesSomos from './pages/QuienesSomos';
import Proyecto from './pages/Proyecto';
import Contacto from './pages/Contacto';
import Participa from './pages/Participa';
import UserProfile from './pages/UserProfile';
import LoginDialog from './settings/Login';
import RegisterForm from './settings/RegisterForm';
import { validateToken, refreshToken } from './api/userApi';
import { UserProvider } from './context/UserProvider';
import { isValidJwt } from './utils/jwtUtils';

const App: React.FC = () => {
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [registerDialogOpen, setRegisterDialogOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const storedToken = localStorage.getItem('authToken');
      const storedRefreshToken = localStorage.getItem('refreshToken');
      const storedUserId = localStorage.getItem('userId');
      const storedUserName = localStorage.getItem('username');

      if (storedToken && storedRefreshToken && storedUserId && storedUserName) {
        try {
          if (isValidJwt(storedToken)) {
            await validateToken(storedToken);
            setIsLoggedIn(true);
            setUserName(storedUserName);
            setUserId(Number(storedUserId));
          } else {
            throw new Error('Invalid token');
          }
        } catch (error) {
          try {
            const { token: newToken } = await refreshToken(storedRefreshToken);
            localStorage.setItem('authToken', newToken);
            setIsLoggedIn(true);
            setUserName(storedUserName);
            setUserId(Number(storedUserId));
          } catch (refreshError) {
            console.error('Token refresh failed:', refreshError);
            handleLogout();
          }
        }
      } else {
        setIsLoggedIn(false);
        setUserName('');
        setUserId(null);
      }
    };

    checkAuthStatus();

    const interval = setInterval(() => {
      checkAuthStatus();
    }, 15 * 60 * 1000); // Verificar cada 15 minutos

    return () => clearInterval(interval);
  }, []);

  const handleLoginSuccess = (username: string, id: number, token: string, refreshToken: string) => {
    localStorage.setItem('username', username);
    localStorage.setItem('userId', id.toString());
    localStorage.setItem('authToken', token);
    localStorage.setItem('refreshToken', refreshToken);
    setIsLoggedIn(true);
    setUserName(username);
    setUserId(id);
    setLoginDialogOpen(false); 
  };

  const handleRegisterSuccess = async (username: string, id: number, token: string, refreshToken: string): Promise<void> => {
    try {
      localStorage.setItem('username', username);
      localStorage.setItem('userId', id.toString());
      localStorage.setItem('authToken', token);
      localStorage.setItem('refreshToken', refreshToken);

      setIsLoggedIn(true);
      setUserName(username);
      setUserId(id);

      setRegisterDialogOpen(false);

      // Navegar a la página de perfil
      window.location.href = `/profile/${id}`;
    } catch (error) {
      console.error('Error registrando:', error);
      alert('Error al registrar');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    setIsLoggedIn(false);
    setUserName('');
    setUserId(null);
    window.location.reload();
  };

  return (
    <UserProvider>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Router>
          <NavBar
            setLoginDialogOpen={setLoginDialogOpen}
            setRegisterDialogOpen={setRegisterDialogOpen}
            onLogout={handleLogout}
          />
          <Box sx={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/quienes-somos" element={<QuienesSomos />} />
              <Route path="/proyecto" element={<Proyecto />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/participa" element={<Participa />} />
              <Route 
                path="/profile/:id" 
                element={isLoggedIn ? <UserProfile userId={userId!} onClose={() => setUserId(null)} /> : <Navigate to="/" />} 
              />
            </Routes>
          </Box>
          <FooterBar />
        </Router>
      </Box>
      <LoginDialog open={loginDialogOpen} onClose={() => setLoginDialogOpen(false)} onLoginSuccess={handleLoginSuccess} />
      <RegisterForm open={registerDialogOpen} onClose={() => setRegisterDialogOpen(false)} onRegisterSuccess={handleRegisterSuccess} />
    </UserProvider>
  );
};

export default App;
