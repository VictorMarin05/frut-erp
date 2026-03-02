import { useState } from 'react';

export function Header({ usuario }) {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const iniciales = usuario.nombre.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    // 'sticky top-0' mantiene la navegación siempre visible al hacer scroll
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm px-4 py-3 flex justify-between items-center border-b border-gray-100">
      <div className="font-black text-green-700 text-xl tracking-tighter italic">Frut-ERP</div>

      <div className="relative">
        <button onClick={() => setMenuAbierto(!menuAbierto)} className="flex items-center gap-2 cursor-pointer focus:outline-none">
          <div className="relative">
            {/* Avatar circular según especificación Tailwind */}
            <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold shadow-sm text-sm">
              {iniciales}
            </div>
            {/* Indicador de estado (verde = en línea) */}
            <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white bg-green-500"></div>
          </div>
        </button>

        {menuAbierto && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setMenuAbierto(false)}></div>
            <div className="absolute right-0 top-12 w-64 bg-white rounded-lg shadow-xl border border-gray-200 z-20 overflow-hidden animate-in fade-in slide-in-from-top-2">
              <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{usuario.rol}</p>
                <p className="text-sm font-bold text-gray-900">{usuario.nombre}</p>
              </div>
              {/* Opción de cierre de sesión destructiva en color rojo */}
              <button 
                onClick={() => { alert("Cerrando sesión y purgando datos..."); setMenuAbierto(false); }}
                className="w-full text-left px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50 transition-colors border-t border-gray-100"
              >
                Cerrar Sesión
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  );
}