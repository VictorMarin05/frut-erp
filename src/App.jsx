import { ParadaReparto } from './components/ParadaReparto'
import { Header } from './components/Header' // <-- 1. Importamos

// 1. Simulamos la respuesta de nuestra base de datos (Un Array de Objetos)
const datosDeRuta = [
  { id: 101, direccion: "Avenida Diagonal 120", notas: "Dejar las cajas en la trastienda.", items: [
    {nombre: "Cajas Plátanos", cantidad: 2, icon: "📦"},
    {nombre: "Bolsa Naranjas", cantidad: 1, icon: "🛍️"}
  ] },
  { id: 102, direccion: "Plaça Catalunya 5", notas: "Cuidado con la zona de carga y descarga.", items: [
    {nombre: "Cajas Manzanas", cantidad: 3, icon: "📦"},
    {nombre: "Bolsa Peras", cantidad: 1, icon: "🛍️"}
  ] },
  { id: 103, direccion: "Carrer de Sants 45", notas: "Llamar al dueño (Dueño: 655443322) al llegar.", items: [
    {nombre: "Cajas Uvas", cantidad: 4, icon: "🍇"},
    {nombre: "Bolsa Fresas", cantidad: 2, icon: "🛍️"}
  ] }
];

const repartidor = {
  id: 500,
  nombre: "Carlos García",
  email: "carlos.garcia@frut-erp.com"
}


function App() {
  return (
    // Hemos añadido w-full para arreglar el fondo negro
    <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center">
      <Header nombreRepartidor={repartidor.nombre} />
      <h1 className="text-3xl font-bold text-gray-800 mb-8 mt-4">Ruta Activa</h1>



      {/* Pieza 1 con sus propios datos */}
      <ParadaReparto 
        direccion={datosDeRuta[0].direccion} 
        notas={datosDeRuta[0].notas}
        items={datosDeRuta[0].items}
      />
      
      {/* Pieza 2 con datos totalmente distintos */}
      <ParadaReparto 
        direccion={datosDeRuta[1].direccion} 
        notas={datosDeRuta[1].notas}
        items={datosDeRuta[1].items}
      />
      
      {/* Pieza 3 con datos totalmente distintos */}
      <ParadaReparto 
        direccion={datosDeRuta[2].direccion} 
        notas={datosDeRuta[2].notas}
        items={datosDeRuta[2].items}
      />
      
    </div>
    
    
  )
}

export default App