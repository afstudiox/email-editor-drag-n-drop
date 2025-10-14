import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './App.css'


// Importar o DndProvider e o HTML5Backend
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Envolver o App com o DndProvider */}
    <DndProvider backend={HTML5Backend}>
      <App />
    </DndProvider>
  </React.StrictMode>,
)
