import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

interface RegisterFormProps {
  open: boolean;
  onClose: () => void;
  onRegisterSuccess: (username: string) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ open, onClose, onRegisterSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setMessage('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`,
      });

      if (response.ok) {
        setMessage('Registro exitoso');
        onRegisterSuccess(username);
        onClose();
      } else if (response.status === 400) {
        setMessage('El usuario ya existe');
      } else {
        setMessage('Error en el servidor');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error al registrar');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle className="dialog-title">Registrar</DialogTitle>
      <DialogContent className="dialog-content">
        <TextField
          className="input-field"
          margin="dense"
          id="username"
          label="Usuario"
          type="text"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          className="input-field"
          margin="dense"
          id="password"
          label="Contraseña"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          className="input-field"
          margin="dense"
          id="confirmPassword"
          label="Confirmar Contraseña"
          type="password"
          fullWidth
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {message && <p className="error-message">{message}</p>}
      </DialogContent>
      <DialogActions className="dialog-actions">
        <Button className="button" onClick={onClose}>
          Cancelar
        </Button>
        <Button className="button" onClick={handleRegister}>
          Registrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RegisterForm;
