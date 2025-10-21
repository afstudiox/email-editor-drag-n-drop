import React from "react";

// Recebe o ID do bloco selecionado e o layout (para buscar as propriedades)
const PropsPanel = ({ selectedBlockId, emailLayout, onUpdateBlock }) => {
  
  // 1. Encontra o bloco selecionado no array de layout
  const selectedBlock = emailLayout.find(item => item.id === selectedBlockId);
  
  if (!selectedBlock) {
    // Se não houver bloco selecionado, exibe uma mensagem
    return (
      <div className="props-panel">
        <h2>Configurações</h2>
        <p>Selecione um bloco no Canvas para editar suas propriedades.</p>
      </div>
    );
  }

  // 2. Renderiza os inputs de edição (por enquanto, apenas um placeholder para a Imagem)
  const isImage = selectedBlock.type === 'Image';

  return (
    <div className="props-panel">
      <h2>Propriedades: {selectedBlock.type} (ID: {selectedBlockId})</h2>

      {/* Campos de edição para o Bloco de Imagem */}
      {isImage && (
        <div style={{padding: '10px', borderTop: '1px solid #444'}}>
          <lable style={{display: 'block', margin: '10px 0', fontSize: '0.9em'}}>
            URL da Imagem:
            <input 
              type="text" 
              value={selectedBlock.src || ''}
              readOnly // Por enquanto, apenas leitura
              style={{ width: '90%', padding: '8px', marginTop: '4px', backgroundColor: '#333', border: '1px solid #555', color: 'white' }}
            />
            <p style={{ color: '#ccc', fontSize: '0.8em' }}>
              *A lógica de edição será implementada em seguida.
            </p>
          </lable>

        </div>
      )}
      </div>
  );
};

export default PropsPanel;