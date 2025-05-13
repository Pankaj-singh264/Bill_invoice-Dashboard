import React, { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';

const AppContext = createContext();

const initialState = {
  theme: 'light',
  sidebarOpen: true,
  currentUser: null,
  loading: false,
  error: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebarOpen: !state.sidebarOpen };
   
    
    case 'SET_USER':
      return { ...state, currentUser: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = {
    ...state,
    setTheme: (theme) => dispatch({ type: 'SET_THEME', payload: theme }),
    toggleSidebar: () => dispatch({ type: 'TOGGLE_SIDEBAR' }),
    addNotification: (notification) => {
      const id = Date.now();
      dispatch({ 
        type: 'ADD_NOTIFICATION', 
        payload: { ...notification, id } 
      });
      // Auto remove notification after 5 seconds
      setTimeout(() => {
        dispatch({ type: 'REMOVE_NOTIFICATION', payload: id });
      }, 9000);
    },
    setUser: (user) => dispatch({ type: 'SET_USER', payload: user }),
    setLoading: (loading) => dispatch({ type: 'SET_LOADING', payload: loading }),
    setError: (error) => dispatch({ type: 'SET_ERROR', payload: error })
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export default AppContext; 