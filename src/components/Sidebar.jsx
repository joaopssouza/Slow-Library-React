import React from 'react';

const Sidebar = ({ activeSection, onSectionChange }) => {
  const menuItems = [
    { id: 'dashboard', icon: 'fas fa-chart-line', label: 'Dashboard' },
    { id: 'acervo', icon: 'fa fa-book', label: 'Acervo' },
    { id: 'emprestimos-devolucoes', icon: 'fas fa-exchange-alt', label: 'Empréstimos/Devoluções' },
    { id: 'usuarios', icon: 'fas fa-users', label: 'Usuários' },
    { id: 'reservas-notificacoes', icon: 'fas fa-bookmark', label: 'Reservas/Notificações' },
    { id: 'multas-pagamentos', icon: 'fas fa-coins', label: 'Multas/Pagamentos' },
    { id: 'relatorios-estatisticas', icon: 'fas fa-chart-bar', label: 'Relatórios/Estatísticas' },
    { id: 'canais-contato', icon: 'fa fa-envelope', label: 'Canais de contato' },
    { id: 'configuracoes', icon: 'fas fa-cog', label: 'Configurações' }
  ];

  return (
    <div id="sidebar-wrapper">
      <div>
        <img className="imglogo" src="/img/logo.png" alt="Logo" />
      </div>
      <div className="sidebar-heading text-center p-3">
        <i className="fas fa-book-open-reader me-2"></i> 
        <span className="fw-bold">Slow Library</span>
      </div>
      <div className="list-group list-group-flush">
        {menuItems.map(item => (
          <a
            key={item.id}
            href="#"
            className={`list-group-item list-group-item-action ${activeSection === item.id ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              onSectionChange(item.id);
            }}
          >
            <i className={`${item.icon} me-2`}></i> {item.label}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;