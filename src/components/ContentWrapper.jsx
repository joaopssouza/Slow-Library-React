import React from 'react';
import Dashboard from './sections/Dashboard';
import Acervo from './sections/Acervo';
import Emprestimos from './sections/Emprestimos'; 
import Usuarios from './sections/Usuarios';
import ReservasNotificacoes from './sections/ReservasNotificacoes';
import MultasPagamentos from './sections/MultasPagamentos';
import RelatoriosEstatisticas from './sections/RelatoriosEstatisticas';
import CanaisContato from './sections/CanaisContato';
import Configuracoes from './sections/Configuracoes';

const ContentWrapper = ({ activeSection }) => {
    const sectionMap = {
        'dashboard': <Dashboard />,
        'acervo': <Acervo />,
        'emprestimos-devolucoes': <Emprestimos />,
        'usuarios': <Usuarios />,
        'reservas-notificacoes': <ReservasNotificacoes />,
        'multas-pagamentos': <MultasPagamentos />,
        'relatorios-estatisticas': <RelatoriosEstatisticas />,
        'canais-contato': <CanaisContato />,
        'configuracoes': <Configuracoes />,
    };

    const ComponentToRender = sectionMap[activeSection] || <Dashboard />;

    return (
        <div className="container-fluid p-4">
            {ComponentToRender}
        </div>
    );
};

export default ContentWrapper;