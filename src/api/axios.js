import axios from 'axios';

// 1. Creamos una instancia personalizada
const api = axios.create({
  // URL base de FastAPI. 
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. Interceptor de Peticiones (Request Interceptor)
// Este código se ejecuta "entre" el momento en que se manda la petición 
// y el momento en que sale de la computadora hacia el backend.
api.interceptors.request.use(
  (config) => {
    // Buscamos el token en el almacenamiento local del navegador
    const token = localStorage.getItem('token');
    
    if (token) {
      // Si el token existe, lo inyectamos en las cabeceras HTTP
      // Esto permite que FastAPI use la dependencia OAuth2
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;