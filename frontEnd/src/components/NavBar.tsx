// src/components/NavBar.tsx

import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Link, useLocation } from 'react-router-dom';
import ProfileMenu from '../pages/ProfileMenu';
import logo from '../assets/logo.png'; // Asegúrate de tener el path correcto
import { useUser } from '../context/UserProvider';

interface NavBarProps {
  setLoginDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setRegisterDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onLogout: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ setLoginDialogOpen, setRegisterDialogOpen, onLogout }) => {
  const { user } = useUser(); // Obtener el usuario del contexto
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

  return (
    <AppBar position="static" sx={{ background: '#f3f4ef' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '10vh' }}>
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ flex: '1', display: 'flex', alignItems: 'center' }}>
            <img src={logo} alt="Logo" style={{ maxHeight: '30px', width: '10vw', marginLeft:'20px'}} />
          </Box>
          <Box sx={{ flex: '3', display: 'flex', justifyContent: 'space-evenly' }}>
            {pages.map((page) => (
              <Button
                key={page}
                component={Link}
                to={`/${page.toLowerCase().replace(/ /g, '-')}`}
                sx={{ my: 2, color: 'black', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box sx={{ flex: '1', display: 'flex', justifyContent: 'flex-end' }}>
            {user ? (
              <ProfileMenu
                anchorEl={anchorEl}
                handleAvatarClick={handleAvatarClick}
                handleMenuClose={handleMenuClose}
                username={user.username}
                onLogout={onLogout}
              />
            ) : (
              <>
                <Button onClick={() => setLoginDialogOpen(true)}>Login</Button>
                <Button onClick={() => setRegisterDialogOpen(true)}>Register</Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Box>
    </AppBar>
  );
};

export default NavBar;
