const BooksHeader = ({ isAdmin, onAddClick }) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Catálogo de Libros</h1>
        <p className="text-slate-500 mt-1">Gestiona los títulos de la biblioteca.</p>
      </div>

      {isAdmin && (
        <button 
          onClick={onAddClick}
          className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95"
        >
          + Registrar Libro
        </button>
      )}
    </div>
  );
};

export default BooksHeader;