export function ItemManifiesto({ item, estaAbierto, alAlternar, alCerrar, escaneado, simularEscaneo }) {
  return (
    <li className={`relative flex items-center justify-between p-3 border-b border-gray-100 last:border-0 ${estaAbierto ? 'z-30' : 'z-0'}`}>
      
      <div className="flex items-center gap-3">
        {/* Checkbox visual basado en el estado 'escaneado' */}
        <button onClick={simularEscaneo} className="cursor-pointer">
            {escaneado 
              ? <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-sm shadow-inner">✓</div>
              : <div className="w-6 h-6 rounded-full border-2 border-gray-300"></div>
            }
        </button>
        
        <span className="text-2xl opacity-80">{item.icon}</span>
        <span className={`font-bold ${escaneado ? 'text-gray-400' : 'text-gray-900'}`}>{item.cantidad}x</span>
        <span className={`${escaneado ? 'text-gray-400 line-through' : 'text-gray-700'}`}>{item.nombre}</span>
      </div>

      <button onClick={alAlternar} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors cursor-pointer z-20">
        •••
      </button>

      {/* ... (Aquí se mantiene igual toda la capa invisible y el menú flotante que ya teníamos) ... */}
      {estaAbierto && (
        <>
          <div className="fixed inset-0 z-10 cursor-default" onClick={alCerrar}></div>
          <div className="absolute right-0 top-12 w-56 bg-white rounded-lg shadow-xl border border-gray-200 z-20 overflow-hidden">
            <div className="flex flex-col text-sm font-medium">
              <button onClick={() => { alert(`Dañado: ${item.nombre}`); alCerrar(); }} className="text-left px-4 py-3 hover:bg-red-50 text-red-700 border-b border-gray-100 cursor-pointer">
                ⚠️ Producto Dañado
              </button>
              <button onClick={() => { alert(`Falta: ${item.nombre}`); alCerrar(); }} className="text-left px-4 py-3 hover:bg-orange-50 text-orange-700 border-b border-gray-100 cursor-pointer">
                ❓ Falta Producto
              </button>
            </div>
          </div>
        </>
      )}
    </li>
  );
}