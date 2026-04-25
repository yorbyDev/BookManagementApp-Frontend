import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const ProtectedRoute = () => {
  const { user, loading } = useContext(AuthContext);

  // Mientras el AuthContext verifica si hay un token en localStorage
  if (loading) return <div className="p-8 text-center">Cargando sistema...</div>;

  // Si no hay usuario (user === null), redirigimos al login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Si hay usuario, permitimos el paso a las rutas hijas (Outlet)
  return <Outlet />;
};

export default ProtectedRoute;