// AuthContext.js

import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  //new
  const [token, setToken] = useState(() => {
    return localStorage.getItem('token');
 });

  useEffect(() => {
    // On component mount, we check if we have a token in localStorage
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, [token]);

  const login = (token) => {
    localStorage.setItem("token", token);    
    setToken(token); //new
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null); //new
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};