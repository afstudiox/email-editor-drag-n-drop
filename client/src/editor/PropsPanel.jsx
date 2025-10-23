import React from "react";
// Importa o hook do nosso EditorContext (sem extensão para compatibilidade)
import { useEditor } from './EditorContext'; 

/**
 * Painel lateral para editar as propriedades do bloco selecionado.
 */
const PropsPanel = () => {
  
  // Acessa todo o estado e as funções de manipulação do Contexto
  const { 
    emailLayout, 
    selectedBlockId, 
    handleUpdateBlock // Função que usaremos para salvar as alterações
  } = useEditor();

  // 1. Encontra o bloco selecionado no array de layout
  const selectedBlock = emailLayout.find(item => item.id === selectedBlockId);
  
  // Função auxiliar para atualizar o bloco no Contexto quando o input muda
  const handlePropChange = (key, value) => {
    if (selectedBlockId) {
        // Envia o ID do bloco, a chave da propriedade (ex: 'src'), e o novo valor para o Contexto
        handleUpdateBlock(selectedBlockId, key, value);
    }
  };

  if (!selectedBlock) {
    // Se não houver bloco selecionado, exibe uma mensagem
    return (
      <div className="props-panel">
        <h2>Configurações</h2>
        <p>Selecione um bloco no Canvas para editar suas propriedades.</p>
      </div>
    );
  }

  // 2. Renderiza os inputs de edição (por enquanto, apenas Imagem)
  const isImage = selectedBlock.type === 'Image';

  return (
    <div className="props-panel">
      <h2>Propriedades: {selectedBlock.type}</h2>
      <p style={{ color: '#aaa', fontSize: '0.8em' }}>ID: {selectedBlockId}</p>

      {/* Campos de edição para o Bloco de Imagem */}
      {isImage && (
        <div style={{padding: '10px', borderTop: '1px solid #444', marginTop: '10px'}}>
          <h3 style={{fontSize: '1.1em', marginBottom: '10px', color: '#fff'}}>Propriedades da Imagem</h3>
          
          {/* Input para URL da Imagem (src) */}
          <div style={{marginBottom: '15px'}}>
            <label style={{display: 'block', margin: '5px 0', fontSize: '0.9em'}}>
              URL da Imagem:
              <input 
                type="text" 
                value={selectedBlock.src || ''}
                onChange={(e) => handlePropChange('src', e.target.value)}
                style={{ width: '90%', padding: '8px', marginTop: '4px', backgroundColor: '#333', border: '1px solid #555', color: 'white' }}
              />
            </label>
          </div>
          
          {/* Input para Texto Alternativo (alt) */}
          <div style={{marginBottom: '15px'}}>
            <label style={{display: 'block', margin: '5px 0', fontSize: '0.9em'}}>
              Texto Alternativo (Alt):
              <input 
                type="text" 
                value={selectedBlock.alt || ''}
                onChange={(e) => handlePropChange('alt', e.target.value)}
                style={{ width: '90%', padding: '8px', marginTop: '4px', backgroundColor: '#333', border: '1px solid #555', color: 'white' }}
              />
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropsPanel;
