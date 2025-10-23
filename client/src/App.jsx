import { useDrop } from 'react-dnd';
import React from 'react';

// Importa o Contexto e o Hook do Editor (Extensões removidas)
import { useEditor, EditorProvider } from './editor/EditorContext'; 

// Importações dos componentes (Extensões removidas)
import EmailWrapper from './editor/components/EmailWrapper'; 
import EmailImage from './editor/components/EmailImage'; 

// Importações dos componentes de UI (Extensões removidas)
import Sidebar from './editor/SideBar'; 
import PropsPanel from './editor/PropsPanel'; 
import { ItemTypes } from './editor/DragItemTypes'; 

// =================================================================
// Componentes Auxiliares
// =================================================================

/**
 * Responsável por envolver o componente de e-mail (ex: EmailImage) com a 
 * lógica de seleção e a borda azul.
 */
const BlockRenderer = ({ item }) => {
  // Acessa o estado e a função de seleção globalmente
  const { handleSelectedBlock, selectedBlockId } = useEditor();

  const renderComponent = (block) => {
    switch (block.type) {
        case 'Image':
            // Renderiza o componente de e-mail passando as propriedades do bloco
            return <EmailImage src={block.src} alt={block.alt} />;
        default:
            return <p>Componente: {block.type}. Aguardando criação!</p>; 
    }
  };

  return (
    <div 
      key={item.id} 
      className="layout-item"
      onClick={() => handleSelectedBlock(item.id)}
      style={{ 
        outline: item.id === selectedBlockId ? '2px solid #646cff' : 'none', 
        cursor: 'pointer',
        position: 'relative',
        margin: '10px 0'
      }}>
      {renderComponent(item)}
    </div>
  )
}


// =================================================================
// Componente Principal de Layout (UI)
// Este componente é o responsável por montar a interface.
// =================================================================
const EditorUI = () => {
  
  // Puxa apenas os dados e funções necessários do Contexto
  const { emailLayout, handleDrop } = useEditor(); 

  // 1. Configura o useDrop para o Canvas
  const [{ isOver }, drop] = useDrop(() => ({
    accept: [ItemTypes.CONTENT_BLOCK], 
    drop: (item, _monitor) => { 
      handleDrop(item);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }), [handleDrop]); 

  return (
    <div className="App">
      <h1>Editor de Email Marketing (Drag-n-Drop)</h1>
      <div className="editor-container">
        {/* 1. Sidebar (Componente de UI) */}
        <Sidebar />

        {/* 2. Área de Edição (Canvas) - Onde será solto */}
        <div 
            ref={drop} 
            className="canvas"
            style={{ 
                border: isOver ? '3px dashed #646cff' : '3px dashed transparent',
                minHeight: '400px',
                padding: '20px',
                backgroundColor: isOver ? '#1a1a1a' : 'transparent'
            }}
        >
          <EmailWrapper>
            {emailLayout.map((item) => (
              // BlockRenderer cuida da seleção e renderiza o bloco específico
              <BlockRenderer key={item.id} item={item} />
            ))}
          </EmailWrapper>
        </div>

        {/* 3. Painel de Propriedades (Componente de UI) */}
        <PropsPanel /> 
      </div>
    </div>
  );
}

// =================================================================
// Componente App (Wrapper de Provedor)
// Onde o Contexto do Editor é fornecido à UI.
// =================================================================
function App() {
  // Apenas envolve a UI com o Provedor de Contexto (DndProvider está no main.jsx)
  return (
    <EditorProvider>
      <EditorUI />
    </EditorProvider>
  );
}

export default App;