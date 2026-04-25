import api from './axios';

export const getBooks = async () => {
  const response = await api.get('/libros/listar-todos'); // Ajusta a tu endpoint real (ej. /libros)
  return response.data;
};

// Añade esta función al final del archivo
export const createBook = async (bookData) => {
  // Asegúrate de que '/libros' sea la ruta exacta de tu FastAPI para el POST
  const response = await api.post('/libros/', bookData);
  return response.data;
};