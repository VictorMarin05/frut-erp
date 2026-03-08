export function PanelAdministrador() {
  return (
    <div className="w-full max-w-6xl px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-4xl font-black text-gray-900 mb-2">📋 Panel de Administrador</h1>
        <p className="text-gray-600 mb-8">Gestiona pedidos, clientes y control de rutas</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card: Crear Pedido */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200 hover:shadow-lg transition-all cursor-pointer">
            <div className="text-4xl mb-3">📝</div>
            <h2 className="text-xl font-black text-blue-900 mb-2">Crear Pedido</h2>
            <p className="text-blue-700 text-sm">Añade nuevos pedidos al sistema para repartidores</p>
          </div>

          {/* Card: Gestionar Pedidos */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200 hover:shadow-lg transition-all cursor-pointer">
            <div className="text-4xl mb-3">📦</div>
            <h2 className="text-xl font-black text-purple-900 mb-2">Gestionar Pedidos</h2>
            <p className="text-purple-700 text-sm">Edita, cancela o modifica pedidos existentes</p>
          </div>

          {/* Card: Rutas Activas */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200 hover:shadow-lg transition-all cursor-pointer">
            <div className="text-4xl mb-3">🚗</div>
            <h2 className="text-xl font-black text-green-900 mb-2">Rutas Activas</h2>
            <p className="text-green-700 text-sm">Visualiza el estado de todas las rutas en tiempo real</p>
          </div>

          {/* Card: Mi Perfil */}
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200 hover:shadow-lg transition-all cursor-pointer">
            <div className="text-4xl mb-3">👤</div>
            <h2 className="text-xl font-black text-orange-900 mb-2">Mi Perfil</h2>
            <p className="text-orange-700 text-sm">Actualiza tu información personal</p>
          </div>

          {/* Card: Reportes */}
          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6 border border-red-200 hover:shadow-lg transition-all cursor-pointer">
            <div className="text-4xl mb-3">📊</div>
            <h2 className="text-xl font-black text-red-900 mb-2">Reportes Diarios</h2>
            <p className="text-red-700 text-sm">Genera reportes sobre entregas y problemas</p>
          </div>

          {/* Card: Ayuda */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all cursor-pointer">
            <div className="text-4xl mb-3">❓</div>
            <h2 className="text-xl font-black text-gray-900 mb-2">Ayuda y Soporte</h2>
            <p className="text-gray-700 text-sm">Consulta guías y ponte en contacto con soporte</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <p className="text-gray-600 text-sm font-semibold">Pedidos Hoy</p>
            <p className="text-3xl font-black text-blue-600 mt-2">24</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <p className="text-gray-600 text-sm font-semibold">Entregas Completadas</p>
            <p className="text-3xl font-black text-green-600 mt-2">18</p>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
            <p className="text-gray-600 text-sm font-semibold">Pendientes</p>
            <p className="text-3xl font-black text-yellow-600 mt-2">6</p>
          </div>
          <div className="bg-red-50 rounded-lg p-4 border border-red-200">
            <p className="text-gray-600 text-sm font-semibold">Problemas</p>
            <p className="text-3xl font-black text-red-600 mt-2">2</p>
          </div>
        </div>
      </div>
    </div>
  );
}
