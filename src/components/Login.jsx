import { useState } from 'react';

export function Login({ alAutenticar }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);
  const [vibrar, setVibrar] = useState(false);

  const manejarLogin = (e) => {
    e.preventDefault();
    
    // Simulación de validación asíncrona [cite: 18]
    if (email !== 'conductor@fruterp.com') {
      setError(true);
      setVibrar(true);
      // La vibración dura 500ms
      setTimeout(() => setVibrar(false), 500);
      return;
    }

    // Si es correcto, emitimos el "JWT" simulado y rol [cite: 22]
    alAutenticar({ rol: 'conductor', nombre: 'Carlos Conductor' });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 md:bg-white">
      
      {/* Diseño Split-Screen para Escritorio [cite: 13, 14] */}
      <div className="hidden md:flex w-1/2 h-screen bg-green-700 items-center justify-center p-12">
        <div className="max-w-md text-white text-center">
          <h1 className="text-5xl font-black mb-6 italic">Frut-ERP</h1>
          <p className="text-xl opacity-90 font-medium">
            Gestión inteligente para la cadena de suministro agrícola.
          </p>
        </div>
      </div>

      {/* Formulario / Tarjeta Elevada en Móvil [cite: 13, 15] */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <form 
          onSubmit={manejarLogin}
          className={`w-full max-w-sm bg-white p-8 rounded-3xl shadow-2xl md:shadow-none transition-transform ${vibrar ? 'animate-vibrate' : ''}`}
        >
          <div className="mb-8">
            <h2 className="text-3xl font-black text-gray-900">Bienvenido</h2>
            <p className="text-gray-500 font-medium">Introduce tus credenciales de acceso</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Email Corporativo</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(false); }}
                className={`w-full p-4 rounded-xl border-2 transition-all outline-none ${error ? 'border-red-500 bg-red-50' : 'border-gray-100 focus:border-green-600 bg-gray-50'}`}
                placeholder="ej: conductor@fruterp.com"
              />
              {/* Mensaje de error contextual  */}
              {error && <p className="text-red-600 text-xs font-bold mt-2">⚠️ Usuario no reconocido en el sistema.</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Contraseña</label>
              <input type="password" dclassName="w-full p-4 rounded-xl border-2 border-gray-100 bg-gray-50 outline-none focus:border-green-600" />
            </div>

            <button className="w-full bg-green-700 hover:bg-green-800 text-white font-black py-4 rounded-xl shadow-lg transition-all active:scale-95 mt-4">
              INICIAR SESIÓN
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}