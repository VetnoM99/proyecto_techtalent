import React, { useEffect, useState } from 'react';
import { fetchUserProfile, updateUserProfile, UserProfileUpdate } from '../api/userApi';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { styled } from '@mui/material/styles';
import { useUser } from '../context/UserProvider';
import { Box, Button, TextField } from '@mui/material';

// Interfaz para el perfil de usuario
interface UserProfile {
  id: number;
  username: string;
  email: string;
  userpassword?: string;
}

interface UserProfileProps {
  userId: number;
  onClose: () => void;
}

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
  const { user, setUser } = useUser();
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
    const getUserProfile = async () => {
      try {
        const profileData = await fetchUserProfile(userId);
        setProfile(profileData);
        setEmail(profileData.email);
        setName(profileData.username);
        // Solo establecer la contraseña si está en modo edición
        if (editMode) {
          setPassword(profileData.userpassword); // Inicialmente vacío en modo solo lectura
        }
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      }
    };

    getUserProfile();
  }, [userId, editMode]); // Ejecutar cuando cambie el userId o editMode

  const handleSave = async () => {
    try {
      if (!profile) return;

      // Solo actualizar la contraseña si se ha cambiado
      const updatedProfile: UserProfileUpdate = {
        username: name,
        email,
        ...(password && { userpassword: password }), // Solo añade la contraseña si se ha cambiado
      };

      if (password && password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }

      await updateUserProfile(userId, updatedProfile);
      setProfile(prev => prev ? { ...prev, ...updatedProfile } : null);
      setUser(prev => prev ? { ...prev, ...updatedProfile } : null);
      setEditMode(false);
      setError(null);
    } catch (error) {
      console.error('Failed to update user profile:', error);
      setError('Failed to update user profile');
    }
  };

  return (
    <Container>
      <h2>User Profile</h2>
      <FieldContainer>
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          disabled={!editMode}
        />
      </FieldContainer>
      <FieldContainer>
        <TextField
          label="Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          disabled={!editMode}
        />
      </FieldContainer>
      <FieldContainer>
        <TextField
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={editMode ? password : '********'} // Mostrar contraseña censurada si no está en edición
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          disabled={!editMode}
          InputProps={{
            endAdornment: (
              <IconButton onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            ),
          }}
        />
      </FieldContainer>
      {editMode && (
        <FieldContainer>
          <TextField
            label="Confirm Password"
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              ),
            }}
          />
        </FieldContainer>
      )}
      <Box mt={2} display="flex" justifyContent="space-between">
        <Button variant="contained" color="primary" onClick={() => setEditMode(!editMode)}>
          {editMode ? 'Cancel' : 'Edit'}
        </Button>
        {editMode && (
          <Button variant="contained" color="secondary" onClick={handleSave}>
            Save
          </Button>
        )}
      </Box>
      {error && <HiddenText>{error}</HiddenText>}
    </Container>
  );
};

export default UserProfile;