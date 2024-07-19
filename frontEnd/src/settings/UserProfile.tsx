// LoginDialog.tsx
import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

interface LoginDialogProps {
  open: boolean;
  onClose: () => void;
  onLoginSuccess: (username: string) => void;
}

const LoginDialog: React.FC<LoginDialogProps> = ({ open, onClose, onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8080/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`,
      });

      if (response.ok) {
        setMessage('Login exitoso');
        onLoginSuccess(username);
        onClose();
      } else if (response.status === 401) {
        setMessage('Contraseña incorrecta');
      } else if (response.status === 404) {
        setMessage('Usuario no encontrado');
      } else {
        setMessage('Error en el servidor');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error en la conexión');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          id="username"
          label="Usuario"
          type="text"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          margin="dense"
          id="password"
          label="Contraseña"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {message && <p>{message}</p>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleLogin} color="primary">
          Iniciar sesión
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginDialog;
