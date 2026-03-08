import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [vibrarEmail, setVibrarEmail] = useState(false);
  const [vibrarPassword, setVibrarPassword] = useState(false);
  const [cargando, setCargando] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const activarVibracion = (setVibrar) => {
    setVibrar(false);
    setTimeout(() => {
      setVibrar(true);
    }, 10);
    setTimeout(() => {
      setVibrar(false);
    }, 400);
  };

  const manejarLogin = async (e) => {
    e.preventDefault();
    setCargando(true);

    // Validar campos vacíos
    if (!email.trim()) {
      setErrorEmail(true);
      activarVibracion(setVibrarEmail);
      setCargando(false);
      return;
    }

    if (!password) {
      setErrorPassword(true);
      activarVibracion(setVibrarPassword);
      setCargando(false);
      return;
    }

    // Limpiar errores prev
    setErrorEmail(false);
    setErrorPassword(false);

    // Llamar al backend
    const { exito, error } = await login(email, password);

    if (exito) {
      // Redirigir según el rol
      navigate('/');
    } else {
      // Mostrar error en ambos campos
      setErrorEmail(true);
      setErrorPassword(true);
      activarVibracion(setVibrarEmail);
    }

    setCargando(false);
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
                disabled={cargando}
                className={`w-full p-4 rounded-xl border-2 transition-all outline-none font-medium ${
                  errorEmail ? 'border-red-500 bg-red-50' : 'border-gray-100 focus:border-green-600 bg-gray-50'
                } ${vibrarEmail ? 'animate-vibrate' : ''} ${cargando ? 'opacity-50 cursor-not-allowed' : ''}`}
                placeholder="conductor@fruterp.com"
              />
              {errorEmail && <p className="text-red-600 text-[10px] font-black mt-2 ml-1">⚠️ Email no válido.</p>}
            </div>

            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 ml-1">Contraseña</label>
              <div className={`relative ${vibrarPassword ? 'animate-vibrate' : ''}`}>
                <input 
                  type={mostrarPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setErrorPassword(false); }}
                  disabled={cargando}
                  className={`w-full p-4 rounded-xl border-2 outline-none focus:border-green-600 transition-all font-medium pr-12 ${
                    errorPassword ? 'border-red-500 bg-red-50' : 'border-gray-100 bg-gray-50'
                  } ${cargando ? 'opacity-50 cursor-not-allowed' : ''}`}
                  placeholder="••••••••"
                />
                <button 
                  type="button"
                  onClick={() => setMostrarPassword(!mostrarPassword)}
                  disabled={cargando}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-600 transition-colors cursor-pointer text-xl disabled:cursor-not-allowed"
                >
                  {mostrarPassword ? "👁️" : "🙈"}
                </button>
              </div>
              {errorPassword && <p className="text-red-600 text-[10px] font-black mt-2 ml-1">⚠️ Contraseña incorrecta.</p>}
            </div>

            <button 
              type="submit"
              disabled={cargando}
              className={`w-full bg-green-700 hover:bg-green-800 text-white font-black py-5 rounded-2xl shadow-xl transition-all active:scale-95 mt-4 tracking-widest disabled:opacity-50 disabled:cursor-not-allowed ${
                cargando ? 'flex items-center justify-center gap-2' : ''
              }`}
            >
              {cargando ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Iniciando sesión...
                </>
              ) : (
                'INICIAR SESIÓN'
              )}
            </button>

            {/* Credenciales de prueba */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">🔬 Usuarios de Prueba</p>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-xs font-bold text-blue-900">👤 Repartidor</p>
                  <p className="text-[11px] text-blue-700 font-mono mt-1">repartidor@fruterp.com</p>
                  <p className="text-[11px] text-blue-700 font-mono">1234</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <p className="text-xs font-bold text-purple-900">📋 Administrador</p>
                  <p className="text-[11px] text-purple-700 font-mono mt-1">admin@fruterp.com</p>
                  <p className="text-[11px] text-purple-700 font-mono">1234</p>
                </div>
                <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                  <p className="text-xs font-bold text-amber-900">👑 Superadmin</p>
                  <p className="text-[11px] text-amber-700 font-mono mt-1">superadmin@fruterp.com</p>
                  <p className="text-[11px] text-amber-700 font-mono">1234</p>
                </div>
              </div>
              <p className="text-[9px] text-gray-400 mt-3 italic">Modo desarrollo: credenciales locales sin backend</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}