const LoginForm = ({ username, setUsername, password, setPassword, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Usuario</label>
        <input 
          type="text" 
          required
          placeholder="nombre@ejemplo.com"
          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Contraseña</label>
        <input 
          type="password" 
          required
          placeholder="••••••••"
          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button 
        type="submit"
        className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95"
      >
        Entrar al Sistema
      </button>
    </form>
  );
};

export default LoginForm;