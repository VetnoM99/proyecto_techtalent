import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useUser } from '../context/UserProvider';

interface RegisterFormProps {
  open: boolean;
  onClose: () => void;
  onRegisterSuccess: (username: string, id: number, token: string, refreshToken: string) => Promise<void>;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ open, onClose, onRegisterSuccess }) => {
  const { setUser } = useUser();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleRegister = async () => {
    const newErrors: { [key: string]: string } = {};

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    if (!username) {
      newErrors.username = 'El nombre de usuario es obligatorio';
    }

    if (!email) {
      newErrors.email = 'El correo electrónico es obligatorio';
    } else {
      // Verificar que el correo electrónico tenga un formato válido
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        newErrors.email = 'El correo electrónico no tiene un formato válido';
      }
    }

    // Verificar que la contraseña tenga al menos 8 caracteres, un número y un carácter especial
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres, un número y un carácter especial';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8080/users/crear', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, userpassword: password, email }),
      });

      if (response.ok) {
        const data = await response.json();
        const { id, token, refreshToken } = data;

        console.log('Register response:', data);

        // Actualiza el contexto aquí
        setUser({ username, id });

        // Guarda los tokens en el almacenamiento local
        localStorage.setItem('authToken', token);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('username', username);
        localStorage.setItem('userId', id.toString());

        console.log('Auth Token:', localStorage.getItem('authToken'));
        console.log('Refresh Token:', localStorage.getItem('refreshToken'));
        console.log('Username:', localStorage.getItem('username'));
        console.log('User ID:', localStorage.getItem('userId'));

        // Notifica éxito
        setMessage('Registro y inicio de sesión exitosos');
        await onRegisterSuccess(username, id, token, refreshToken);
        onClose();
      } else {
        const errorData = await response.text();
        setMessage('Error: ' + errorData);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error al registrar');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Registrar</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          id="username"
          label="Usuario"
          type="text"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={!!errors.username}
          helperText={errors.username}
        />
        <TextField
          margin="dense"
          id="password"
          label="Contraseña"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!errors.password}
          helperText={errors.password}
        />
        <TextField
          margin="dense"
          id="confirmPassword"
          label="Confirmar Contraseña"
          type="password"
          fullWidth
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
        />
        <TextField
          margin="dense"
          id="email"
          label="Correo Electrónico"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!errors.email}
          helperText={errors.email}
        />
        {message && <p>{message}</p>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isLoading}>Cancelar</Button>
        <Button onClick={handleRegister} disabled={isLoading}>
          {isLoading ? 'Registrando...' : 'Registrar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RegisterForm;
