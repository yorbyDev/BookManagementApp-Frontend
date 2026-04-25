const BookCard = ({ book, onLoan }) => {
  return (
    <div className="group relative bg-white p-6 rounded-2xl shadow-xs border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-blue-500 to-cyan-400 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
      
      <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
        {book.titulo}
      </h3>
      <p className="text-slate-500 text-sm mt-1">
        por <span className="font-medium text-slate-700">{book.autor}</span>
      </p>

      <p className="text-slate-400 text-xs flex items-center gap-1 italic mt-1">
        <span className="not-italic">🏢</span> {book.editorial || 'Editorial no registrada'}
      </p>
      
      <div className="mt-6 flex items-center justify-between">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          book.disponible 
          ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' 
          : 'bg-amber-50 text-amber-700 border border-amber-100'
        }`}>
          {book.disponible ? '● Disponible' : '○ Prestado'}
        </span>
        
        {book.disponible ? (
          <button 
            onClick={() => onLoan(book.id)}
            className="text-sm font-bold text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors border border-transparent hover:border-blue-100"
          >
            Solicitar Préstamo →
          </button>
        ) : (
          <span className="text-xs text-slate-400 font-medium italic">
            No disponible
          </span>
        )}
      </div>
    </div>
  );
};

export default BookCard;