import React from 'react';
import SidebarItem from './SidebarItem';

// Componente simples que rendereriza os blocos disponíveis

const SideBar = () => { 
  return (
    <div className='sidebar'>
      <h2>Blocos</h2>
      {/* Renderiza o SidebarItem para o bloco de Imagem */}
      <SidebarItem type="Image" name="Bloco de Imagem" />
    </div>
  );
};

export default SideBar;

