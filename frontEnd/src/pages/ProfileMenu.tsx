// ProfileMenu.tsx
import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import AccountCircle from '@mui/icons-material/AccountCircle'; // Asegúrate de que esto es correcto

interface ProfileMenuProps {
  userName: string;
  onLogout: () => void;
  onProfileClick: () => void; // Asegúrate de que esta propiedad está en la interfaz
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ userName, onLogout, onProfileClick }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Avatar onClick={handleClick} sx={{ cursor: 'pointer' }}>
        <AccountCircle />
      </Avatar>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={() => { handleClose(); onProfileClick(); }}>Ver perfil</MenuItem>
        <MenuItem onClick={() => { handleClose(); onLogout(); }}>Cerrar sesión</MenuItem>
      </Menu>
    </>
  );
};

export default ProfileMenu;
