import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function RutaProtegida({ children, rolesRequeridos = [] }) {
  const { usuario, estaAutenticado, cargando } = useAuth();

  if (cargando) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700 mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!estaAutenticado) {
    return <Navigate to="/login" replace />;
  }

  // Si se especifican roles requeridos, verificar que el usuario tenga uno
  if (rolesRequeridos.length > 0 && !rolesRequeridos.includes(usuario?.rol)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-3xl font-black text-gray-900 mb-4">❌ Acceso Denegado</h1>
          <p className="text-gray-600 mb-6">No tienes permiso para acceder a esta página</p>
          <a href="/" className="inline-block px-6 py-3 bg-green-700 text-white rounded-xl font-bold hover:bg-green-800 transition-colors">
            Volver al inicio
          </a>
        </div>
      </div>
    );
  }

  return children;
}
