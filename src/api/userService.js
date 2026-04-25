import api from './axios';

export const registerUser = async (userData) => {
  // Conecta con la ruta POST /usuarios/ de tu backend
  const response = await api.post('/usuarios/', userData);
  return response.data;
};