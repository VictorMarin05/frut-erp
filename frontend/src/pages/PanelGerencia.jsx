export function PanelGerencia() {
  return (
    <div className="w-full max-w-7xl px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-4xl font-black text-gray-900 mb-2">📊 Panel de Gerencia (Superadmin)</h1>
        <p className="text-gray-600 mb-8">Visualiza toda la información de la empresa incluyendo facturación, envíos y rendimiento</p>

        {/* KPIs Principales */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
            <p className="text-gray-600 text-sm font-semibold">💰 Facturación Total</p>
            <p className="text-3xl font-black text-blue-600 mt-2">€45,230</p>
            <p className="text-xs text-blue-600 mt-2">↑ 12% vs mes anterior</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
            <p className="text-gray-600 text-sm font-semibold">🚚 Envíos Completados</p>
            <p className="text-3xl font-black text-green-600 mt-2">1,245</p>
            <p className="text-xs text-green-600 mt-2">↑ 8% vs mes anterior</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
            <p className="text-gray-600 text-sm font-semibold">📍 Rutas Activas</p>
            <p className="text-3xl font-black text-purple-600 mt-2">42</p>
            <p className="text-xs text-purple-600 mt-2">12 con problemas</p>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200">
            <p className="text-gray-600 text-sm font-semibold">👥 Repartidores Activos</p>
            <p className="text-3xl font-black text-orange-600 mt-2">28</p>
            <p className="text-xs text-orange-600 mt-2">3 ausentes</p>
          </div>
        </div>

        {/* Secciones principales */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Gráfico de Envíos */}
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <h2 className="text-xl font-black text-gray-900 mb-4">📈 Envíos por Día (Esta Semana)</h2>
            <div className="h-40 bg-white rounded-lg border border-gray-200 flex items-end justify-around p-4">
              <div className="w-12 h-24 bg-blue-400 rounded-t-lg flex items-end justify-center text-xs font-bold">120</div>
              <div className="w-12 h-32 bg-blue-500 rounded-t-lg flex items-end justify-center text-xs font-bold">156</div>
              <div className="w-12 h-28 bg-blue-400 rounded-t-lg flex items-end justify-center text-xs font-bold">142</div>
              <div className="w-12 h-36 bg-blue-600 rounded-t-lg flex items-end justify-center text-xs font-bold">189</div>
              <div className="w-12 h-24 bg-blue-400 rounded-t-lg flex items-end justify-center text-xs font-bold">98</div>
            </div>
          </div>

          {/* Problemas Reportados */}
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <h2 className="text-xl font-black text-gray-900 mb-4">⚠️ Problemas Reportados</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                <div>
                  <p className="font-bold text-red-900">Producto Dañado</p>
                  <p className="text-xs text-red-700">Ruta #42</p>
                </div>
                <span className="font-bold text-2xl text-red-600">8</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
                <div>
                  <p className="font-bold text-orange-900">Falta Producto</p>
                  <p className="text-xs text-orange-700">Ruta #15</p>
                </div>
                <span className="font-bold text-2xl text-orange-600">4</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <div>
                  <p className="font-bold text-yellow-900">No Pertenece</p>
                  <p className="text-xs text-yellow-700">Múltiples rutas</p>
                </div>
                <span className="font-bold text-2xl text-yellow-600">3</span>
              </div>
            </div>
          </div>
        </div>

        {/* Acciones */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200 hover:shadow-lg transition-all cursor-pointer">
            <div className="text-4xl mb-3">📋</div>
            <h2 className="text-lg font-black text-blue-900 mb-2">Reportes Financieros</h2>
            <p className="text-sm text-blue-700">Análisis detallado de ingresos y gastos</p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200 hover:shadow-lg transition-all cursor-pointer">
            <div className="text-4xl mb-3">👥</div>
            <h2 className="text-lg font-black text-purple-900 mb-2">Gestión de Usuarios</h2>
            <p className="text-sm text-purple-700">Administra empleados y permisos</p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200 hover:shadow-lg transition-all cursor-pointer">
            <div className="text-4xl mb-3">⚙️</div>
            <h2 className="text-lg font-black text-green-900 mb-2">Configuración</h2>
            <p className="text-sm text-green-700">Ajustes avanzados de la aplicación</p>
          </div>
        </div>
      </div>
    </div>
  );
}
