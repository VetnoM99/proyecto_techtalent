import React, { useState } from 'react';
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

const App: React.FC = () => {
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [registerDialogOpen, setRegisterDialogOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  const handleLoginSuccess = (username: string) => {
    setIsLoggedIn(true);
    setUserName(username);
    setLoginDialogOpen(false);
  };

  const handleRegisterSuccess = (username: string) => {
    setIsLoggedIn(true);
    setUserName(username);
    setRegisterDialogOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
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
}

export default App;

