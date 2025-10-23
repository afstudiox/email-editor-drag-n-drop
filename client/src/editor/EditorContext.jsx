import React, { useState, createContext, useContext, useMemo } from 'react';

// =================================================================
// 1. CONTEXTO E HOOKS
// =================================================================

// Criação do Contexto
const EditorContext = createContext(undefined);

/**
 * Hook customizado para consumir o EditorContext de forma segura.
 * @returns {object} O valor do contexto (estado e funções).
 */
export const useEditor = () => {
  const context = useContext(EditorContext);
    if (context === undefined) {
      throw new Error('useEditor deve ser usado dentro de um EditorProvider');
    }
    return context;
};

// =================================================================
// 2. FUNÇÕES DE UTILIDADE E ESTADO
// =================================================================

/**
 * Gera um ID único baseado no tipo de bloco.
 * @param {string} type - O tipo do bloco (ex: 'Image').
 * @returns {string} O ID único.
 */
const generateUniqueId = (type) => `${type.toLowerCase()}-${Date.now()}`;

/**
 * O Provedor de Contexto, encapsulando o estado e a lógica de manipulação.
 */
export const EditorProvider = ({ children }) => {
  // Estado do layout do e-mail (lista de blocos)
  const [emailLayout, setEmailLayout] = useState([]);
  // Estado para rastrear o ID do bloco selecionado
  const [selectedBlockId, setSelectedBlockId] = useState(null);

  // --- Lógica de Criação (Drop) ---
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
      default:
        return;
    }

    // Adiciona o novo bloco e define-o como selecionado
    setEmailLayout(prevLayout => [...prevLayout, newItem]);
    setSelectedBlockId(newId); 
  };

  // --- Lógica de Seleção ---
  const handleSelectedBlock = (id) => {
    // Deseleciona se clicar novamente no mesmo bloco
    setSelectedBlockId(prevId => (prevId === id ? null : id));
  };

  // --- Lógica de Atualização (Core da Edição de Propriedades) ---
  /**
   * Atualiza uma propriedade específica de um bloco no layout.
   * @param {string} id - ID do bloco a ser atualizado.
   * @param {string} key - Chave da propriedade (ex: 'src', 'alt').
   * @param {any} value - Novo valor.
   */
  const handleUpdateBlock = (id, key, value) => {
    setEmailLayout(prevLayout => 
      prevLayout.map(block => {
        if (block.id === id) {
          // Garante a imutabilidade do estado
          return {
            ...block,
            [key]: value, // Atualiza a propriedade
          };
        }
        return block;
      })
    );
  };

  // Memoriza o valor do contexto para otimização
  const contextValue = useMemo(() => ({
    emailLayout,
    selectedBlockId,
    handleDrop,
    handleSelectedBlock,
    handleUpdateBlock,
  }), [emailLayout, selectedBlockId]);

  return (
    <EditorContext.Provider value={contextValue}>
      {children}
    </EditorContext.Provider>
  );
  
};

