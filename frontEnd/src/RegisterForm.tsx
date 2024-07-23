import React, { useState } from 'react';
import axios from 'axios';
import './RegisterForm.css';

interface User {
  username: string;
  userpassword: string;
  email: string;
}

const RegisterForm: React.FC = () => {
  const [user, setUser] = useState<User>({
    username: '',
    userpassword: '',
    email: '',
  });

  const [message, setMessage] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/users/crear', user);
      setMessage(`Usuario creado con éxito: ${response.data.username}`);
    } catch (error) {
      setMessage('Error al crear el usuario');
    }
  };

  return (
    <div className="register-form-container">
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Nombre de Usuario</label>
          <input
            type="text"
            id="username"
            name="username"
            value={user.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="userpassword">Contraseña</label>
          <input
            type="password"
            id="userpassword"
            name="userpassword"
            value={user.userpassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Registrarse</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RegisterForm;
