import React, { createContext, useReducer, useContext } from 'react';

const AppContext = createContext();

const initialState = {
  resources: [],
  loading: false,
  error: null,
  // Add more global app state as needed
};

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_RESOURCES':
      return { ...state, resources: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  return (
    <AppContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
