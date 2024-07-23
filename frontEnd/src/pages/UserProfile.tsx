import React, { useEffect, useState } from 'react';
import { fetchUserProfile, updateUserProfile, UserProfileUpdate } from '../api/userApi';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {  styled } from '@mui/material/styles';

// Interfaz para el perfil de usuario
interface UserProfile {
  id: number;
  username: string;
  email: string;
  userpassword?: string;
}

// Props para el componente UserProfile
interface UserProfileProps {
  userId: number;
  onClose: () => void;
}

// Estilos personalizados
const Container = styled('div')(({ theme }) => ({
  padding: '20px',
  maxWidth: '600px',
  margin: 'auto',
  borderRadius: '8px',
  boxShadow: theme.shadows[3],
}));

const FieldContainer = styled('div')({
  marginBottom: '16px',
  display: 'flex',
  alignItems: 'center',
});

const HiddenText = styled('span')({
  color: '#888',
});

const UserProfile: React.FC<UserProfileProps> = ({ userId, onClose }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userId) {
      fetchUserProfile(userId)
        .then(data => {
          setProfile(data);
          setEmail(data.email);
          setName(data.username);
          setPassword(data.userpassword || '');
        })
        .catch(error => {
          console.error('Error fetching profile:', error);
        });
    }
  }, [userId]);

  const handleSave = async () => {
    if (password && password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      const updatedProfile: UserProfileUpdate = {
        email,
        name: name,
        password: password || undefined,
      };

      await updateUserProfile(userId, updatedProfile);
      setProfile(prevProfile => ({
        ...prevProfile!,
        username: name,
        email,
        userpassword: password || prevProfile?.userpassword,
      }));
      setEditMode(false);
      setError(null);
    } catch (error) {
      setError('Error updating profile');
      console.error('Error updating profile:', error);
    }
  };

  return (
    <Container>
      <h1>Perfil de Usuario</h1>
      {profile ? (
        <div>
          <FieldContainer>
            <div style={{ width: '200px' }}>Nombre de Usuario:</div>
            {editMode ? (
              <TextField
                label="Nombre de Usuario"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                margin="normal"
                InputProps={{ readOnly: !editMode }}
              />
            ) : (
              <span>{profile.username}</span>
            )}
          </FieldContainer>
          <FieldContainer>
            <div style={{ width: '200px' }}>Email:</div>
            {editMode ? (
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                margin="normal"
              />
            ) : (
              <span>{profile.email}</span>
            )}
          </FieldContainer>
          <FieldContainer>
            <div style={{ width: '200px' }}>Contraseña:</div>
            {editMode ? (
              <>
                <TextField
                  label="Contraseña"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                  margin="normal"
                />
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </>
            ) : (
              <span>{profile.userpassword ? '******' : 'No definida'}</span>
            )}
          </FieldContainer>
          {editMode && (
            <FieldContainer>
              <div style={{ width: '200px' }}>Confirmar Contraseña:</div>
              <TextField
                label="Confirmar Contraseña"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                fullWidth
                margin="normal"
              />
              <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            </FieldContainer>
          )}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {editMode ? (
            <div>
              <Button variant="contained" color="primary" onClick={handleSave} style={{ marginRight: '10px' }}>
                Guardar
              </Button>
              <Button variant="outlined" color="secondary" onClick={() => setEditMode(false)}>
                Cancelar
              </Button>
            </div>
          ) : (
            <Button variant="contained" color="primary" onClick={() => setEditMode(true)}>
              Editar
            </Button>
          )}
          <Button onClick={onClose} style={{ marginTop: '10px' }}>Cerrar</Button>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </Container>
  );
};

export default UserProfile;
