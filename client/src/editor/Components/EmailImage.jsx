import React from 'react';

const EmailImage = ({ 
    src = 'https://image.mc.mkt-hyundai.com.br/lib/fe2911747364047c7c1d74/m/1/e5bc2443-624d-480a-b384-5f6dd24e4b24.png', // URL padrão
    alt = 'Imagem de Conteúdo',
    width = '600', // Assumimos 600px de largura total
    linkUrl = '#' // Se for um banner clicável
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
                    <td align="center" style={{ padding: '0px' }}>
                        {/* Se houver link, envolvemos na tag <a> */}
                        {linkUrl && linkUrl !== '#' ? (
                            <a href={linkUrl} target="_blank" style={{ display: 'block' }}>
                                {imageTag}
                            </a>
                        ) : (
                            imageTag
                        )}
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

export default EmailImage;