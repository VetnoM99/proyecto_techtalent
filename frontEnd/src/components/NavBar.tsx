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
  setLoginDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setRegisterDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isLoggedIn: boolean;
  userName: string;
  onLogout: () => void;
}

const NavBar: React.FC<NavBarProps> = ({
  setLoginDialogOpen,
  setRegisterDialogOpen,
  isLoggedIn,
  userName,
  onLogout
}) => {
  const location = useLocation();

  const pages = ['Inicio', 'Quienes somos', 'Proyecto', 'Contacto', 'Participa'];

  const getCurrentPage = () => {
    const path = location.pathname;
    const currentPage = pages.find(page => `/${page.toLowerCase().replace(/ /g, '-')}` === path);
    return currentPage || 'Inicio';
  };

  return (
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
                    display: 'flex',
                    alignItems: 'center',
                    marginLeft: 2,
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: 'bold'
                  }}
                >
                  <ProfileMenu
                    userName={userName}
                    onLogout={onLogout}
                    onProfileClick={() => console.log('Profile Clicked')}
                  />
                </Box>
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
                  onClick={() => setRegisterDialogOpen(true)}
                >
                  Registrar
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;

