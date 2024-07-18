import React, { useState } from 'react';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
    <div className="app-container">
      <div className="content">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-container">
            <label htmlFor="username">Usuario: </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <label htmlFor="password">Contraseña: </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Iniciar sesión</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default Login;