import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { fetchUserProfile, updateUserProfile } from '../api/userApi'; // Asegúrate de implementar estas funciones en un archivo API separado

interface UserProfileProps {
  userName: string;
  onClose: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ userName, onClose }) => {
  const [profile, setProfile] = useState({ username: '', email: '' });
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const userData = await fetchUserProfile(userName);
        setProfile(userData);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    loadUserProfile();
  }, [userName]);

  const handleSave = async () => {
    try {
      await updateUserProfile(profile);
      setMessage('Perfil actualizado exitosamente');
      setEditing(false);
    } catch (error) {
      setMessage('Error al actualizar el perfil');
      console.error('Error updating profile:', error);
    }
  };

  return (
    <Box sx={{ padding: 2, maxWidth: 600, margin: 'auto' }}>
      <h2>Perfil de Usuario</h2>
      <TextField
        label="Nombre de usuario"
        value={profile.username}
        onChange={(e) => setProfile({ ...profile, username: e.target.value })}
        fullWidth
        disabled={!editing}
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Correo electrónico"
        value={profile.email}
        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
        fullWidth
        disabled={!editing}
        sx={{ marginBottom: 2 }}
      />
      {message && <p>{message}</p>}
      <Button variant="outlined" onClick={() => setEditing(!editing)} sx={{ marginRight: 1 }}>
        {editing ? 'Cancelar' : 'Editar'}
      </Button>
      {editing && (
        <Button variant="contained" onClick={handleSave}>
          Guardar
        </Button>
      )}
      <Button variant="outlined" onClick={onClose} sx={{ marginLeft: 1 }}>
        Cerrar
      </Button>
    </Box>
  );
};

export default UserProfile;
