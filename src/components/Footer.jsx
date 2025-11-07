import React, { useState } from 'react';
import ChatContainer from './Chat'; // 1. Importar o novo componente

const Footer = () => {
  // 2. Adicionar estado para controlar a visibilidade do chat
  const [isChatOpen, setIsChatOpen] = useState(false);

  // 3. Função para abrir o chat (o 'onClose' será passado para o ChatContainer)
  const handleToggleChat = (e) => {
    e.preventDefault();
    setIsChatOpen(prev => !prev);
  };

  return (
    <>
      <footer>
        <div className="sidebar-footer p-3 text-center">
          <small>© 2025 Minas Code. Todos os direitos reservados.</small>
        </div>
      </footer>

      {/* 4. Atualizar o ícone para usar o handler */}
      <a 
        href="#" 
        className="chat-icon" 
        aria-label="Abrir chat online"
        onClick={handleToggleChat}
      >
        <i className="fas fa-comment-dots"></i>
      </a>

      {/* 5. Renderizar o componente de chat (ele só será visível se isChatOpen=true) */}
      <ChatContainer 
        isChatOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
      />
    </>
  );
};

export default Footer;