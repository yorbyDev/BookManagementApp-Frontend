import api from './axios';

export const getBooks = async () => {
  const response = await api.get('/libros/listar-todos'); // Ajusta a tu endpoint real (ej. /libros)
  return response.data;
};