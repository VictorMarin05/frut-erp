import { useState } from 'react'
import { Header } from './components/Header'
import { Login } from './components/Login'
import { RutaActiva } from './pages/RutaActiva'

function App() {
  const [usuario, setUsuario] = useState(null);

  if (!usuario) {
    return <Login alAutenticar={setUsuario} />;
  }

  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center">
      <Header usuario={usuario} alCerrarSesion={() => setUsuario(null)} />
      
      <main className="w-full flex justify-center">
        {/* 2. CORRECCIÓN: Usamos el rol exacto 'conductor' que envía Login.jsx */}
        {usuario.rol === 'conductor' ? <RutaActiva /> : <p className="mt-10 font-bold text-gray-400">Panel de Admin</p>}
      </main>
    </div>
  )
}

export default App