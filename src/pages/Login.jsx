import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { login as loginService } from '../api/authService'; // Lo crearemos en el siguiente paso

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 1. Llamamos al servicio que habla con FastAPI
      const data = await loginService(username, password);
      
      // 2. Usamos la función global del contexto para guardar el token
      login(data.access_token);
      
      alert('¡Bienvenido al Sistema de Biblioteca!');
    } catch (error) {
      alert('Error: Credenciales inválidas');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-100 to-slate-200 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-8">Iniciar Sesión</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Usuario</label>
            <input 
              type="text" 
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500 transition-all"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Contraseña</label>
            <input 
              type="password" 
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500 transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95"
          >
            Entrar al Sistema
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;