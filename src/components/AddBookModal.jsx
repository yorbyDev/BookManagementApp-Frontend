import { useState } from 'react';
import api from '../api/axios';
import { createBook } from '../api/bookService';

const AddBookModal = ({ isOpen, onClose, onRefresh }) => {
  const [isbn, setIsbn] = useState('');
  const [bookData, setBookData] = useState({ titulo: '', autor: '', editorial: '' });
  const [loading, setLoading] = useState(false);

  // Función para consultar tu API que a su vez consulta Open Library
  const handleSearchISBN = async () => {
    if (!isbn) return;
    setLoading(true);
    try {
      // Ajusta esta ruta a tu endpoint real de FastAPI
      const response = await api.get(`/libros/buscar-isbn/${isbn}`);
      setBookData({
        titulo: response.data.titulo,
        autor: response.data.autor,
        editorial: response.data.editorial || '',
        isbn: isbn
      });
    } catch (error) {
      alert("No se encontró el libro. Intenta ingresar los datos manualmente.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createBook(bookData);
        onRefresh(); // Recarga la lista de libros en el padre
        onClose();   // Cierra el modal
        alert("¡Libro guardado con éxito!");
    } catch (error) {
        alert("Error al guardar el libro");
    } finally {
        setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h2 className="text-xl font-bold text-slate-800">Registrar Nuevo Libro</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* BUSCADOR POR ISBN */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">ISBN</label>
            <div className="flex gap-2">
              <input 
                type="text" 
                className="flex-1 px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                value={isbn}
                onChange={(e) => setIsbn(e.target.value)}
                placeholder="Ej: 978..."
              />
              <button 
                type="button"
                onClick={handleSearchISBN}
                className="bg-slate-800 text-white px-4 py-2 rounded-xl hover:bg-slate-700 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? '...' : '🔍'}
              </button>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* CAMPOS AUTO-COMPLETADOS */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Título</label>
            <input 
              type="text" 
              required
              className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-slate-50"
              value={bookData.titulo}
              onChange={(e) => setBookData({...bookData, titulo: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Autor</label>
            <input 
              type="text" 
              required
              className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-slate-50"
              value={bookData.autor}
              onChange={(e) => setBookData({...bookData, autor: e.target.value})}
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Editorial</label>
            <input 
                type="text" 
                required
                className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-none"
                value={bookData.editorial}
                onChange={(e) => setBookData({...bookData, editorial: e.target.value})}
                placeholder="Nombre de la editorial"
                />
            </div>

          <div className="pt-4 flex gap-3">
            <button 
              type="button" 
              onClick={onClose}
              className="flex-1 py-3 rounded-xl font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancelar
            </button>
            <button 
              type="submit"
              className="flex-1 py-3 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all"
            >
              Guardar Libro
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBookModal;