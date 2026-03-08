export function ItemManifiesto({ item, estaAbierto, alAlternar, alCerrar, escaneado, simularEscaneo, problema = null }) {
  return (
    <li className={`relative flex items-center justify-between p-3 border-b border-gray-100 last:border-0 ${estaAbierto ? 'z-30' : 'z-0'} ${problema ? 'bg-yellow-50' : ''}`}>
      
      <div className="flex items-center gap-3">
        {/* Checkbox visual basado en el estado 'escaneado' */}
        <button onClick={simularEscaneo} className="cursor-pointer">
            {escaneado 
              ? <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-sm shadow-inner">✓</div>
              : <div className="w-6 h-6 rounded-full border-2 border-gray-300"></div>
            }
        </button>
        
        <span className="text-2xl opacity-80">{item.icon}</span>
        <span className={`font-bold ${escaneado ? 'text-gray-400' : problema ? 'text-yellow-800' : 'text-gray-900'}`}>{item.cantidad}x</span>
        <span className={`${escaneado ? 'text-gray-400 line-through' : problema ? 'text-yellow-800 font-semibold' : 'text-gray-700'}`}>{item.nombre}</span>
      </div>

      <button onClick={alAlternar} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors cursor-pointer z-20">
        •••
      </button>
    </li>
  );
}