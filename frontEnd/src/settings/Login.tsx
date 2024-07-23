import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { loginUser } from '../api/userApi'; // Asegúrate de que esta importación sea correcta

interface LoginDialogProps {
  open: boolean;
  onClose: () => void;
  onLoginSuccess: (username: string, id: number) => void;
}

const LoginDialog: React.FC<LoginDialogProps> = ({ open, onClose, onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await loginUser(username, password);
      // Supongamos que la respuesta es un objeto JSON
      const { token, userId } = response;

      // Guarda el token, el ID de usuario y el nombre de usuario en localStorage
      localStorage.setItem('authToken', token);
      localStorage.setItem('userId', userId.toString());
      localStorage.setItem('username', username);

      // Maneja el éxito del inicio de sesión
      onLoginSuccess(username, userId);
    } catch (error) {
      console.error("Login error:", error);
      // Manejar el error de manera apropiada aquí (por ejemplo, mostrar un mensaje de error al usuario)
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Iniciar sesión</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Nombre de usuario"
          type="text"
          fullWidth
          variant="standard"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Contraseña"
          type="password"
          fullWidth
          variant="standard"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleLogin}>Iniciar sesión</Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginDialog;
