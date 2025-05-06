<<<<<<< HEAD
=======

// import axios from 'axios';
// import React, { createContext, useState, useEffect, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';

// // API Configuration
// const API_URL = 'http://localhost:5000/api/user';

// // Configure axios defaults
// axios.defaults.headers.post['Content-Type'] = 'application/json';

// // Create axios instance with authentication
// export const authAxios = axios.create();

// // Add interceptor to add token to requests
// authAxios.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Authentication service functions
// const AuthService = {
//   // Register a new user
//   register: async (userData) => {
//     // Check if userData is FormData (for multipart/form-data with files)
//     const isFormData = userData instanceof FormData;
    
//     // Set proper headers for FormData
//     const config = {
//       headers: isFormData 
//         ? { 'Content-Type': 'multipart/form-data' }
//         : { 'Content-Type': 'application/json' }
//     };
    
//     const response = await axios.post(`${API_URL}/register`, userData, config);
    
//     if (response.data.token) {
//       localStorage.setItem('token', response.data.token);
//       localStorage.setItem('user', JSON.stringify(response.data.user || response.data));
//     }
//     return response.data;
//   },
  
//   // Login user
//   login: async (companyEmail, password) => {
//     const response = await axios.post(`${API_URL}/login`, { companyEmail, password });
//     if (response.data.token) {
//       localStorage.setItem('token', response.data.token);
//       localStorage.setItem('user', JSON.stringify(response.data.user || response.data));
//     }
//     return response.data;
//   },
  
//   // Logout user
//   logout: () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//   },
  
//   // Get current user
//   getCurrentUser: () => {
//     const userStr = localStorage.getItem('user');
//     if (userStr) return JSON.parse(userStr);
//     return null;
//   },
  
//   // Check if user is logged in
//   isAuthenticated: () => {
//     return localStorage.getItem('token') !== null;
//   },
  
//   // Get user profile
//   getUserProfile: async () => {
//     const response = await authAxios.get(`${API_URL}/profile`);
//     return response.data;
//   },
  
//   // Update user profile
//   updateProfile: async (userData) => {
//     // Check if userData is FormData (for multipart/form-data with files)
//     const isFormData = userData instanceof FormData;
    
//     // Set proper headers for FormData
//     const config = {
//       headers: isFormData 
//         ? { 'Content-Type': 'multipart/form-data' }
//         : { 'Content-Type': 'application/json' }
//     };
    
//     const response = await authAxios.put(`${API_URL}/profile`, userData, config);
    
//     // Update local storage with new user data if returned
//     if (response.data.user) {
//       const currentUser = AuthService.getCurrentUser();
//       const updatedUser = { ...currentUser, ...response.data.user };
//       localStorage.setItem('user', JSON.stringify(updatedUser));
//     }
    
//     return response.data;
//   }
// };

// // Create auth context
// const AuthContext = createContext();

// // Auth provider component
// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
  
//   // Check if user is already logged in on component mount
//   useEffect(() => {
//     const initAuth = () => {
//       const user = AuthService.getCurrentUser();
//       if (user) {
//         setCurrentUser(user);
//       }
//       setLoading(false);
//     };
//     initAuth();
//   }, []);
  
//   // Login function
//   const login = async (email, password) => {
//     try {
//       const response = await AuthService.login(email, password);
//       const user = response.user || response;
//       setCurrentUser(user);
//       return response;
//     } catch (error) {
//       console.error("Login error:", error);
//       throw error;
//     }
//   };
  
//   // Register function
//   const register = async (userData) => {
//     try {
//       const response = await AuthService.register(userData);
//       const user = response.user || response;
//       setCurrentUser(user);
//       return response;
//     } catch (error) {
//       console.error("Registration error:", error);
//       throw error;
//     }
//   };
  
//   // Update profile function
//   const updateProfile = async (userData) => {
//     try {
//       const response = await AuthService.updateProfile(userData);
//       const updatedUser = response.user || response;
//       setCurrentUser(prev => ({ ...prev, ...updatedUser }));
//       return response;
//     } catch (error) {
//       console.error("Profile update error:", error);
//       throw error;
//     }
//   };
  
//   // Logout function
//   const logout = () => {
//     AuthService.logout();
//     setCurrentUser(null);
//     navigate('/login');
//   };
  
//   // Context value
//   const value = {
//     currentUser,
//     isAuthenticated: !!currentUser,
//     login,
//     register,
//     logout,
//     updateProfile,
//     loading
//   };
  
//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };

// // Custom hook to use auth context
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// // Export AuthService for direct use
// export { AuthService };

// // Export AuthContext as default
// export default AuthContext;





>>>>>>> 381d956219014ba0118730d67358c36bf5ceb3a5
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
<<<<<<< HEAD
    const response = await axios.post(`${API_URL}/register`, userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
=======
    // Check if userData is FormData (for multipart/form-data with files)
    const isFormData = userData instanceof FormData;
    
    // Set proper headers for FormData
    const config = {
      headers: isFormData 
        ? { 'Content-Type': 'multipart/form-data' }
        : { 'Content-Type': 'application/json' }
    };
    
    const response = await axios.post(`${API_URL}/register`, userData, config);
    
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user || response.data));
>>>>>>> 381d956219014ba0118730d67358c36bf5ceb3a5
    }
    return response.data;
  },
  
  // Login user
<<<<<<< HEAD
  login: async (email, password) => {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
=======
  login: async (companyEmail, password) => {
    const response = await axios.post(`${API_URL}/login`, { companyEmail, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user || response.data));
>>>>>>> 381d956219014ba0118730d67358c36bf5ceb3a5
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
<<<<<<< HEAD
    return response.data;
  }
=======
    // Update local storage with complete profile data
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  },
  
  // Update user profile
  updateProfile: async (userData) => {
    // Check if userData is FormData (for multipart/form-data with files)
    const isFormData = userData instanceof FormData;
    
    // Set proper headers for FormData
    const config = {
      headers: isFormData 
        ? { 'Content-Type': 'multipart/form-data' }
        : { 'Content-Type': 'application/json' }
    };
    
    const response = await authAxios.put(`${API_URL}/update`, userData, config);
    
    // Update local storage with new user data
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    
    return response.data;
  },

>>>>>>> 381d956219014ba0118730d67358c36bf5ceb3a5
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
<<<<<<< HEAD
    const initAuth = () => {
      const user = AuthService.getCurrentUser();
      console.log('User from localStorage:', user);
      if (user) {
        setCurrentUser(user);
=======
    const initAuth = async () => {
      const user = AuthService.getCurrentUser();
      if (user) {
        // Initially set the user from local storage to prevent delays
        setCurrentUser(user);
        
        // Only fetch fresh data if needed (e.g., if we have minimal data)
        if (Object.keys(user).length <= 2) {
          try {
            // Get fresh user data from backend
            console.log("Fetching fresh user data during initialization");
            const freshUserData = await AuthService.getUserProfile();
            setCurrentUser(freshUserData);
          } catch (error) {
            console.error("Error fetching fresh user data:", error);
            // Already using fallback data from above
          }
        }
>>>>>>> 381d956219014ba0118730d67358c36bf5ceb3a5
      }
      setLoading(false);
    };
    initAuth();
  }, []);
  
  // Login function
  const login = async (email, password) => {
<<<<<<< HEAD
    const user = await AuthService.login(email, password);
    setCurrentUser(user);
    return user;
=======
    try {
      const response = await AuthService.login(email, password);
      // Get complete user data after login
      const fullProfileData = await AuthService.getUserProfile();
      setCurrentUser(fullProfileData);
      return response;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
>>>>>>> 381d956219014ba0118730d67358c36bf5ceb3a5
  };
  
  // Register function
  const register = async (userData) => {
<<<<<<< HEAD
    const user = await AuthService.register(userData);
    setCurrentUser(user);
    return user;
=======
    try {
      const response = await AuthService.register(userData);
      // Get complete user data after registration
      const fullProfileData = await AuthService.getUserProfile();
      setCurrentUser(fullProfileData);
      return response;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };
  
  // Update profile function
  const updateProfile = async (userData) => {
    try {
      const response = await AuthService.updateProfile(userData);
      setCurrentUser(response);
      return response;
    } catch (error) {
      console.error("Profile update error:", error);
      throw error;
    }
  };
  
  // Refresh user data function with throttling
  const [isRefreshing, setIsRefreshing] = useState(false);
  const refreshUserData = async () => {
    // Prevent multiple simultaneous refresh calls
    if (isRefreshing) {
      console.log("Already refreshing user data, skipping duplicate request");
      return currentUser;
    }
    
    try {
      setIsRefreshing(true);
      console.log("Refreshing user data from server");
      const freshUserData = await AuthService.getUserProfile();
      setCurrentUser(freshUserData);
      return freshUserData;
    } catch (error) {
      console.error("Error refreshing user data:", error);
      throw error;
    } finally {
      setIsRefreshing(false);
    }
>>>>>>> 381d956219014ba0118730d67358c36bf5ceb3a5
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
<<<<<<< HEAD
    loading
=======
    updateProfile,
    refreshUserData,
    loading,
>>>>>>> 381d956219014ba0118730d67358c36bf5ceb3a5
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