import React from 'react';

const EmailImage = ({ 
    src = 'https://placehold.co/600x20/orange/white',
    alt = 'Imagem de Conteúdo',
    width = '600',
}) => {
    // Estrutura HTML de email compatível (display: block, sem padding, com tabela)
    const imageTag = (
        <img 
            src={src} 
            alt={alt} 
            width={width}
            height="auto" 
            style={{ 
                display: 'block', 
                width: '100%', 
                maxWidth: `${width}px`, 
                height: 'auto', 
                border: 'none', 
                lineHeight: '100%' 
            }}
        />
    );

    return (
        <table 
            width="100%" 
            cellPadding="0" 
            cellSpacing="0" 
            border="0" 
            role="presentation"
        >
            <tbody>
                <tr>
                    <td width={width}>            
                        {imageTag}
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

export default EmailImage;