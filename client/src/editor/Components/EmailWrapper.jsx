import React from "react";

/**
 * Componente Wrapper que define a estrutura de tabela mestra (600px) do e-mail.
 * Ele recebe e renderiza todos os blocos de conteúdo como children.
 */
const EmailWrapper = ({ children }) => {
    


    // 1. Este componente gera o <body> (a parte editável do e-mail)
    return (
        // Usamos um Fragmento (<>) pois o wrapper será renderizado dentro do canvas principal.
        <>
            {/* A Tabela Mestra de 600px, centrada e com largura total para clientes de e-mail */}
            <table
                width="600"
                cellSpacing="0"
                cellPadding="0"
                role="presentation"
                align="center"
                border="0"
                style={{
                    // Propriedades essenciais para responsividade em clientes de e-mail
                    maxWidth: '600px',
                    width: '100%', 
                    margin: '0 auto', 
                    backgroundColor: '#ffffff' // Fundo padrão para o Canvas
                }}
            >
                <tbody>
                    <tr>
                        <td align="center">
                            {/* Aqui, o React renderizará todos os blocos arrastados pelo usuário (children) */}
                            {children}
                            
                            {/* Os blocos fixos (VIEW EXTERNAL LINK, FOOTER, etc.) serão adicionados aqui no futuro */}
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    );
};
export default EmailWrapper;