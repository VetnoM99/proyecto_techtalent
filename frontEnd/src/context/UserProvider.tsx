import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface User {
  username: string;
  id: number;
}

interface UserContextProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUserName = localStorage.getItem('username');
    const storedUserId = localStorage.getItem('userId');
    
    if (storedUserName && storedUserId) {
      setUser({ username: storedUserName, id: Number(storedUserId) });
    }
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
