import api from './axios';

export const login = async (username, password) => {
  // Importante: FastAPI por defecto con OAuth2PasswordBearer 
  // espera un formato x-www-form-urlencoded
  const params = new URLSearchParams();
  params.append('username', username);
  params.append('password', password);

  const response = await api.post('/auth/login', params, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  
  return response.data; // Retorna { access_token: "...", token_type: "bearer" }
};