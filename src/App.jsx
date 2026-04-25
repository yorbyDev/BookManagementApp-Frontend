import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import ProtectedRoute from './context/ProtectedRoute';
import Layout from './components/Layout';
import Books from './pages/Books';
import Register from './pages/Register';

// Componente temporal para probar que la redirección funciona
const Dashboard = () => (
  <div className="p-8">
    <h1 className="text-2xl font-bold text-slate-800">Bienvenido a la Biblioteca</h1>
    <p className="text-slate-600">Este es un espacio protegido.</p>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta Pública */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas Protegidas (Solo accesibles con Token) */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/books" element={<Books />} />
          </Route>
        </Route>

        {/* Redirección por defecto: si no conoce la ruta, va al login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;