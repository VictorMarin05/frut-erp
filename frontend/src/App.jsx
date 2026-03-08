import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { RutaProtegida } from './components/RutaProtegida';
import { Header } from './components/Header';
import { Login } from './components/Login';
import { RutaActiva } from './pages/RutaActiva';
import { PanelAdministrador } from './pages/PanelAdministrador';
import { PanelGerencia } from './pages/PanelGerencia';

function AppContenido() {
  const { estaAutenticado, usuario } = useAuth();

  return (
    <Routes>
      {/* Login - accesible solo si NO estás autenticado */}
      <Route 
        path="/login" 
        element={estaAutenticado ? <Navigate to="/" replace /> : <Login />} 
      />

      {/* Dashboard - redirige según rol */}
      <Route 
        path="/" 
        element={
          <RutaProtegida>
            <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center">
              <Header />
              <main className="w-full flex justify-center py-6">
                {usuario?.rol === 'repartidor' && <RutaActiva />}
                {usuario?.rol === 'administrador' && <PanelAdministrador />}
                {usuario?.rol === 'superadmin' && <PanelGerencia />}
              </main>
            </div>
          </RutaProtegida>
        }
      />

      {/* Rutas específicas por rol */}
      <Route 
        path="/ruta-activa" 
        element={
          <RutaProtegida rolesRequeridos={['repartidor', 'superadmin']}>
            <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center">
              <Header />
              <main className="w-full flex justify-center py-6">
                <RutaActiva />
              </main>
            </div>
          </RutaProtegida>
        }
      />

      <Route 
        path="/administrador" 
        element={
          <RutaProtegida rolesRequeridos={['administrador', 'superadmin']}>
            <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center">
              <Header />
              <main className="w-full flex justify-center py-6">
                <PanelAdministrador />
              </main>
            </div>
          </RutaProtegida>
        }
      />

      <Route 
        path="/gerencia" 
        element={
          <RutaProtegida rolesRequeridos={['superadmin']}>
            <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center">
              <Header />
              <main className="w-full flex justify-center py-6">
                <PanelGerencia />
              </main>
            </div>
          </RutaProtegida>
        }
      />

      {/* Ruta 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContenido />
      </AuthProvider>
    </Router>
  );
}

export default App;