import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    console.log('AuthProvider init - token:', token);
    console.log('AuthProvider init - userData:', userData);
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        console.log('User restored from localStorage:', parsedUser);
      } catch (e) {
        console.error('Error parsing user data:', e);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    console.log('Login function called with:', email);
    setLoading(true);
    setError(null);
    
    try {
      const data = await api.login(email, password);
      console.log('Login API response:', data);
      
      if (data.success) {
        const userInfo = {
          email: data.email,
          role: data.role,
          id: data.id
        };
        setUser(userInfo);
        console.log('User set in state:', userInfo);
        return { success: true };
      } else {
        const errorMsg = data.error || 'Login failed';
        setError(errorMsg);
        return { success: false, error: errorMsg };
      }
    } catch (error) {
      console.error('Login error in AuthContext:', error);
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    api.logout();
    setUser(null);
    console.log('User logged out');
  };

  const value = {
    user,
    loading,
    error,
    login,
    logout
  };

  console.log('AuthContext value:', value);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};