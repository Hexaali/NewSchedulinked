"use client"
import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          // Trim whitespace and check if string is not empty
          const trimmed = storedUser.trim();
          if (trimmed) {
            setUser(JSON.parse(trimmed));
          } else {
            console.warn('Empty user data in localStorage');
            localStorage.removeItem('user'); // Clean up invalid data
          }
        } catch (error) {
          console.error('Error parsing user data from localStorage:', error);
          localStorage.removeItem('user'); // Clean up invalid data
        }
      }
    }
  }, []);

  const updateUser = (newUser) => {
    setUser(newUser);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('user', JSON.stringify(newUser));
      } catch (error) {
        console.error('Error saving user data to localStorage:', error);
      }
    }
  };

  const clearUser = () => {
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
    }
  };

  return (
    <UserContext.Provider value={{ user, updateUser, clearUser }}>
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