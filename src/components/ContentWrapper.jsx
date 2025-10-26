import React from 'react';
import Dashboard from './sections/Dashboard';
import Acervo from './sections/Acervo';
// Importe os outros componentes de seção (Emprestimos, Usuarios, etc.)

// Componentes estáticos para as demais seções
const StaticContent = ({ title, contentId }) => (
    <div id={contentId} className="content-section active-section">
        <h2 className="section-heading">{title}</h2>
        {/* Conteúdo estático de cada seção foi replicado aqui */}
        {/* Exemplo para Emprestimos: */}
        {contentId === 'emprestimos-devolucoes-content' && (
            <>
                <p>Gerencie todos os empréstimos e devoluções. Registre novas operações e monitore prazos.</p>
                {/* ... Resto da tabela de Empréstimos ... */}
            </>
        )}
        {/* Adicione a lógica para cada seção estática */}
    </div>
);

const ContentWrapper = ({ activeSection }) => {
    // Mapeamento de seção ativa para o componente correspondente
    const sectionMap = {
        'dashboard': <Dashboard />,
        'acervo': <Acervo />,
        'emprestimos-devolucoes': <StaticContent title="Empréstimos e Devoluções" contentId="emprestimos-devolucoes-content" />,
        'usuarios': <StaticContent title="Gestão de Usuários" contentId="usuarios-content" />,
        'reservas-notificacoes': <StaticContent title="Reservas e Notificações" contentId="reservas-notificacoes-content" />,
        'multas-pagamentos': <StaticContent title="Gestão de Multas e Pagamentos" contentId="multas-pagamentos-content" />,
        'relatorios-estatisticas': <StaticContent title="Relatórios e Estatísticas" contentId="relatorios-estatisticas-content" />,
        'canais-contato': <StaticContent title="Canais de Contato" contentId="canais-contato-content" />,
        'configuracoes': <StaticContent title="Configurações do Sistema" contentId="configuracoes-content" />,
        // ... adicione as demais seções usando StaticContent ou um componente dedicado ...
    };

    return (
        <div className="container-fluid p-4">
            {/* Renderiza o componente da seção ativa */}
            {sectionMap[activeSection] || <Dashboard />}
        </div>
    );
};

export default ContentWrapper;