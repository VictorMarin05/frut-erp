import { useState } from 'react';

/**
 * Componente de login.
 * Props:
 * - alAutenticar({ rol, nombre }): callback al autenticar correctamente.
 */
export function Login({ alAutenticar }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [vibrarEmail, setVibrarEmail] = useState(false);
  const [vibrarPassword, setVibrarPassword] = useState(false);

  const activarVibracion = (setVibrar) => {
    setVibrar(false);
    setTimeout(() => {
      setVibrar(true);
    }, 10);
    setTimeout(() => {
      setVibrar(false);
    }, 400);
  };

  const manejarLogin = (e) => {
    e.preventDefault();

    const emailValido = email.trim() === 'conductor@fruterp.com';
    const passwordValido = password === '1234';

    // Limpiar errores previos
    setErrorEmail(false);
    setErrorPassword(false);

    // Validar email
    if (!emailValido) {
      setErrorEmail(true);
      activarVibracion(setVibrarEmail);
    }

    // Validar contraseña
    if (!passwordValido && emailValido) {
      setErrorPassword(true);
      activarVibracion(setVibrarPassword);
    }

    // Si ambos son válidos, autenticar
    if (emailValido && passwordValido) {
      alAutenticar({ rol: 'conductor', nombre: 'Carlos Conductor' });
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 md:bg-white font-sans">
      
      {/* Panel de marca */}
      <div className="hidden md:flex w-1/2 h-screen bg-green-700 items-center justify-center p-12 text-white">
        <div className="max-w-md text-center">
          <h1 className="text-6xl font-black mb-4 italic tracking-tighter">Frut-ERP</h1>
          <p className="text-xl opacity-80 font-medium italic">Logística agrícola con fricción cero.</p>
        </div>
      </div>

      {/* Contenedor del formulario */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <form 
          onSubmit={manejarLogin}
          noValidate
          className="w-full max-w-sm bg-white p-10 rounded-[2.5rem] shadow-2xl md:shadow-none"
        >
          <div className="mb-10">
            <h2 className="text-4xl font-black text-gray-900 tracking-tight">Bienvenido</h2>
            <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest mt-1">Acceso al Sistema</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 ml-1">Email Corporativo</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => { setEmail(e.target.value); setErrorEmail(false); }}
                className={`w-full p-4 rounded-xl border-2 transition-all outline-none font-medium ${
                  errorEmail ? 'border-red-500 bg-red-50' : 'border-gray-100 focus:border-green-600 bg-gray-50'
                } ${vibrarEmail ? 'animate-vibrate' : ''}`}
                placeholder="conductor@fruterp.com"
              />
              {errorEmail && <p className="text-red-600 text-[10px] font-black mt-2 ml-1">⚠️ Email no coincide con nuestros registros.</p>}
            </div>

            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 ml-1">Contraseña</label>
              <div className={`relative ${vibrarPassword ? 'animate-vibrate' : ''}`}>
                <input 
                  type={mostrarPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setErrorPassword(false); }}
                  className={`w-full p-4 rounded-xl border-2 outline-none focus:border-green-600 transition-all font-medium pr-12 ${
                    errorPassword ? 'border-red-500 bg-red-50' : 'border-gray-100 bg-gray-50'
                  }`}
                  placeholder="••••••••"
                />
                <button 
                  type="button"
                  onClick={() => setMostrarPassword(!mostrarPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-600 transition-colors cursor-pointer text-xl"
                >
                  {mostrarPassword ? "👁️" : "🙈"}
                </button>
              </div>
              {errorPassword && <p className="text-red-600 text-[10px] font-black mt-2 ml-1">⚠️ Contraseña incorrecta.</p>}
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