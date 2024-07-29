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
  const { user } = useUser();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const pages = ['Inicio', 'Quienes somos', 'Proyecto', 'Contacto', 'Participa', 'FAQ']; // Añadir 'FAQ'
// @ts-ignore
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

  const initial = user ? user.username.charAt(0).toUpperCase() : '';

  return (
    <AppBar position="static" sx={{ background: '#f3f4ef', height: '80px' }}> {/* Ajustar el height aquí */}
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '80px' }}> {/* Asegúrate de que el contenedor coincida con el height */}
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%' }}>
          <Box sx={{ flex: '1', display: 'flex', alignItems: 'center', ml: 2 }}> {/* Ajusta el margen izquierdo */}
            <img src={logo} alt="Logo" style={{ maxHeight: '50px', width: 'auto' }} /> {/* Ajusta la altura del logo */}
          </Box>
          <Box sx={{ flex: '2', display: 'flex', justifyContent: 'space-evenly' }}>
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
                initial={initial}
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
