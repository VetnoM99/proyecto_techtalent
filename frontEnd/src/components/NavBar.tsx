import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import backgroundImage from '../assets/Atardecer.jpg';
import avatarImage from '../assets/logoweb.png';  // Importa la imagen del avatar

const pages = ['Inicio', 'Quiénes somos', 'Proyecto', 'Contacto', 'Participa'];
const settings = ['Iniciar sesión', 'Registrarse'];

const NavBar: React.FC = () => {
  // @ts-ignore
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  // @ts-ignore
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLoginClick = () => {
    handleCloseUserMenu();
    navigate('/login');
  };

  return (
    <AppBar position="static" sx={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <Box sx={{ flexGrow: 1 }} />
            <Box
              component="img"
              src={logo}
              alt="Logo"
              sx={{
                height: 110,
                mr: 2,
              }}
            />
            
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Avatar" src={avatarImage} />  
                </IconButton>
              </Tooltip>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={setting === 'Iniciar sesión' ? handleLoginClick : handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Box>
        </Toolbar>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          {pages.map((page) => (
            <Button
              key={page}
              onClick={handleCloseNavMenu}
              sx={{ mx: 2, color: 'white', fontSize: '1.2rem' }}
            >
              {page}
            </Button>
          ))}
        </Box>
      </Container>
    </AppBar>
  );
}

export default NavBar;