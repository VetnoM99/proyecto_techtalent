import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Link, useLocation } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LoginDialog from '../settings/Login'; // Asegúrate de que LoginDialog esté bien implementado
import logo from '../assets/logo.png'; // Logo principal

interface NavBarProps {
  setLoginDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isLoggedIn: boolean;
  userName: string;
  onLogout: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ setLoginDialogOpen, isLoggedIn, userName, onLogout }) => {
  const [loginDialogOpen, setLoginDialogOpenState] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleLoginSuccess = (username: string) => {
    setLoginDialogOpenState(false);
  };

  const handleLogout = () => {
    onLogout(); // Llama a la función de logout que se pasa como prop
    setAnchorEl(null); // Cierra el menú desplegable
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const location = useLocation();
  const pages = ['Inicio', 'Quienes somos', 'Proyecto', 'Contacto', 'Participa'];

  const getCurrentPage = () => {
    const path = location.pathname;
    const currentPage = pages.find(page => `/${page.toLowerCase().replace(/ /g, '-')}` === path);
    return currentPage || 'Inicio';
  };

  const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
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
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {isLoggedIn ? (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '50%',
                      backgroundColor: generateRandomColor(),
                      color: 'white',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      marginLeft: 2,
                    }}
                    onClick={handleMenuClick}
                  >
                    {userName.charAt(0).toUpperCase()}
                  </Box>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={handleMenuClose}>Perfil</MenuItem>
                    <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
                  </Menu>
                </Box>
              ) : (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Button
                    variant="outlined"
                    sx={{ color: 'white', fontSize: '0.8rem', borderColor: 'white', background: '#212832', padding: '6px 25px', marginRight: "5px", whiteSpace: 'nowrap', '&:hover': { background: 'white', color: 'black' } }}
                    onClick={() => setLoginDialogOpen(true)}
                  >
                    Login
                  </Button>
                  <Button
                    component={Link}
                    to="/register"
                    variant="outlined"
                    sx={{ color: 'white', fontSize: '0.8rem', borderColor: 'white', background: '#212832', padding: '6px 25px', whiteSpace: 'nowrap', '&:hover': { background: 'white', color: 'black' } }}
                  >
                    Registrar
                  </Button>
                </Box>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <LoginDialog
        open={loginDialogOpen}
        onClose={() => setLoginDialogOpenState(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
};

export default NavBar;
