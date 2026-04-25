import { createContext, useState, useEffect } from 'react';
import api from '../api/axios';

// 1. Creamos el contexto vacío
export const AuthContext = createContext();

// 2. Creamos el Proveedor (Provider)
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Al cargar la app, verificamos si hay un token guardado
    const checkUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // Opcional: Llamada a tu endpoint /users/me para validar token
          // const res = await api.get('/users/me');
          // setUser(res.data);
          setUser({ loggedIn: true }); // Por ahora marcamos como logueado
        } catch (error) {
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };
    checkUser();
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    setUser({ loggedIn: true });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};