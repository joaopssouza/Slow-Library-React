import React, { useState, useEffect, useRef } from 'react';

/**
 * Lógica do Bot (copiada e adaptada do seu chat.js)
 * @param {string} message - A mensagem do usuário
 * @returns {string} - A resposta do bot
 */
function getBotResponse(message) {
  message = message.toLowerCase();

  if (message.includes('horário') || message.includes('horarios') || message.includes('funcionamento')) {
    return 'Nossa biblioteca está aberta de segunda a sexta, das 8h às 20h, e aos sábados das 9h às 14h.';
  }
  if (message.includes('empréstimo') || message.includes('emprestar')) {
    return 'Para fazer um empréstimo, você precisa estar cadastrado em nosso sistema. O prazo padrão é de 15 dias, podendo ser renovado por mais 15 dias se não houver reserva.';
  }
  if (message.includes('multa') || message.includes('atraso')) {
    return 'A multa por atraso é de R$ 0,50 por dia, por livro. Você pode verificar suas multas na seção "Multas/Pagamentos".';
  }
  if (message.includes('cadastro') || message.includes('cadastrar')) {
    return 'Para se cadastrar, basta comparecer à biblioteca com um documento de identificação e comprovante de residência.';
  }
  return 'Desculpe, não entendi sua pergunta. Por favor, tente reformular ou procure um de nossos atendentes para ajuda mais específica.';
}

/**
 * Componente da Janela de Chat
 * @param {object} props
 * @param {boolean} props.isChatOpen - Se o chat deve estar visível
 * @param {function} props.onClose - Função para fechar o chat
 */
const ChatContainer = ({ isChatOpen, onClose }) => {
  // Estado para a lista de mensagens
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Olá! Como posso ajudar você hoje?' }
  ]);
  // Estado para o campo de input (controlado)
  const [inputValue, setInputValue] = useState('');
  
  // Ref para o container de mensagens para podermos rolar para baixo
  const messagesEndRef = useRef(null);

  // Função para rolar para a última mensagem
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Efeito que rola para baixo sempre que uma nova mensagem é adicionada
  useEffect(scrollToBottom, [messages]);

  // Função para lidar com o envio de mensagem
  const handleSendMessage = () => {
    const userMessage = inputValue.trim();
    if (!userMessage) return;

    // Adiciona a mensagem do usuário ao estado
    const newUserMessages = [...messages, { from: 'user', text: userMessage }];
    setMessages(newUserMessages);
    
    // Limpa o input
    setInputValue('');

    // Simula a resposta do bot (do seu chat.js)
    setTimeout(() => {
      const botMessageText = getBotResponse(userMessage);
      setMessages(prevMessages => [
        ...prevMessages, 
        { from: 'bot', text: botMessageText }
      ]);
    }, 1000);
  };

  // Lida com o "Enter" no input
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Se não estiver aberto, não renderiza nada
  if (!isChatOpen) {
    return null;
  }

  // Renderiza a janela do chat
  return (
    <div className="chat-container active">
      <div className="chat-header">
        <h3>Atendimento Online</h3>
        <button className="close-chat" onClick={onClose}>&times;</button>
      </div>
      
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.from}`}>
            {msg.text}
          </div>
        ))}
        {/* Elemento âncora para rolar para o final */}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input">
        <input 
          type="text" 
          placeholder="Digite sua mensagem.." 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleSendMessage}>Enviar</button>
      </div>
    </div>
  );
};

export default ChatContainer;