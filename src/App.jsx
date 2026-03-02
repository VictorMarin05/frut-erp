import { useState } from 'react'
import { Header } from './components/Header'
import { ParadaReparto } from './components/ParadaReparto'

const datosIniciales = [
  { id: 101, cliente: "Frutería Paco", direccion: "Avenida Diagonal 120", telefono: "600111222", distancia: 1.2, ordenOptimizado: 1, notas: "Dejar las cajas en la trastienda.", items: [{nombre: "Plátanos", cantidad: 2, icon: "📦"}, {nombre: "Naranjas", cantidad: 1, icon: "🛍️"}] },
  { id: 102, cliente: "Alimentación Ana", direccion: "Plaça Catalunya 5", telefono: "600333444", distancia: 0.5, ordenOptimizado: 2, notas: "Cuidado con la zona de carga y descarga.", items: [{nombre: "Manzanas", cantidad: 3, icon: "📦"}] },
  { id: 103, cliente: "Supermercado Zoco", direccion: "Carrer de Sants 45", telefono: "600555666", distancia: 2.8, ordenOptimizado: 3, notas: "Llamar al timbre del almacén.", items: [{nombre: "Peras", cantidad: 4, icon: "🛍️"}] }
];

function App() {
  const [criterioOrden, setCriterioOrden] = useState('optimizado');
  const [busqueda, setBusqueda] = useState("");

  const usuarioSimulado = { nombre: "Carlos Conductor", rol: "Repartidor Logístico" };

  // 1. Filtrado por búsqueda global [cite: 126]
  const paradasFiltradas = datosIniciales.filter(p => 
    p.cliente.toLowerCase().includes(busqueda.toLowerCase()) ||
    p.direccion.toLowerCase().includes(busqueda.toLowerCase())
  );

  // 2. Lógica de ordenación aplicada sobre el filtro
  const paradasOrdenadas = [...paradasFiltradas].sort((a, b) => {
    if (criterioOrden === 'distancia') return a.distancia - b.distancia;
    if (criterioOrden === 'alfabetico-a-z') return a.cliente.localeCompare(b.cliente);
    if (criterioOrden === 'alfabetico-z-a') return b.cliente.localeCompare(a.cliente);
    return a.ordenOptimizado - b.ordenOptimizado;
  });

  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center">
      <Header usuario={usuarioSimulado} />
      
      <div className="w-full max-w-md p-4">
        {/* Migas de Pan (Breadcrumbs)  */}
        <nav className="flex text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
          <span>Logística</span>
          <span className="mx-2">/</span>
          <span className="text-blue-600">Ruta Activa</span>
        </nav>

        <h1 className="text-3xl font-black text-gray-900 mb-6">Ruta Activa</h1>

        {/* Buscador Global Dinámico  */}
        <div className="w-full mb-4">
          <input 
            type="text"
            placeholder="Buscar por cliente o calle..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full p-4 rounded-xl border border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white font-medium"
          />
        </div>

        {/* Selector de Ordenación (Tus 4 opciones) */}
        <div className="w-full grid grid-cols-4 gap-1 mb-8 bg-white p-1 rounded-xl shadow-sm border border-gray-200">
          {['optimizado', 'distancia', 'alfabetico-a-z', 'alfabetico-z-a'].map((tipo) => (
            <button 
              key={tipo}
              onClick={() => setCriterioOrden(tipo)}
              className={`py-2 text-[10px] font-black uppercase rounded-lg transition-all ${criterioOrden === tipo ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:bg-gray-50'}`}
            >
              {tipo === 'optimizado' ? 'Ruta' : tipo === 'distancia' ? 'Dist' : tipo.includes('a-z') ? 'A-Z' : 'Z-A'}
            </button>
          ))}
        </div>
        
        {paradasOrdenadas.length > 0 ? (
          paradasOrdenadas.map((parada) => (
            <ParadaReparto key={parada.id} {...parada} />
          ))
        ) : (
          <div className="text-center py-20 text-gray-400 font-bold italic">No se encontraron paradas</div>
        )}
      </div>
    </div>
  )
}

export default App;