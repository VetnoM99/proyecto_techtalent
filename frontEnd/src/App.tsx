import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
import './styles/App.css';

const App: React.FC = () => {
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [registerDialogOpen, setRegisterDialogOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const savedUserId = localStorage.getItem('userId');
    const savedUserName = localStorage.getItem('username');
    
    if (token && savedUserId && savedUserName) {
      setIsLoggedIn(true);
      setUserName(savedUserName);
      setUserId(parseInt(savedUserId, 10));
    }
  }, []);

  const handleLoginSuccess = (username: string, id: number) => {
    setIsLoggedIn(true);
    setUserName(username);
    setUserId(id);
  };

  const handleRegisterSuccess = (username: string) => {
    setIsLoggedIn(true);
    setUserName(username);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
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
            <Route
              path="/register"
              element={
                <RegisterForm
                  open={registerDialogOpen}
                  onClose={() => setRegisterDialogOpen(false)}
                  onRegisterSuccess={handleRegisterSuccess}
                />
              }
            />
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
