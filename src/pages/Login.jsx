import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { login as loginService } from '../api/authService';
import { useNavigate, Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm'; // Importamos la vista

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginService(username, password);
      
      if (data.access_token && data.user) {
        login(data.access_token, data.user); 
        navigate('/dashboard');
      } else {
        alert("Error: La respuesta del servidor es incompleta.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert('Error: Credenciales inválidas');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-8">Iniciar Sesión</h2>
        
        {/* Renderizamos el formulario pasando las props necesarias */}
        <LoginForm 
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          onSubmit={handleSubmit}
        />

        <p className="mt-6 text-center text-xs text-slate-400">
          Acceso restringido a personal autorizado de la biblioteca.
        </p>
        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <p className="text-slate-600 text-sm">
            ¿No tienes una cuenta?{' '}
            <Link 
              to="/register" 
              className="text-blue-600 font-bold hover:text-blue-700 hover:underline transition-all"
            >
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;