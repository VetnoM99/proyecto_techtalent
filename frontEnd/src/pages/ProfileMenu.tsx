import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import { Box } from '@mui/material';

interface ProfileMenuProps {
  userName: string;
  onLogout: () => void;
  onProfileClick: () => void;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ userName, onLogout, onProfileClick }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Avatar onClick={handleClick} sx={{ bgcolor: getRandomColor() }}>{userName.charAt(0)}</Avatar>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => { handleClose(); onProfileClick(); }}>Ver perfil</MenuItem>
        <MenuItem onClick={() => { handleClose(); onLogout(); }}>Cerrar sesión</MenuItem>
      </Menu>
    </Box>
  );
};

const getRandomColor = () => {
  const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722'];
  return colors[Math.floor(Math.random() * colors.length)];
};

export default ProfileMenu;
