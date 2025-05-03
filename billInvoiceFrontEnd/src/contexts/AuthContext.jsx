import axios from 'axios';
import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// API Configuration
const API_URL = 'http://localhost:5000/api/user';

// Configure axios defaults
axios.defaults.headers.post['Content-Type'] = 'application/json';

// Create axios instance with authentication
export const authAxios = axios.create();

// Add interceptor to add token to requests
authAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Authentication service functions
const AuthService = {
  // Register a new user
  register: async (userData) => {
    const response = await axios.post(`${API_URL}/register`, userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  },
  
  // Login user
  login: async (email, password) => {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  },
  
  // Logout user
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  
  // Get current user
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    return null;
  },
  
  // Check if user is logged in
  isAuthenticated: () => {
    return localStorage.getItem('token') !== null;
  },
  
  // Get user profile
  getUserProfile: async () => {
    const response = await authAxios.get(`${API_URL}/profile`);
    return response.data;
  }
};

// Create auth context
const AuthContext = createContext();

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  // Check if user is already logged in on component mount
  useEffect(() => {
    const initAuth = () => {
      const user = AuthService.getCurrentUser();
      console.log('User from localStorage:', user);
      if (user) {
        setCurrentUser(user);
      }
      setLoading(false);
    };
    initAuth();
  }, []);
  
  // Login function
  const login = async (email, password) => {
    const user = await AuthService.login(email, password);
    setCurrentUser(user);
    return user;
  };
  
  // Register function
  const register = async (userData) => {
    const user = await AuthService.register(userData);
    setCurrentUser(user);
    return user;
  };
  
  // Logout function
  const logout = () => {
    AuthService.logout();
    setCurrentUser(null);
    navigate('/login');
  };
  
  // Context value
  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    login,
    register,
    logout,
    loading
  };
  
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Export AuthService for direct use
export { AuthService };

// Export AuthContext as default
export default AuthContext;