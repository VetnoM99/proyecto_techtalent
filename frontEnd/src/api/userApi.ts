// src/api/userApi.ts

const API_BASE_URL = 'http://localhost:8080'; // Cambia esto según la configuración de tu API

// Obtener el perfil del usuario
export const fetchUserProfile = async (userId: number) => {
  const response = await fetch(`${API_BASE_URL}/users/${userId}`);
  if (!response.ok) {
    throw new Error('Error fetching user profile');
  }
  return response.json();
};

// Actualizar el perfil del usuario
export interface UserProfileUpdate {
  email: string;
  name?: string;
  password?: string; // Utiliza 'password' en lugar de 'userpassword'
}

// Actualizar el perfil del usuario
export const updateUserProfile = async (userId: number, profile: UserProfileUpdate) => {
  const response = await fetch(`${API_BASE_URL}/users/update/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(profile),
  });
  if (!response.ok) {
    throw new Error('Error updating user profile');
  }
  return response.json();
};

// Login
export const loginUser = async (username: string, password: string) => {
  const response = await fetch(`${API_BASE_URL}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error logging in: ${errorText}`);
  }

  return response.json(); // Devuelve el JSON de la respuesta
};
