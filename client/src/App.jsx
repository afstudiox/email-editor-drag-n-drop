// client/src/App.jsx
import { useState } from 'react';
import EmailWrapper from './editor/Components/EmailsWrapper';
import './App.css';

function App() {
  // **Estrutura de Dados do Layout:**
  // Cada objeto representa uma 'row' ou 'seção' do email.
  // É crucial para o salvamento no backend.
  const [emailLayout, setEmailLayout] = useState([
    // Exemplo de como o estado inicial pode parecer.
    // O id é importante para reordenação e manipulação.
    { id: 'start-1', type: 'Text', content: 'Arraste componentes para cá!' },
  ]);

  return (
    <div className="App">
      <h1>Editor de Email Marketing (Drag-n-Drop)</h1>
      <div className="editor-container">
        {/* 1. Sidebar de Componentes (O que será arrastado) - FASE 6 */}
        <div className="sidebar">
          <h2>Blocos</h2>
          {/* Aqui entrarão os componentes arrastáveis */}
        </div>

        {/* 2. Área de Edição (Canvas) - Onde será solto */}
        <div className="canvas">
          <EmailWrapper>
          {emailLayout.map((item) => (
            <div key={item.id} className={`layout-item ${item.type.toLowerCase()}`}>
              {/* Renderização condicional dos seus Componentes React */}
              <p>Bloco: {item.type} (ID: {item.id})</p>
            </div>
          ))}
          </EmailWrapper>
        </div>

        {/* 3. Painel de Propriedades - FASE 2 */}
        <div className="props-panel">
          <h2>Configurações</h2>
          <p>Selecione um bloco para editar.</p>
        </div>
      </div>
    </div>
  );
}

export default App;