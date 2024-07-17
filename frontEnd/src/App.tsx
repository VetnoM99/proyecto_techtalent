import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Box from '@mui/material/Box';
import NavBar from './components/NavBar';
import FooterBar from './components/FooterBar';
import Home from './pages/Home';
import QuienesSomos from './pages/QuienesSomos';
import Proyecto from './pages/Proyecto';
import Contacto from './pages/Contacto';
import Participa from './pages/Participa';
import Login from './settings/Login';
import Register from './settings/Register'

const App: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Router>
        <NavBar />
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
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Box>
        <FooterBar />
      </Router>
    </Box>
  );
}

export default App;