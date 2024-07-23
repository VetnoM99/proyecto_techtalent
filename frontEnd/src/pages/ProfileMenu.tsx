// src/pages/ProfileMenu.tsx

import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';

interface ProfileMenuProps {
  userName: string;
  userId: number;
  onLogout: () => void;
  anchorEl: HTMLElement | null;
  onClose: () => void;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ userName, userId, onLogout, anchorEl, onClose }) => {
  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
    >
      <MenuItem onClick={onClose} component={Link} to={`/profile/${userId}`}>
        Ver perfil
      </MenuItem>
      <MenuItem onClick={() => { onClose(); onLogout(); }}>
        Cerrar sesión
      </MenuItem>
    </Menu>
  );
};

export default ProfileMenu;
