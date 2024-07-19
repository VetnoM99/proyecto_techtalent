import React from 'react';
import { Menu, MenuItem, IconButton, Typography, Avatar } from '@mui/material';
import { deepOrange } from '@mui/material/colors';

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
    <div>
      <IconButton onClick={handleClick} size="large">
        <Avatar sx={{ bgcolor: deepOrange[500] }}>{userName.charAt(0).toUpperCase()}</Avatar>
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={() => { handleClose(); onProfileClick(); }}>Ver Perfil</MenuItem>
        <MenuItem onClick={() => { handleClose(); onLogout(); }}>Cerrar Sesión</MenuItem>
      </Menu>
      <Typography>{userName}</Typography>
    </div>
  );
};

export default ProfileMenu;
