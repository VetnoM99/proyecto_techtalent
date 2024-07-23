// src/components/NavBar.tsx

import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Link, useLocation } from 'react-router-dom';
import ProfileMenu from '../pages/ProfileMenu';
import logo from '../assets/logo.png';

interface NavBarProps {
  setLoginDialogOpen: (open: boolean) => void;
  setRegisterDialogOpen: (open: boolean) => void;
  isLoggedIn: boolean;
  userName: string;
  userId: number; // Asegúrate de pasar el userId
  onLogout: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ setLoginDialogOpen, setRegisterDialogOpen, isLoggedIn, userName, userId, onLogout }) => {
  const location = useLocation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const pages = ['Inicio', 'Quienes somos', 'Proyecto', 'Contacto', 'Participa'];

  const getCurrentPage = () => {
    const path = location.pathname;
    const currentPage = pages.find(page => `/${page.toLowerCase().replace(/ /g, '-')}` === path);
    return currentPage || 'Inicio';
  };

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Extraer la inicial del nombre del usuario
  const initial = userName.charAt(0).toUpperCase();

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
                  {/* Avatar con inicial del nombre que despliega el menú */}
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      backgroundColor: '#007bff',
                      color: 'white',
                      fontSize: '1.2rem',
                      fontWeight: 'bold',
                      marginRight: 2,
                      cursor: 'pointer',
                    }}
                    onClick={handleAvatarClick}
                  >
                    {initial}
                  </Box>
                  <ProfileMenu
                    userName={userName}
                    userId={userId}
                    onLogout={onLogout}
                    anchorEl={anchorEl}
                    onClose={handleMenuClose}
                  />
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
                    onClick={() => setRegisterDialogOpen(true)}
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
    </>
  );
};

export default NavBar;
