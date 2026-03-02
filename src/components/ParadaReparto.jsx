// Archivo: src/components/ParadaReparto.jsx

export function ParadaReparto({direccion, notas, items}) {
  return (
    // Usamos el diseño de tarjetas de alto contraste recomendado en el PDF
    <div className="bg-white border-l-8 border-blue-600 shadow-md rounded-lg p-6 mb-4 w-full max-w-md">
      
      {/* Encabezado con la dirección grande */}
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Direccion: {direccion || "Sin dirección especificada"}
      </h2>
      
      {/* Tarjeta de Notas (Fondo amarillo pálido) */}
      <div className="bg-yellow-100 border-l-4 border-yellow-500 p-3 mb-4 rounded">
        <p className="text-yellow-800 font-semibold text-sm">
          ⚠️ Nota: {notas || "Sin notas adicionales"}
        </p>
      </div>

      {/* Manifiesto de ítems a entregar */}
      <ul className="text-gray-700 font-medium text-lg mb-6">
        {items && items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            {item.icon} {item.cantidad}x {item.nombre}
          </li>
        ))}
        </ul>
            {/*<li className="flex items-center gap-2">
                🍎 10x Manzanas
            </li>
            <li className="flex items-center gap-2">
                🍌 5x Plátanos
            </li>/*}
      

      {/* Acción primaria de la parada */}
      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow active:scale-95 transition-transform">
        Ver Detalles
      </button>
    </div>
  )
}