// src/pages/ProfileMenu.tsx

import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';

interface ProfileMenuProps {
  anchorEl: null | HTMLElement;
  handleAvatarClick: (event: React.MouseEvent<HTMLElement>) => void;
  handleMenuClose: () => void;
  username: string;
  onLogout: () => void;
  initial: string;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({
  anchorEl,
  handleAvatarClick,
  handleMenuClose,
  username,
  onLogout,
  initial
}) => {
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleSettingsClick = () => {
    navigate(`/profile/${username}`);
    handleMenuClose();
  };

  return (
    <div>
      <Avatar onClick={handleAvatarClick}>{initial}</Avatar>
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
