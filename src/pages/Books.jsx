import { useEffect, useState, useContext } from 'react';
import { getBooks } from '../api/bookService';
import { AuthContext } from '../context/AuthContext';
import AddBookModal from '../components/AddBookModal';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  
  const { user } = useContext(AuthContext);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const data = await getBooks();
      setBooks(data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  if (loading) return <div className="text-center p-10 text-slate-500 font-medium">Cargando catálogo...</div>;

  return (
    <div className="space-y-8">
      {/* CABECERA */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Catálogo de Libros</h1>
          <p className="text-slate-500 mt-1">Gestiona los títulos de la biblioteca.</p>
        </div>

        {/* BOTÓN CONDICIONAL PARA ADMIN */}
        {user?.es_admin && (
          <button 
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95"
          >
            + Registrar Libro
          </button>
        )}
      </div>

      {/* GRID DE LIBROS */}
      {books.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
           <p className="text-slate-500 text-lg">No hay libros disponibles.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <div 
              key={book.id} 
              className="group relative bg-white p-6 rounded-2xl shadow-xs border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-blue-500 to-cyan-400 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                {book.titulo}
              </h3>
              <p className="text-slate-500 text-sm mt-1">
                por <span className="font-medium text-slate-700">{book.autor}</span>
              </p>

              <p className="text-slate-400 text-xs flex items-center gap-1 italic">
                <span className="not-italic">🏢</span> {book.editorial || 'Editorial no registrada'}
              </p>
              
              <div className="mt-6 flex items-center justify-between">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  book.disponible 
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' 
                  : 'bg-amber-50 text-amber-700 border border-amber-100'
                }`}>
                  {book.disponible ? '● Disponible' : '○ En préstamo'}
                </span>
                
                <button className="text-sm font-semibold text-blue-600 hover:text-blue-800">
                  Gestionar →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* COMPONENTE MODAL */}
      <AddBookModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        onRefresh={fetchBooks} 
      />
    </div>
  );
};

export default Books;