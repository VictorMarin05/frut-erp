import { useState } from 'react';

export function Login({ alAutenticar }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mostrarPassword, setMostrarPassword] = useState(false); // Estado para el ojo
  const [error, setError] = useState(false);
  const [vibrar, setVibrar] = useState(false);

  const manejarLogin = (e) => {
    e.preventDefault();
    
    // Validación asíncrona para reducir errores
    if (email !== 'conductor@fruterp.com') {
      setError(true);
      setVibrar(true);
      setTimeout(() => setVibrar(false), 500); // Duración de la vibración
      return;
    }

    // Tras el éxito, emitimos el rol para la redirección inteligente
    alAutenticar({ rol: 'conductor', nombre: 'Carlos Conductor' });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 md:bg-white font-sans">
      
      {/* Branding de Frut-ERP (Desktop) */}
      <div className="hidden md:flex w-1/2 h-screen bg-green-700 items-center justify-center p-12 text-white">
        <div className="max-w-md text-center">
          <h1 className="text-6xl font-black mb-4 italic tracking-tighter">Frut-ERP</h1>
          <p className="text-xl opacity-80 font-medium italic">Gestión de logística agrícola con fricción cero.</p>
        </div>
      </div>

      {/* Tarjeta de Autenticación (Mobile/Elevated Card) */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <form 
          onSubmit={manejarLogin}
          className={`w-full max-w-sm bg-white p-10 rounded-[2.5rem] shadow-2xl md:shadow-none transition-transform ${vibrar ? 'animate-vibrate' : ''}`}
        >
          <div className="mb-10">
            <h2 className="text-4xl font-black text-gray-900 tracking-tight">Bienvenido</h2>
            <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest mt-1">Acceso al Sistema</p>
          </div>

          <div className="space-y-6">
            {/* Input Email */}
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 ml-1">Email Corporativo</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(false); }}
                className={`w-full p-4 rounded-xl border-2 transition-all outline-none font-medium ${error ? 'border-red-500 bg-red-50' : 'border-gray-100 focus:border-green-600 bg-gray-50'}`}
                placeholder="conductor@fruterp.com"
              />
              {error && <p className="text-red-600 text-[10px] font-black mt-2 ml-1">⚠️ Credenciales no reconocidas.</p>}
            </div>

            {/* Input Password con "Ojo" */}
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 ml-1">Contraseña</label>
              <div className="relative">
                <input 
                  type={mostrarPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-4 rounded-xl border-2 border-gray-100 bg-gray-50 outline-none focus:border-green-600 transition-all font-medium pr-12"
                  placeholder="••••••••"
                />
                {/* Botón del ojo posicionado absolutamente a la derecha */}
                <button 
                  type="button"
                  onClick={() => setMostrarPassword(!mostrarPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-600 transition-colors cursor-pointer text-xl"
                >
                  {mostrarPassword ? "👁️" : "🙈"}
                </button>
              </div>
            </div>

            <button className="w-full bg-green-700 hover:bg-green-800 text-white font-black py-5 rounded-2xl shadow-xl transition-all active:scale-95 mt-4 tracking-widest">
              INICIAR SESIÓN
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}