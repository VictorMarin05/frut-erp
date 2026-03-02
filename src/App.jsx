import { useState } from 'react'
import { Header } from './components/Header'
import { Login } from './components/Login'
import { RutaActiva } from './pages/RutaActiva'

function App() {
  const [usuario, setUsuario] = useState(null);

  // Si no hay usuario, mostramos el Login sin el Header
  if (!usuario) {
    return <Login alAutenticar={setUsuario} />;
  }

  // Si hay usuario, mostramos la estructura principal (App Shell)
  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center">
      <Header usuario={usuario} alCerrarSesion={() => setUsuario(null)} />
      
      {/* Aquí es donde cambiarán las páginas dinámicamente */}
      <main className="w-full flex justify-center">
        {usuario.rol === 'Conductor Logístico' ? <RutaActiva /> : <p>Panel de Admin</p>}
      </main>
    </div>
  )
}

export default App