import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import axios from 'axios';
interface User {
  username: string;
  id: number;
  saldo?: number; // Hacer que el saldo sea opcional
}

interface UserContextProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUserName = localStorage.getItem('username');
      const storedUserId = localStorage.getItem('userId');
      
      if (storedUserName && storedUserId) {
        try {
          const response = await axios.get(`http://localhost:8080/users/${storedUserId}`);
          const userData = response.data;
          setUser({ username: storedUserName, id: Number(storedUserId), saldo: userData.saldo });
          localStorage.setItem('userSaldo', userData.saldo.toString()); // Actualizar el saldo en el almacenamiento local
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
  
    fetchUserData();
  }, []);
  

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
