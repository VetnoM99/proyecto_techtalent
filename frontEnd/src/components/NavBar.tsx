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
    <AppBar position="static" sx={{ background:'#f3f4ef' }}>
      <Container maxWidth="xl" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '12vh' }}>
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              component="img"
              src={logo}
              alt="Logo"
              sx={{ height: 40, marginLeft: 2 }}
            />
          </Box>

          
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexGrow: 1 }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handleNavClick(page)}
                sx={{ color: 'black', fontSize: '0.9rem', padding: '0 8px' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 2 }}>
            <Button
              onClick={handleLoginClick}
              variant="outlined"
              sx={{ color: 'white', fontSize: '0.8rem', borderColor: 'white', background: '#212832', padding: '5px 15px', whiteSpace: 'nowrap', '&:hover': { background: 'white', color: 'black' } }}
            >
              Iniciar sesión
            </Button>
            <Button
              onClick={handleRegisterClick}
              variant="outlined"
              sx={{ color: 'white', fontSize: '0.8rem', borderColor: 'white', background: '#212832', padding: '5px 15px', whiteSpace: 'nowrap', '&:hover': { background: 'white', color: 'black' } }}
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

