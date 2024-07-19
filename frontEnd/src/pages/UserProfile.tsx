import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { fetchUserProfile, updateUserProfile } from '../api/userApi'; // Asegúrate de que esta ruta sea correcta

interface UserProfileProps {
  userId: number;
  onClose: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ userId, onClose }) => {
  const [profile, setProfile] = useState({ username: '', email: '' });
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const userData = await fetchUserProfile(userId);
        setProfile(userData);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    loadUserProfile();
  }, [userId]);

  const handleSave = async () => {
    try {
      await updateUserProfile(userId, { email: profile.email });
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
        disabled
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
