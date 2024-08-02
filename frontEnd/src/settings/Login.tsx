import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { loginUser } from '../api/userApi';

interface LoginDialogProps {
  open: boolean;
  onClose: () => void;
  onLoginSuccess: (username: string, id: number, token: string, refreshToken: string, saldo: number) => void;
}

const LoginDialog: React.FC<LoginDialogProps> = ({ open, onClose, onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    if (!username || !password) {
      setError('Por favor, completa todos los campos.');
      return;
    }
  
    try {
      const response = await loginUser(username, password);
      const { token, refreshToken, userId, saldo, message } = response;
  
      if (token && refreshToken && userId !== undefined) {
        localStorage.setItem('authToken', token);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('userId', userId.toString());
        localStorage.setItem('username', username);
        if (saldo !== undefined) {
          localStorage.setItem('userSaldo', saldo.toString());
        }
        onLoginSuccess(username, userId, token, refreshToken, saldo || 0);
        setError(null);
      } else {
        throw new Error('Datos incompletos en la respuesta del servidor');
      }
    } catch (error) {
      console.error("Login error:", error);
      setError('Error al iniciar sesión. Por favor, verifica tus credenciales.');
    }
  };
  

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Iniciar sesión</DialogTitle>
      <DialogContent>
        <TextField autoFocus margin="dense" label="Nombre de usuario" type="text" fullWidth variant="standard" value={username} onChange={(e) => setUsername(e.target.value)} />
        <TextField margin="dense" label="Contraseña" type="password" fullWidth variant="standard" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleLogin}>Iniciar sesión</Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginDialog;
