import { useState } from 'react';
import EmailWrapper from './editor/components/EmailWrapper';
import EmailImage from './editor/components/EmailImage';


function App() {
  const [emailLayout, setEmailLayout] = useState([
    { id: 'img-1', type: 'Image', src: 'https://image.mc.mkt-hyundai.com.br/lib/fe2911747364047c7c1d74/m/1/e5bc2443-624d-480a-b384-5f6dd24e4b24.png', styles: {} },
  ]);

  const renderComponent = (item) => {
    switch (item.type) {
        // Removemos o case 'Text'
        case 'Image':
            return <EmailImage src={item.src} alt={item.alt} {...item.styles} />;
        default:
            // Se o tipo 'Text' aparecer, ele retornará isso:
            return <p>Componente: {item.type}. Aguardando criação!</p>; 
    }
  };

  return (
    <div className="App">
      <h1>Editor de Email Marketing (Drag-n-Drop)</h1>
      <div className="editor-container">
        {/* 1. Sidebar de Componentes (Apenas o título por enquanto) */}
        <div className="sidebar">
          <h2>Blocos</h2>
          {/* O item arrastável não está aqui */}
        </div>

        {/* 2. Área de Edição (Canvas) - Onde será solto */}
        <div className="canvas">
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