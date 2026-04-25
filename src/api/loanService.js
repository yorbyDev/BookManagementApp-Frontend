import api from './axios';

export const requestLoan = async (libroId) => {
  // FastAPI suele esperar el ID del libro para crear el registro de préstamo
  const response = await api.post('/prestamos/', { libro_id: libroId });
  return response.data;
};