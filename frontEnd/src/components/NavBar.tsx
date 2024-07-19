import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Link, useLocation } from 'react-router-dom';
import ProfileMenu from '../pages/ProfileMenu';
import LoginDialog from '../settings/Login'; // Importa el componente LoginDialog
import logo from '../assets/logo.png';

const pages = ['Inicio', 'Quienes somos', 'Proyecto', 'Contacto', 'Participa'];

const NavBar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [loginDialogOpen, setLoginDialogOpen] = useState(false); // Estado para controlar la apertura del dialogo de login

  const handleLoginSuccess = (username: string) => {
    setIsLoggedIn(true);
    setUserName(username);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
  };

  const location = useLocation();

  const getCurrentPage = () => {
    const path = location.pathname;
    const currentPage = pages.find(page => `/${page.toLowerCase().replace(/ /g, '-')}` === path);
    return currentPage || 'Inicio';
  };

  return (
    <>
      <AppBar position="static" sx={{ background: '#f3f4ef' }}>
        <Container maxWidth="xl" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '12vh' }}>
          <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box
                  component="img"
                  src={logo}
                  alt="Logo"
                  sx={{ height: 40, marginLeft: 2, cursor: 'pointer' }}
                />
              </Box>
            </Link>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexGrow: 1 }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  component={Link}
                  to={`/${page.toLowerCase().replace(/ /g, '-')}`}
                  sx={{
                    color: page === getCurrentPage() ? '#007bff' : 'black',
                    fontSize: '0.9rem',
                    padding: '0 8px',
                    textTransform: 'none',
                  }}
                >
                  {page}
                </Button>
              ))}
            </Box>
            {isLoggedIn ? (
              <ProfileMenu userName={userName} onLogout={handleLogout} />
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Button
                  variant="outlined"
                  sx={{ color: 'white', fontSize: '0.8rem', borderColor: 'white', background: '#212832', padding: '5px 15px', whiteSpace: 'nowrap', '&:hover': { background: 'white', color: 'black' } }}
                  onClick={() => setLoginDialogOpen(true)} // Abrir el diálogo de login
                >
                  Iniciar sesión
                </Button>
                <Button
                  component={Link}
                  to="/register"
                  variant="outlined"
                  sx={{ color: 'white', fontSize: '0.8rem', borderColor: 'white', background: '#212832', padding: '5px 15px', whiteSpace: 'nowrap', '&:hover': { background: 'white', color: 'black' } }}
                >
                  Registrarse
                </Button>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <LoginDialog
        open={loginDialogOpen}
        onClose={() => setLoginDialogOpen(false)} // Cerrar el diálogo de login
        onLoginSuccess={handleLoginSuccess} // Manejar el éxito del login
      />
    </>
  );
};

export default NavBar;
