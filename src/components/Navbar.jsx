import React from 'react';

const Navbar = ({ onToggleSidebar }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
      <div className="container-fluid">
        {/* CORREÇÃO: Removida a classe d-md-none para que o botão seja visível em desktop e ative o toggle */}
        <button className="btn btn-primary" onClick={onToggleSidebar}>
          <i className="fas fa-bars"></i>
        </button>
        {/* Ícones de Notificação e Usuário */}
        <ul className="navbar-nav ms-auto mt-2 mt-lg-0 align-items-center flex-row">
          <li className="nav-item">
            <a className="nav-link text-secondary position-relative" href="#">
              <i className="fas fa-bell fs-5"></i>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{fontSize: '0.6em'}}>
                3
                <span className="visually-hidden">notificações não lidas</span>
              </span>
            </a>
          </li>
          <li className="nav-item ms-3">
            <a className="nav-link text-secondary position-relative" href="#">
              <i className="fas fa-envelope fs-5"></i>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary" style={{fontSize: '0.6em'}}>
                5
                <span className="visually-hidden">mensagens não lidas</span>
              </span>
            </a>
          </li>
          <li className="nav-item dropdown ms-4">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <img src="https://placehold.co/40x40/cccccc/333333?text=Admin" className="rounded-circle avatar me-2" alt="User Avatar" />
              Bibliotecário(a)
            </a>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
              <li><a className="dropdown-item" href="#">Minha Conta</a></li>
              <li><hr className="dropdown-divider" /></li>
              <li><a className="dropdown-item" href="#">Sair</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;