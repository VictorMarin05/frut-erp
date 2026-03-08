import { useState, useRef } from 'react';
import { DeslizadorConfirmacion } from './DeslizadorConfirmacion';
import { ItemManifiesto } from './ItemManifiesto';
import { InfoCliente } from './InfoCliente';
import { MenuProducto } from './MenuProducto';

export function ParadaReparto({ id, cliente, direccion, telefono, notas, items, distancia, confirmado = false, onConfirmado }) {
  const [menuAbiertoIdx, setMenuAbiertoIdx] = useState(null);
  const botonMenuRef = useRef(null);
  const [itemsEscaneados, setItemsEscaneados] = useState([]);
  const [itemsProblematicos, setItemsProblematicos] = useState(new Map()); // Map: { index: 'dañado' | 'falta' }
  const [itemsActivos, setItemsActivos] = useState(items ? items.map((_, i) => i) : []); // Índices de items aún en la lista
  const [itemsSaliendo, setItemsSaliendo] = useState(new Set()); // Items que están saliendo con animación
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [itemAEliminar, setItemAEliminar] = useState(null);
  const [resetDeslizador, setResetDeslizador] = useState(0); // Trigger para resetear el deslizador

  const toggleEscaneo = (index) => {
    if (itemsEscaneados.includes(index)) {
      setItemsEscaneados(itemsEscaneados.filter(i => i !== index));
    } else {
      setItemsEscaneados([...itemsEscaneados, index]);
      // Al marcar como escaneado, si tenía un problema, se borra
      const nuevo = new Map(itemsProblematicos);
      nuevo.delete(index);
      setItemsProblematicos(nuevo);
    }
  };

  const marcarProblema = (index, tipo) => {
    const nuevo = new Map(itemsProblematicos);
    // Toggle: si ya tiene ese problema, lo borramos. Si no lo tiene, lo agregamos
    if (nuevo.get(index) === tipo) {
      nuevo.delete(index);
    } else {
      nuevo.set(index, tipo);
    }
    setItemsProblematicos(nuevo);
  };

  const abrirConfirmacionEliminar = (index) => {
    setItemAEliminar(index);
    setMostrarConfirmacion(true);
  };

  const confirmarEliminar = () => {
    if (itemAEliminar !== null) {
      // Efecto de salida
      setItemsSaliendo(new Set([...itemsSaliendo, itemAEliminar]));
      // Desaparecer después de la animación
      setTimeout(() => {
        setItemsActivos(itemsActivos.filter(i => i !== itemAEliminar));
        setItemsSaliendo(prev => {
          const nuevo = new Set(prev);
          nuevo.delete(itemAEliminar);
          return nuevo;
        });
      }, 400);
    }
    setMostrarConfirmacion(false);
    setItemAEliminar(null);
  };

  const cancelarEliminar = () => {
    setMostrarConfirmacion(false);
    setItemAEliminar(null);
  };

  const marcarNoPertenece = (index) => {
    abrirConfirmacionEliminar(index);
  };

  const animarSalidaEscaneados = () => {
    // Marcar items escaneados para salir
    const saliendo = new Set(itemsEscaneados);
    setItemsSaliendo(saliendo);
    
    // Después de la animación, eliminarlos de la lista
    setTimeout(() => {
      const nuevosActivos = itemsActivos.filter(i => !itemsEscaneados.includes(i));
      setItemsActivos(nuevosActivos);
      setItemsEscaneados([]);
      setItemsSaliendo(new Set());
      
      // Si quedan items, resetear el deslizador
      if (nuevosActivos.length > 0) {
        setResetDeslizador(prev => prev + 1);
      } else if (nuevosActivos.length === 0) {
        // Si no quedan items, marcar como confirmado
        onConfirmado?.();
      }
    }, 400);
  };

  // Un item está "tratado" si está escaneado O tiene un problema (dañado/falta)
  const todosTratados = itemsActivos && itemsActivos.every((index) => 
    itemsEscaneados.includes(index) || itemsProblematicos.has(index)
  );

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

      <ul className="relative mb-6 bg-gray-50 rounded-xl border border-gray-100" style={{overflow: 'visible'}}>
        {items && items.map((item, index) => {
          // Solo mostrar si está en itemsActivos
          if (!itemsActivos.includes(index)) return null;
          
          const problema = itemsProblematicos.get(index);
          const estaSaliendo = itemsSaliendo.has(index);
          
          return (
            <div
              key={index}
              data-item-index={index}
              className={`transition-all duration-300 ${
                estaSaliendo ? 'transform translate-x-96 opacity-0' : 'transform translate-x-0 opacity-100'
              }`}
            >
              <ItemManifiesto
                item={item} 
                estaAbierto={menuAbiertoIdx === index}
                alAlternar={(e) => {
                  botonMenuRef.current = e.currentTarget;
                  setMenuAbiertoIdx(menuAbiertoIdx === index ? null : index);
                }}
                alCerrar={() => setMenuAbiertoIdx(null)}
                escaneado={itemsEscaneados.includes(index)}
                simularEscaneo={() => toggleEscaneo(index)}
                problema={problema}
              />
            </div>
          );
        })}
      </ul>
      
      {itemsProblematicos.size > 0 && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-xs font-black text-yellow-800 mb-2">⚠️ ITEMS CON PROBLEMAS (Pendiente Reentrega)</p>
          <ul className="text-xs text-yellow-700 space-y-1">
            {items && items.map((item, idx) => {
              const problema = itemsProblematicos.get(idx);
              return problema ? (
                <li key={idx} className="font-medium">
                  • {item.nombre} - {problema === 'dañado' ? '🔴 Dañado' : '❌ Falta'}
                </li>
              ) : null;
            })}
          </ul>
        </div>
      )}
      
      {!todosTratados ? (
        <button 
            className="w-full bg-blue-50 text-blue-800 border-2 border-blue-600 font-bold py-4 rounded-xl shadow-sm text-lg flex items-center justify-center gap-2 cursor-pointer transition-colors"
        >
            📷 ESCANEAR CAJAS ({itemsEscaneados.length}/{itemsActivos.length})
        </button>
      ) : (
        <DeslizadorConfirmacion onConfirmado={animarSalidaEscaneados} resetTrigger={resetDeslizador} />
      )}

      {/* Menú flotante de 3 puntos */}
      <MenuProducto
        estaAbierto={menuAbiertoIdx !== null}
        alCerrar={() => setMenuAbiertoIdx(null)}
        alMarcarDañado={() => marcarProblema(menuAbiertoIdx, 'dañado')}
        alMarcarFalta={() => marcarProblema(menuAbiertoIdx, 'falta')}
        alMarcarNoPertenece={() => marcarNoPertenece(menuAbiertoIdx)}
        botonRef={botonMenuRef}
      />

      {/* Modal de confirmación para eliminar item */}
      {mostrarConfirmacion && itemAEliminar !== null && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-1000">
          <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-sm mx-4">
            <p className="text-lg font-black text-gray-900 mb-2">
              ¿Estás seguro de eliminar "{items?.[itemAEliminar]?.nombre}"?
            </p>
            <p className="text-sm text-gray-600 mb-6">
              Cantidad: <span className="font-bold">{items?.[itemAEliminar]?.cantidad} unidades</span>
            </p>
            <div className="flex gap-3">
              <button
                onClick={cancelarEliminar}
                className="flex-1 px-4 py-3 bg-gray-200 text-gray-800 font-bold rounded-xl hover:bg-gray-300 transition-colors cursor-pointer"
              >
                ❌ Cancelar
              </button>
              <button
                onClick={confirmarEliminar}
                className="flex-1 px-4 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors cursor-pointer"
              >
                🗑️ Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}