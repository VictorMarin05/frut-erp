import { ParadaReparto } from './components/ParadaReparto'

function App() {
  return (
    // Hemos añadido w-full para arreglar el fondo negro
    <div className="w-full min-h-screen bg-gray-100 p-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 mt-4">Ruta Activa</h1>
      
      {/* Pieza 1 con sus propios datos */}
      <ParadaReparto 
        direccion="Avenida Diagonal 120" 
        notas="Dejar las cajas en la trastienda."
        items={[
          {nombre: "Cajas Plátanos", cantidad: 2, icon: "📦"},
          {nombre: "Bolsa Naranjas", cantidad: 1, icon: "🛍️"}
        ]}
      />
      
      {/* Pieza 2 con datos totalmente distintos */}
      <ParadaReparto 
        direccion="Plaça Catalunya 5" 
        notas="Cuidado con la zona de carga y descarga."
        items={[
          {nombre: "Cajas Manzanas", cantidad: 3, icon: "📦"},
          {nombre: "Bolsa Peras", cantidad: 1, icon: "🛍️"}
        ]}
      />
      
    </div>
  )
}

export default App