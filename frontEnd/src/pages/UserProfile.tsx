import React, { useEffect, useState } from 'react';
import { fetchUserProfile, updateUserProfile, UserProfileUpdate } from '../api/userApi';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import '../styles/UserProfile.css';

interface UserProfile {
  id: number;
  username: string;
  email: string;
  userpassword?: string; // Opcional, puede ser undefined
}

interface UserProfileProps {
  userId: number;
  onClose: () => void;
}

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
          setPassword(''); // Inicialmente no mostramos la contraseña
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
        name,
        password: password || undefined // Usa 'password' en lugar de 'userpassword'
      };

      await updateUserProfile(userId, updatedProfile);
      setProfile(prevProfile => ({
        ...prevProfile!,
        username: name,
        email,
        userpassword: password || prevProfile?.userpassword // Solo actualiza la contraseña si está definida
      }));
      setEditMode(false);
      setError(null);
    } catch (error) {
      setError('Error updating profile');
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="user-profile-container fade-in">
      <h1>Perfil de Usuario</h1>
      {profile ? (
        <div>
          <div className="field-container">
            <strong className="field-label">Nombre de Usuario:</strong>
            {editMode ? (
              <TextField
                label="Nombre de Usuario"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                margin="normal"
                InputProps={{ readOnly: !editMode }}
                className="fade-in"
              />
            ) : (
              <div className="field-value">{profile.username}</div>
            )}
          </div>
          <div className="field-container">
            <strong className="field-label">Email:</strong>
            {editMode ? (
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                margin="normal"
                className="fade-in"
              />
            ) : (
              <div className="field-value">{profile.email}</div>
            )}
          </div>
          <div className="field-container">
            <strong className="field-label">Contraseña:</strong>
            {editMode ? (
              <div className="edit-container">
                <TextField
                  label="Contraseña"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                  margin="normal"
                  className="fade-in"
                />
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" className="icon-button">
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </div>
            ) : (
              <div className="field-value">
                {profile.userpassword ? '******' : 'No definida'}
              </div>
            )}
          </div>
          {editMode && (
            <div className="field-container">
              <strong className="field-label">Confirmar Contraseña:</strong>
              <div className="edit-container">
                <TextField
                  label="Confirmar Contraseña"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  fullWidth
                  margin="normal"
                  className="fade-in"
                />
                <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end" className="icon-button">
                  {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </div>
            </div>
          )}
          {error && <p className="error-message">{error}</p>}
          <div className="edit-buttons">
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
          </div>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
      <Button onClick={onClose} style={{ marginTop: '10px' }}>Cerrar</Button>
    </div>
  );
};

export default UserProfile;
