// Importamos 'useState' para darle memoria a nuestra pieza
import { useState } from 'react';

export function DeslizadorConfirmacion({ onConfirmado }) {
  // 1. Memoria: ¿Por dónde va el deslizador? (De 0 a 100)
  const [progreso, setProgreso] = useState(0);
  
  // 2. Memoria: ¿Ya hemos llegado al final y confirmado?
  const [confirmado, setConfirmado] = useState(false);

  // Función que se ejecuta cada vez que movemos el dedo
  const manejarDeslizamiento = (evento) => {
    if (confirmado) return; // Si ya se confirmó, no hacemos nada
    
    const valorActual = Number(evento.target.value);
    setProgreso(valorActual);

    // Si llega al 100%, bloqueamos y confirmamos
    if (valorActual >= 100) {
      setConfirmado(true);
      setProgreso(100);
      onConfirmado?.();
    }
  };

  // Función que se ejecuta al soltar el dedo
  const soltarDedo = () => {
    // Si soltamos antes de llegar al 100%, la barra vuelve al principio (efecto muelle)
    if (!confirmado) {
      setProgreso(0);
    }
  };

  // Si ya hemos confirmado, pintamos un botón verde estático
  if (confirmado) {
    return (
      <div className="w-full bg-green-600 text-white font-bold py-4 rounded-xl shadow text-center text-lg transition-all">
        ✅ Entrega Completada
      </div>
    );
  }

  // Si no, pintamos nuestro deslizador interactivo
  return (
    <div className="relative w-full h-14 bg-gray-200 rounded-xl overflow-hidden flex items-center shadow-inner">
      
      {/* 1. La barra de color que crece de izquierda a derecha */}
      <div 
        className="absolute top-0 left-0 h-full bg-blue-600 transition-all duration-75"
        style={{ width: `${progreso}%` }}
      ></div>

      {/* 2. El texto que el repartidor lee (centrado) */}
      <span className="absolute w-full text-center text-gray-700 font-bold z-0 pointer-events-none">
        {progreso > 20 ? "Sigue deslizando..." : "👉 Deslizar para Entregar"}
      </span>

      {/* 3. El control nativo invisible que hace el trabajo sucio */}
      <input
        type="range"
        min="0"
        max="100"
        value={progreso}
        onChange={manejarDeslizamiento}
        onMouseUp={soltarDedo}
        onTouchEnd={soltarDedo}
        onMouseLeave={soltarDedo}
        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer z-10"
      />
    </div>
  );
}