import { useEffect, useState, useContext } from 'react';
import { getBooks } from '../api/bookService';
import { requestLoan } from '../api/loanService';
import { AuthContext } from '../context/AuthContext';
import AddBookModal from '../components/AddBookModal';
import BookCard from '../components/BookCard'; // Nuevo
import BooksHeader from '../components/BooksHeader'; // Nuevo

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
      console.error("Error al cargar libros:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoan = async (libroId) => {
    try {
      const data = await requestLoan(libroId);
      alert(`¡Éxito! Devolver el: ${data.devolver_en}`);
      fetchBooks(); 
    } catch (error) {
      alert("No se pudo procesar el préstamo.");
    }
  };

  useEffect(() => { fetchBooks(); }, []);

  if (loading) return <div className="text-center p-10 text-slate-500">Cargando catálogo...</div>;

  return (
    <div className="space-y-8">
      <BooksHeader 
        isAdmin={user?.es_admin} 
        onAddClick={() => setShowModal(true)} 
      />

      {books.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300 text-slate-500">
          No hay libros disponibles.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <BookCard key={book.id} book={book} onLoan={handleLoan} />
          ))}
        </div>
      )}

      <AddBookModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        onRefresh={fetchBooks} 
      />
    </div>
  );
};

export default Books;