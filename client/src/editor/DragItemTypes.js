// Define os tipos de itens que podem ser arrastados.
// Isso é crucial para o react-dnd saber o que interage com o que.
export const ItemTypes = {
  // O bloco de conteúdo (texto, imagem, botão) que será arrastado
  CONTENT_BLOCK: 'content_block',
  // O componente já na tela que será reordenado
  LAYOUT_ROW: 'layout_row',
};