import React from "react";

// O Wrapper não aceitará props inicialmente, ele é a estrutura rígida.
const EmailWrapper = ({ children }) => {
    // 1. O código Ampscript/Tracking do SFMC deve ser renderizado como texto puro.
    // Usamos um template literal para facilitar a leitura.
    const sfmcBoilerplate = `
%%[ set @fullName = AttributeValue("FirstName") if indexOf(@fullName, " ") > 0 then set @firstName = Substring(@fullName,1, Subtract(IndexOf(@fullName," "),1)) elseif indexOf(@fullName, ";") > 0 then set @firstName = Substring(@fullName, Add(IndexOf(@fullName, ";"), 2), Length(@fullName)) else set @firstName = AttributeValue("FirstName") endif ]%%
<custom name="opencounter" type="tracking"/>
`;

    // 2. Este componente gera o <body> (a parte editável)
    return (
        <>
            {/* Usamos dangerouslySetInnerHTML para renderizar o Ampscript e HTML de rastreamento 
              como strings puras, sem que o React tente interpretá-los como JSX.
            */}
            <div dangerouslySetInnerHTML={{ __html: sfmcBoilerplate }} />

            {/* A Tabela Mestrar de 600px */}
            <table
                width="600"
                cellSpacing="0"
                cellPadding="0"
                role="presentation"
                align="center"
                border="0"
                // Removido style={{ margin: 'auto !important', padding: 'auto !important' }} 
                // para evitar conflitos no React e confiar no atributo align="center"
            >
                <tbody>
                    <tr>
                        <td>
                            {/* Aqui, o React renderizará todos os blocos arrastados pelo usuário */}
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