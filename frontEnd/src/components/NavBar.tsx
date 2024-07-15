import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import backgroundImage from '../assets/Atardecer.jpg';

const pages = ['Inicio', 'Quienes somos', 'Proyecto', 'Contacto', 'Participa'];

const NavBar: React.FC = () => {
  const navigate = useNavigate();

  const handleNavClick = (page: string) => {
    const pageRoute = page.toLowerCase().replace(/ /g, '-');
    navigate(`/${pageRoute}`);
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <AppBar position="static" sx={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              component="img"
              src={logo}
              alt="Logo"
              sx={{
                height: 50,
                mr: 2,
              }}
            />
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: 'flex', justifyContent: 'center', flexGrow: 2 }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handleNavClick(page)}
                sx={{ mx: 2, color: 'white', fontSize: '1.2rem' }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={handleLoginClick} sx={{ mx: 1, color: 'white', fontSize: '1rem' }}>
              Iniciar sesión
            </Button>
            <Button onClick={handleRegisterClick} sx={{ mx: 1, color: 'white', fontSize: '1rem' }}>
              Registrarse
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;

