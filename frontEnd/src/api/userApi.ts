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
export const updateUserProfile = async (userId: number, profile: { email: string }) => {
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
  return response.json(); // Optional: Return updated user data
};

// Login
export const loginUser = async (username: string, password: string) => {
  const response = await fetch(`${API_BASE_URL}/login?username=${username}&password=${password}`, {
    method: 'POST',
  });
  if (!response.ok) {
    throw new Error('Error logging in');
  }
  return response.text(); // Assuming a text response for simplicity
};
