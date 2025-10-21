import { useState } from 'react';
import { useDrop } from 'react-dnd';

// Importações dos componentes
import EmailWrapper from './editor/components/EmailWrapper';
import EmailImage from './editor/components/EmailImage';

// Importações da LÓGICA do editor
import Sidebar from './editor/SideBar';
import PropsPanel from './editor/PropsPanel';
import { ItemTypes } from './editor/DragItemTypes'; 

function App() {
  
  // Gerenciamento de estados
  const [emailLayout, setEmailLayout] = useState([]);
  const [selectedBlockId, setSelectedBlockId] = useState(null);

  // Função para gerar IDs únicos
  const generateUniqueId = (type) => `${type.toLowerCase()}-${Date.now()}`;

  // 1. Função de manipulação do Drop
  const handleDrop = (item) => {
    const blockType = item.type;
    
    let newItem;
    const newId = generateUniqueId(blockType);

    switch (blockType) {
        case 'Image':
            newItem = { 
                id: newId, 
                type: 'Image', 
                src: 'https://placehold.co/200x20/orange/white', 
                alt: newId,
                styles: {} 
            };
            break;
        // Adicionaremos 'Text' aqui depois
        default:
            return;
    }

    // Adiciona o novo item ao final do layout
    setEmailLayout(prevLayout => [...prevLayout, newItem]);
  };

  // 2. Configura o useDrop para o Canvas
  const [{ isOver }, drop] = useDrop(() => ({
    // ACEITA O TIPO DE INTERAÇÃO: CONTENT_BLOCK
    accept: [ItemTypes.CONTENT_BLOCK], 
    
    // CORREÇÃO LINTER: Usamos _monitor para evitar o aviso
    drop: (item, _monitor) => { 
      handleDrop(item);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }), [emailLayout]);

  // 3. Define qual bloco está selecionado
  const handleSelectedBlock = (id) => {
    setSelectedBlockId(id);
  };

  // Lógica de Renderização Condicional
  const renderComponent = (item) => {
    switch (item.type) {
        case 'Image':
            return <EmailImage src={item.src} alt={item.alt} {...item.styles} />;
        default:
            return <p>Componente: {item.type}. Aguardando criação!</p>; 
    }
  };

  return (
    <div className="App">
      <h1>Editor de Email Marketing (Drag-n-Drop)</h1>
      <div className="editor-container">
        {/* 1. Sidebar de Componentes */}
        <Sidebar />

        {/* 2. Área de Edição (Canvas) - Onde será solto */}
        <div 
            ref={drop} // Conecta o alvo de soltura (drop)
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
            ))}
          </EmailWrapper>
        </div>

        {/* 3. Painel de Propriedades */}
        <PropsPanel 
          selectedBlockId={selectedBlockId} 
          emailLayout={emailLayout}   
          onUpdateBlock={() => {}} // Lógica de atualização será implementada depois
        />
      </div>
    </div>
  );
}

export default App;