export function InfoCliente({ cliente, direccion, telefono, notas }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-start mb-2">
        {/* Aquí pintamos la variable 'cliente' */}
        <h2 className="text-2xl font-black text-gray-900 leading-tight">
          {cliente || "Cliente sin nombre"}
        </h2>
        <a href={`tel:${telefono}`} className="p-2 bg-green-100 text-green-700 rounded-full active:scale-75 transition-transform">
          📞 {telefono}
        </a>
      </div>
      
      <p className="text-gray-600 font-medium text-lg italic">📍 {direccion}</p>
      
      {notas && (
        <div className="mt-3 bg-yellow-100 border-l-4 border-yellow-500 p-3 rounded-r-md">
          <p className="text-yellow-800 font-bold text-[10px] uppercase tracking-widest mb-1">Notas Clave</p>
          <p className="text-yellow-900 text-sm font-medium">{notas}</p>
        </div>
      )}
    </div>
  );
}