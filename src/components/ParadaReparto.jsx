import { useState } from 'react';
import { DeslizadorConfirmacion } from './DeslizadorConfirmacion';
import { ItemManifiesto } from './ItemManifiesto';

export function ParadaReparto({direccion, notas, items}) {
  const [menuAbiertoIdx, setMenuAbiertoIdx] = useState(null);
  
  // NUEVA MEMORIA: Un Array que guarda qué índices (0, 1, 2...) ya han sido escaneados
  const [itemsEscaneados, setItemsEscaneados] = useState([]);

  // Función para marcar/desmarcar un ítem como escaneado
  const toggleEscaneo = (index) => {
    if (itemsEscaneados.includes(index)) {
      setItemsEscaneados(itemsEscaneados.filter(i => i !== index));
    } else {
      setItemsEscaneados([...itemsEscaneados, index]);
    }
  };

  // Lógica: ¿Están todos escaneados? Comparamos la longitud del array con el total de ítems
  const todosEscaneados = items && itemsEscaneados.length === items.length;

  return (
    <div className="bg-white border-l-8 border-blue-600 shadow-md rounded-lg p-6 mb-4 w-full max-w-md">
      
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Direccion: {direccion || "Sin dirección especificada"}
      </h2>
      
      <div className="bg-yellow-100 border-l-4 border-yellow-500 p-3 mb-4 rounded">
        <p className="text-yellow-800 font-semibold text-sm">
          ⚠️ Nota: {notas || "Sin notas adicionales"}
        </p>
      </div>

      <ul className="mb-6 bg-gray-50 rounded-lg border border-gray-100">
        {items && items.map((item, index) => (
          <ItemManifiesto 
            key={index} 
            item={item} 
            estaAbierto={menuAbiertoIdx === index}
            alAlternar={() => setMenuAbiertoIdx(menuAbiertoIdx === index ? null : index)}
            alCerrar={() => setMenuAbiertoIdx(null)}
            // Le pasamos si está escaneado y la función para simularlo
            escaneado={itemsEscaneados.includes(index)}
            simularEscaneo={() => toggleEscaneo(index)}
          />
        ))}
      </ul>
      
      {/* RENDERIZADO CONDICIONAL DEL BOTÓN INFERIOR */}
      {!todosEscaneados ? (
        // Si faltan por escanear, mostramos el botón grande de la cámara
        <button 
            className="w-full bg-blue-100 text-blue-800 border-2 border-blue-600 hover:bg-blue-200 font-bold py-4 rounded-xl shadow-sm text-lg flex items-center justify-center gap-2 cursor-pointer transition-colors"
            onClick={() => alert("¡Aquí se abriría la cámara de verdad!")}
        >
            📷 ESCANEAR CAJAS ({itemsEscaneados.length}/{items.length})
        </button>
      ) : (
        // Si todos están escaneados, revelamos el deslizador final
        <DeslizadorConfirmacion />
      )}
    </div>
  )
}