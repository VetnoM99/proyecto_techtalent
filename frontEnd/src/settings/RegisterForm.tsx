import React, { useState } from 'react';
import axios from 'axios';
import '../styles/RegisterForm.css';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


interface User {
  username: string;
  userpassword: string;
  email: string;
}

const RegisterForm: React.FC<{ open: boolean; onClose: () => void; onRegisterSuccess: (username: string) => void; }> = ({ open, onClose, onRegisterSuccess }) => {
  const [user, setUser] = useState<User>({
    username: '',
    userpassword: '',
    email: '',
  });

  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await axios.post('http://localhost:8080/users/crear', user);
      setMessage(`Usuario creado con éxito: ${response.data.username}`);
      onRegisterSuccess(response.data.username); // Notificar éxito
    } catch (error) {
      setMessage('Error al crear el usuario. Verifica los datos ingresados y vuelve a intentarlo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ textAlign: 'center' }}>Registro</DialogTitle>
      <DialogContent
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '400px', justifyContent: 'center' }}
      >
        <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <TextField
            label="Nombre de Usuario"
            id="username"
            name="username"
            value={user.username}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Contraseña"
            id="userpassword"
            name="userpassword"
            type="password"
            value={user.userpassword}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Correo Electrónico"
            id="email"
            name="email"
            type="email"
            value={user.email}
            onChange={handleChange}
            required
            fullWidth
          />
          <Button type="submit" disabled={loading} variant="contained" color="primary" sx={{ mt: 2, alignSelf: 'center' }}>
            {loading ? 'Registrando...' : 'Registrarse'}
          </Button>
          {message && <p className={message.includes('Error') ? 'error' : 'success'}>{message}</p>}
        </form>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center' }}>
        <Button onClick={onClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default RegisterForm;
