/**
 * @function login
 * @param {string} token - JWT generado por FastAPI.
 * @param {Object} userData - Información del usuario (username, es_admin).
 */

import { createContext, useState, useEffect } from 'react';
import api from '../api/axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // 1. Inicializamos los estados leyendo el localStorage
  // Esto evita que el usuario se desloguee al presionar F5
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');

      if (storedToken && storedUser) {
        try {
          // Aquí podrías validar el token con tu backend si quisieras
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
        } catch (error) {
          logout(); // Si hay error, limpiamos todo
        }
      }
      setLoading(false);
    };
    checkUser();
  }, []);

  // 2. Función de Login corregida
  const login = (newToken, userData) => {
    try {
      // Seteamos los estados de React
      setToken(newToken);
      setUser(userData);

      // Guardamos en el almacenamiento local
      localStorage.setItem('token', newToken);
      localStorage.setItem('user', JSON.stringify(userData));

    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  return (
    // 3. Pasamos 'token' en el value por si lo necesitas en otros componentes
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};