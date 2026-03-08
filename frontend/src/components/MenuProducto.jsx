import { useState, useRef, useEffect } from 'react';

export function MenuProducto({ 
  estaAbierto, 
  alCerrar, 
  alMarcarDañado, 
  alMarcarFalta, 
  alMarcarNoPertenece,
  botonRef
}) {
  const [posicion, setPosicion] = useState({ top: 0, left: 0 });
  const menuRef = useRef(null);

  useEffect(() => {
    if (estaAbierto && botonRef?.current) {
      const rect = botonRef.current.getBoundingClientRect();
      setPosicion({
        top: rect.bottom -10 ,
        left: rect.left - 200 // Aproximadamente el ancho del menú menos padding
      });
    }
  }, [estaAbierto, botonRef]);

  if (!estaAbierto) return null;

  return (
    <>
      <div className="fixed inset-0 z-998 cursor-default" onClick={alCerrar}></div>
      <div 
        ref={menuRef}
        className="fixed z-999 bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden w-56"
        style={{
          top: `${posicion.top}px`,
          left: `${posicion.left}px`
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col text-sm font-medium">
          <button 
            onClick={() => {
              alMarcarDañado?.();
              alCerrar();
            }} 
            className="text-left px-4 py-3 hover:bg-red-50 text-red-700 border-b border-gray-100 cursor-pointer"
          >
            ⚠️ Producto Dañado
          </button>
          <button 
            onClick={() => {
              alMarcarFalta?.();
              alCerrar();
            }} 
            className="text-left px-4 py-3 hover:bg-orange-50 text-orange-700 border-b border-gray-100 cursor-pointer"
          >
            ❓ Falta Producto
          </button>
          <button 
            onClick={() => {
              alMarcarNoPertenece?.();
              alCerrar();
            }} 
            className="text-left px-4 py-3 hover:bg-gray-50 text-gray-700 cursor-pointer"
          >
            ❌ No Pertenece
          </button>
        </div>
      </div>
    </>
  );
}
