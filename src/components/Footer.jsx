import React from 'react';

const Footer = () => {
  return (
    <>
      <footer>
        <div className="sidebar-footer p-3 text-center">
          <small>© 2025 Minas Code. Todos os direitos reservados.</small>
        </div>
      </footer>
      <a href="#" className="chat-icon" aria-label="Abrir chat online">
        <i className="fas fa-comment-dots"></i>
      </a>
    </>
  );
};

export default Footer;