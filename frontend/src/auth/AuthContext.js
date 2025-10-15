import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('jwt') || '');

  const login = jwt => {
    localStorage.setItem('jwt', jwt);
    setToken(jwt);
  };
  const logout = () => {
    localStorage.removeItem('jwt');
    setToken('');
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
