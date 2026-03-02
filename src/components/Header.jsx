import { useState } from 'react';

// Recibe el nombre del repartidor como "Prop" desde la base de datos simulada
export function Header({ nombreRepartidor }) {
  const [menuAbierto, setMenuAbierto] = useState(false);

  // Cogemos la primera letra del nombre para hacer un Avatar rápido
  const inicial = nombreRepartidor ? nombreRepartidor.charAt(0).toUpperCase() : 'U';

  return (
    // z-40 para que SIEMPRE flote por encima de cualquier tarjeta o mapa de abajo
    <header className="w-full bg-white shadow-sm px-4 py-3 flex justify-between items-center z-40 relative">
      
      {/* Logotipo o Nombre de la App */}
      <div className="font-black text-green-700 text-xl tracking-tight">
        Frut-ERP
      </div>

      {/* Zona de Perfil */}
      <div className="relative">
        <button
          onClick={() => setMenuAbierto(!menuAbierto)}
          className="flex items-center gap-2 focus:outline-none cursor-pointer"
        >
          <span className="font-medium text-gray-700 hidden sm:block">
            {nombreRepartidor}
          </span>
          {/* Avatar circular */}
          <div className="w-10 h-10 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold border-2 border-white shadow-sm">
            {inicial}
          </div>
        </button>

        {/* Menú Desplegable de Sesión */}
        {menuAbierto && (
          <>
            <div className="fixed inset-0 z-10 cursor-default" onClick={() => setMenuAbierto(false)}></div>
            <div className="absolute right-0 top-12 w-56 bg-white rounded-lg shadow-xl border border-gray-200 z-20 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                <p className="text-sm text-gray-500">Conectado como</p>
                <p className="text-sm font-bold text-gray-900">{nombreRepartidor}</p>
              </div>
              
              <button 
                onClick={() => alert("Simulando: Resumen de Turno...")}
                className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 font-medium transition-colors cursor-pointer border-b border-gray-100"
              >
                📋 Cierre de Turno
              </button>
              
              <button
                onClick={() => { alert("Borrando JWT y saliendo..."); setMenuAbierto(false); }}
                className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 font-medium transition-colors cursor-pointer"
              >
                🚪 Cerrar Sesión
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  );
}