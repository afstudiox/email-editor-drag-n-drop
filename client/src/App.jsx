import { useState } from 'react';
import { useDrop } from 'react-dnd';

// Importações dos componentes
import EmailWrapper from './editor/components/EmailWrapper';
import EmailImage from './editor/components/EmailImage';

// Importações da LÓGICA do editor
import Sidebar from './editor/SideBar';
import { ItemTypes } from './editor/DragItemTypes'; 

function App() {
  const [emailLayout, setEmailLayout] = useState([
    // Bloco inicial (imagem da Hyundai)
    { id: 'img-1', type: 'Image', src: 'https://placehold.co/200x20/orange/white', styles: {} },
  ]);

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
              <div key={item.id} className="layout-item">
                {renderComponent(item)}
              </div>
            ))}
          </EmailWrapper>
        </div>

        {/* 3. Painel de Propriedades */}
        <div className="props-panel">
          <h2>Configurações</h2>
          <p>Selecione um bloco para editar.</p>
        </div>
      </div>
    </div>
  );
}

export default App;