import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

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
    <AppBar position="static" sx={{ background:'#f3f4ef', backgroundSize: 'cover', height: '14vh' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '20px', paddingBottom: '20px' }}>
          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              component="img"
              src={logo}
              alt="Logo"
              sx={{
                height: 50,
              }}
            />
          </Box>

          {/* Páginas */}
          <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'center', marginLeft: '20px' }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handleNavClick(page)}
                sx={{ mx: 2, color: 'black', fontSize: '1.2rem' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {/* Botones de Login y Registro */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button
              onClick={handleLoginClick}
              variant="outlined"
              sx={{ mx: 1, color: 'white', fontSize: '1rem', borderColor: 'white', background: '#212832', '&:hover': { background: 'white', color: 'black' } }}
            >
              Iniciar sesión
            </Button>
            <Button
              onClick={handleRegisterClick}
              variant="outlined"
              sx={{ mx: 1, color: 'white', fontSize: '1rem', borderColor: 'white', background: '#212832', '&:hover': { background: 'white', color: 'black' } }}
            >
              Registrarse
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;
