// src/pages/ProfileMenu.tsx

import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';
import userLogo from '../assets/user-logo.png'; // Asegúrate de tener el path correcto

interface ProfileMenuProps {
  anchorEl: null | HTMLElement;
  handleAvatarClick: (event: React.MouseEvent<HTMLElement>) => void;
  handleMenuClose: () => void;
  username: string;
  onLogout: () => void;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({
  anchorEl,
  handleAvatarClick,
  handleMenuClose,
  username,
  onLogout
}) => {
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleSettingsClick = () => {
    navigate(`/profile/${username}`);
    handleMenuClose();
  };

  return (
    <div>
      <Avatar 
        onClick={handleAvatarClick} 
        src={userLogo} 
        sx={{ marginRight: 2 }} // Ajusta el margen derecho
      />
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleSettingsClick}>Configuración</MenuItem>
        <Divider />
        <MenuItem onClick={onLogout}>Cerrar sesión</MenuItem>
      </Menu>
    </div>
  );
};

export default ProfileMenu;
