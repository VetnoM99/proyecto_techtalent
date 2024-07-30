// userApi.ts

const API_BASE_URL = 'http://localhost:8080';


export const registerUser = async (username: string, userpassword: string, email: string) => {
  const response = await fetch(`${API_BASE_URL}/users/crear`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, userpassword, email }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error registering: ${errorText}`);
  }

  return response.json();
};

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

  return response.json();
};

export const validateToken = async (token: string) => {
  const response = await fetch(`${API_BASE_URL}/users/validate-token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token }),
  });
  if (!response.ok) {
    throw new Error('Token validation failed');
  }
  return response.json();
};
export const refreshToken = async (refreshToken: string) => {
  const response = await fetch('http://localhost:8080/users/refresh-token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refreshToken }),
  });

  if (!response.ok) {
    throw new Error('Error refreshing token');
  }

  const data = await response.json();
  if (!data.token || !data.refreshToken) {
    throw new Error('Invalid response from refresh token endpoint');
  }

  return data;
};

// Asegúrate de exportar la interfaz LoginResponse
export interface LoginResponse {
  token: string;
  refreshToken: string;
  userId: number;
  message: string;
}

// Exportar fetchUserProfile si es necesario
export const fetchUserProfile = async (userId: number) => {
  const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error fetching user profile: ${errorText}`);
  }

  return response.json();
};

export const updateUserProfile = async (userId: number, updatedProfile: UserProfileUpdate) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/update/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProfile),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error updating user profile: ${errorText}`);
    }

    return response.json();
  } catch (error) {
    console.error('Update user profile error:', error);
    throw error; // Re-throw the error after logging
  }
};

// Asegúrate de definir y exportar la interfaz UserProfileUpdate
export interface UserProfileUpdate {
  email: string;
  username?: string;
  userpassword?: string;
}

