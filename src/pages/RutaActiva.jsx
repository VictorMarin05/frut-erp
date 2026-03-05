import { useState } from 'react'
import { ParadaReparto } from '../components/ParadaReparto'

const datosIniciales = [
  { 
    id: 101, 
    cliente: "Frutería Paco", 
    direccion: "Avenida Diagonal 120", 
    telefono: "600111222",
    distancia: 1.2, 
    ordenOptimizado: 1,
    notas: "Dejar las cajas en la trastienda.",
    items: [
      {nombre: "Plátanos", cantidad: 2, icon: "📦"},
      {nombre: "Naranjas", cantidad: 1, icon: "🛍️"}
    ]
  },
  { 
    id: 102, 
    cliente: "Alimentación Ana", 
    direccion: "Plaça Catalunya 5", 
    telefono: "600333444",
    distancia: 0.5, 
    ordenOptimizado: 2,
    notas: "Cuidado con la zona de carga y descarga.",
    items: [
      {nombre: "Manzanas", cantidad: 3, icon: "📦"}
    ]
  },
  { 
    id: 103, 
    cliente: "Supermercado Zoco", 
    direccion: "Carrer de Sants 45", 
    telefono: "600555666",
    distancia: 2.8, 
    ordenOptimizado: 3,
    notas: "Llamar al timbre del almacén.",
    items: [
      {nombre: "Peras", cantidad: 4, icon: "🛍️"},
    ]
  }
];

// 1. CORRECCIÓN: Nombre de función y exportación nombrada
export function RutaActiva() {
  const [criterioOrden, setCriterioOrden] = useState('optimizado');
  const [filtroBusqueda, setFiltroBusqueda] = useState("");
  const [paradasConfirmadas, setParadasConfirmadas] = useState(new Set());

  const paradasFiltradas = datosIniciales.filter(p => 
    p.cliente.toLowerCase().includes(filtroBusqueda.toLowerCase()) ||
    p.direccion.toLowerCase().includes(filtroBusqueda.toLowerCase())
  );

  const paradasOrdenadas = [...paradasFiltradas].sort((a, b) => {
    if (criterioOrden === 'distancia') return a.distancia - b.distancia;
    if (criterioOrden === 'alfabetico-a-z') return a.cliente.localeCompare(b.cliente);
    if (criterioOrden === 'alfabetico-z-a') return b.cliente.localeCompare(a.cliente);
    return a.ordenOptimizado - b.ordenOptimizado;
  });

  return (
    <div className="w-full max-w-md p-4 flex flex-col items-center">
        {/* Breadcrumbs (Migas de pan) según PDF [cite: 1, 91] */}
        <nav className="w-full flex text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
          <span>Logística</span>
          <span className="mx-2">/</span>
          <span className="text-blue-600">Ruta Activa</span>
        </nav>

        <h1 className="text-3xl font-black text-gray-800 mb-6 mt-4 italic">Ruta Activa</h1>

        <input 
          type="text"
          placeholder="Buscar por cliente o dirección..."
          value={filtroBusqueda}
          onChange={(e) => setFiltroBusqueda(e.target.value)}
          className="w-full mb-4 px-4 py-4 rounded-xl border-2 border-gray-100 bg-white shadow-sm focus:outline-none focus:border-blue-600 transition font-medium"
        />

        <div className="w-full grid grid-cols-4 gap-1 mb-8 bg-white p-1 rounded-xl shadow-sm border border-gray-200">
          {['optimizado', 'distancia', 'alfabetico-a-z', 'alfabetico-z-a'].map((tipo) => (
            <button 
              key={tipo}
              onClick={() => setCriterioOrden(tipo)}
              className={`py-2 text-[10px] font-black uppercase rounded-lg transition-all cursor-pointer ${criterioOrden === tipo ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:bg-gray-50'}`}
            >
              {tipo === 'optimizado' ? 'Ruta' : tipo === 'distancia' ? 'Dist' : tipo.includes('a-z') ? 'A-Z' : 'Z-A'}
            </button>
          ))}
        </div>
        
        {paradasOrdenadas.map((parada) => {
          const estaConfirmada = paradasConfirmadas.has(parada.id);
          return (
            <ParadaReparto 
              key={parada.id}
              id={parada.id}
              cliente={parada.cliente}
              direccion={parada.direccion} 
              telefono={parada.telefono}
              notas={parada.notas}
              items={parada.items}
              distancia={parada.distancia}
              confirmado={estaConfirmada}
              onConfirmado={() => setParadasConfirmadas(new Set([...paradasConfirmadas, parada.id]))}
            />
          );
        })}
    </div>
  )
}