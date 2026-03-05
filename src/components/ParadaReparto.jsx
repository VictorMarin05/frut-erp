import { useState } from 'react';
import { DeslizadorConfirmacion } from './DeslizadorConfirmacion';
import { ItemManifiesto } from './ItemManifiesto';
import { InfoCliente } from './InfoCliente';

export function ParadaReparto({ id, cliente, direccion, telefono, notas, items, distancia, confirmado = false, onConfirmado }) {
  const [menuAbiertoIdx, setMenuAbiertoIdx] = useState(null);
  const [itemsEscaneados, setItemsEscaneados] = useState([]);

  const toggleEscaneo = (index) => {
    if (itemsEscaneados.includes(index)) {
      setItemsEscaneados(itemsEscaneados.filter(i => i !== index));
    } else {
      setItemsEscaneados([...itemsEscaneados, index]);
    }
  };

  const todosEscaneados = items && itemsEscaneados.length === items.length;

  // Si está confirmada, mostrar versión comprimida
  if (confirmado) {
    return (
      <div className="bg-gray-100 border-l-8 border-gray-400 rounded-xl p-3 mb-3 w-full max-w-md opacity-60 transition-all">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-gray-500 line-through font-semibold text-sm">{cliente}</span>
            <p className="text-gray-400 text-xs">{direccion}</p>
          </div>
          <span className="text-2xl">✅</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border-l-8 border-blue-600 shadow-lg rounded-2xl p-6 mb-6 w-full max-w-md">
      
      {/* Pasamos 'cliente' al componente InfoCliente */}
      <InfoCliente 
        cliente={cliente} 
        direccion={direccion} 
        telefono={telefono} 
        notas={notas} 
        distancia={distancia}
      />

      <ul className="mb-6 bg-gray-50 rounded-xl border border-gray-100 overflow-hidden">
        {items && items.map((item, index) => (
          <ItemManifiesto 
            key={index} 
            item={item} 
            estaAbierto={menuAbiertoIdx === index}
            alAlternar={() => setMenuAbiertoIdx(menuAbiertoIdx === index ? null : index)}
            alCerrar={() => setMenuAbiertoIdx(null)}
            escaneado={itemsEscaneados.includes(index)}
            simularEscaneo={() => toggleEscaneo(index)}
          />
        ))}
      </ul>
      
      {!todosEscaneados ? (
        <button 
            className="w-full bg-blue-50 text-blue-800 border-2 border-blue-600 font-bold py-4 rounded-xl shadow-sm text-lg flex items-center justify-center gap-2 cursor-pointer transition-colors"
        >
            📷 ESCANEAR CAJAS ({itemsEscaneados.length}/{items.length})
        </button>
      ) : (
        <DeslizadorConfirmacion onConfirmado={onConfirmado} />
      )}
    </div>
  )
}