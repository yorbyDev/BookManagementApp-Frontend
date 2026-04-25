function App() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900">
      <div className="p-8 bg-white rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-emerald-400">
          Tailwind está Activo
        </h1>
        <p className="mt-4 text-gray-600 font-medium">
          Si ves este fondo oscuro, el texto con degradado y esta tarjeta centrada, 
          la configuración es correcta y portátil.
        </p>
        <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-lg shadow-blue-500/50">
          Confirmar Conexión
        </button>
      </div>
    </div>
  )
}

export default App