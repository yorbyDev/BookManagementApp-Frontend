/**
 * @page Register
 * @description Orquestador del registro de usuarios. 
 * Gestiona el estado del formulario, la comunicación con el backend 
 * y la redirección al login tras un registro exitoso.
 */

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../api/userService';
import RegisterForm from '../components/RegisterForm';

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await registerUser(formData);
      alert("¡Cuenta creada con éxito! Ahora puedes iniciar sesión.");
      navigate('/login');
    } catch (error) {
      console.error("Error en registro:", error);
      alert("No se pudo crear la cuenta. Es posible que el correo ya esté registrado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-2">Crear Cuenta</h2>
        <p className="text-center text-slate-500 mb-8">Únete a la red de bibliotecas.</p>
        
        <RegisterForm 
          formData={formData} 
          setFormData={setFormData} 
          onSubmit={handleSubmit}
          loading={loading}
        />

        <p className="mt-6 text-center text-sm text-slate-600">
          ¿Ya tienes cuenta? <Link to="/login" className="text-blue-600 font-bold hover:underline">Inicia sesión aquí</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;