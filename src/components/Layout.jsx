import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Outlet, Link, useNavigate } from 'react-router-dom';

const Layout = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Navbar Superior */}
      <nav className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
            B
          </div>
          <span className="text-xl font-bold text-slate-800 tracking-tight">Mi Biblioteca</span>
        </div>
        
        <div className="flex items-center gap-6">
          <Link to="/dashboard" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Inicio</Link>
          <Link to="/books" className="text-slate-600 hover:text-blue-600 font-medium">Libros</Link>
          <button 
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-all"
          >
            Cerrar Sesión
          </button>
        </div>
      </nav>

      {/* Contenido Dinámico */}
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;