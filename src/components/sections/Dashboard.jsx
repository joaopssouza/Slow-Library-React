import React, { useState, useEffect, useRef } from "react";

// Dados dos livros para o carousel
const bookData = [
  { title: "Harry Potter", author: "J.K. Rowling", isbn: "9788532511010" }, // Pedra Filosofal
  { title: "A Sociedade do Anel", author: "J.R.R. Tolkien", isbn: "9788595084759" },
  { title: "O Hobbit", author: "J.R.R. Tolkien", isbn: "9788595084742" },
  { title: "A Guerra dos Tronos", author: "George R.R. Martin", img: "https://m.media-amazon.com/images/I/71FZSPKM0lL._UF1000,1000_QL80_.jpg" },
  { title: "Mindset", author: "Carol S. Dweck", isbn: "9788547000240" },
  { title: "O Poder do Hábito", author: "Charles Duhigg", isbn: "9788539004119" },
  { title: "O Nome do Vento", author: "Patrick Rothfuss", isbn: "9788599296494", img: "https://m.media-amazon.com/images/I/81CGmkRG9GL._SL1500_.jpg" },
  { title: "O Temor do Sábio", author: "Patrick Rothfuss", isbn: "9788580410327" }, // Corrigido
  { title: "Eragon", author: "Christopher Paolini", isbn: "9786555322910", img: "https://m.media-amazon.com/images/I/71Fx8uE3oxL._SL1181_.jpg" }, // Corrigido
  { title: "Eldest", author: "Christopher Paolini", isbn: "9788532520753", img: "https://m.media-amazon.com/images/I/91fyCznZ6XL._SL1500_.jpg" }, // Corrigido
  { title: "Brisingr", author: "Christopher Paolini", isbn: "9788561384494", img: "https://m.media-amazon.com/images/I/919rZwLTTrL._SL1500_.jpg" }, // Corrigido
  { title: "A Rainha Vermelha", author: "Victoria Aveyard", isbn: "9788565765695" },
  { title: "A Seleção", author: "Kiera Cass", isbn: "9788565765015", img: "https://m.media-amazon.com/images/I/81ql6xkkliL._SL1500_.jpg" },
  { title: "O Lado Bom da Vida", author: "Matthew Quick", isbn: "9788580572773", img: "https://m.media-amazon.com/images/I/91q0bMbRFCL._SL1500_.jpg" }, // Corrigido
  { title: "A Sutil Arte de Ligar o F*da-se", author: "Mark Manson", isbn: "9788551002496", img: "https://m.media-amazon.com/images/I/6175IU0qFgL._SL1000_.jpg" }, // Corrigido
  { title: "Essencialismo", author: "Greg McKeown", isbn: "9788543102146", img: "https://m.media-amazon.com/images/I/71HuZRl-XeL._SL1500_.jpg" }, // Corrigido
  { title: "Os Segredos da Mente Milionária", author: "T. Harv Eker", isbn: "9788575422397" },
  { title: "Pai Rico, Pai Pobre", author: "Robert T. Kiyosaki", isbn: "9788550801483" }, // Corrigido
  { title: "Quem Pensa Enriquece", author: "Napoleon Hill", isbn: "9786587885004", img: "https://m.media-amazon.com/images/I/61x4XUF8zvL._SL1360_.jpg" }, // Corrigido
  { title: "O Milagre da Manhã", author: "Hal Elrod", isbn: "9788576849940" },
  { title: "Do Mil ao Milhão", author: "Thiago Nigro", isbn: "9788595083271" } // Corrigido
];

// Para simular o loop infinito, duplicamos os dados
const carouselItems = [...bookData, ...bookData];

// Componente para um único cartão de livro
const BookCard = ({ book }) => (
  <div className="book-card-item">
    <div className="card book-card h-100 shadow-sm">
      <img
        src={
          book.img || `https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`
        }
        className="card-img-top"
        alt={`Capa: ${book.title}`}
        onError={(e) => {
          e.target.src = `https://placehold.co/400x600/8e44ad/ffffff?text=${encodeURIComponent(
            book.title
          )}`;
        }}
      />
      <div className="card-body p-2">
        <h6 className="card-title fw-bold mb-0 fs-6">{book.title}</h6>
        <small className="text-muted">{book.author}</small>
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  // 1. Lógica do Carousel
  const [currentIndex, setCurrentIndex] = useState(0);
  const trackRef = useRef(null);
  const itemWidth = 180; // Largura do item + margem (160px + 20px)
  const totalItems = bookData.length;
  const speed = 25; // Intervalo em milissegundos
  const moveDistance = 1; // Distância em pixels por tick (suavidade)

  useEffect(() => {
    // Inicia o movimento automático
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => prevIndex + moveDistance);
    }, speed);

    // Limpa o intervalo ao desmontar o componente
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (trackRef.current) {
      const trackElement = trackRef.current;
      const fullScrollWidth = totalItems * itemWidth;

      // Aplica a transformação para o movimento
      trackElement.style.transform = `translateX(-${currentIndex}px)`;

      // Lógica do loop infinito: quando o track se move o equivalente à largura dos itens originais
      if (currentIndex >= fullScrollWidth) {
        // Resetar a transformação imediatamente para o início da cópia
        trackElement.style.transition = "none";
        setCurrentIndex(0);

        // Forçar um reflow para que a transição seja reativada no próximo movimento
        void trackElement.offsetHeight;

        // Reativar a transição suave para o próximo movimento
        setTimeout(() => {
          if (trackRef.current) {
            trackRef.current.style.transition = `transform ${
              speed / 1000
            }s linear`;
          }
        }, 50);
      } else if (trackElement.style.transition === "none" && currentIndex > 0) {
        // Reativar a transição suave após o reset (garantia)
        trackElement.style.transition = `transform ${speed / 1000}s linear`;
      }
    }
  }, [currentIndex, totalItems, itemWidth, speed]);

  // 2. Renderização do Dashboard
  return (
    <div id="dashboard-content" className="content-section active-section">
      {/* Hero Section */}
      <div className="hero-section text-left mb-4">
        <h1 className="hero-title">Slow Library</h1>
        <p className="hero-subtitle">
          Sistema Integral de Gerenciamento de Biblioteca do Slow Library
        </p>
        <button className="btn btn-custom">Explorar Acervo</button>
      </div>

      {/* Cards de Ação (Mantidos Estáticos) */}
      <div className="row mb-4">
        {[
          {
            title: "Livros no Acervo",
            value: "1.250",
            icon: "fas fa-book",
            info: "Atualizado em 25/06/2025",
          },
          {
            title: "Livros Emprestados",
            value: "150",
            icon: "fas fa-handshake",
            info: "Livros atualmente fora",
          },
          {
            title: "Livros Reservados",
            value: "25",
            icon: "fas fa-calendar-check",
            info: "Itens aguardando retirada",
          },
          {
            title: "Usuários Ativos",
            value: "450",
            icon: "fas fa-users-cog",
            info: "Membros com acesso",
          },
        ].map((card, idx) => (
          <div key={idx} className="col-xl-3 col-md-6 mb-4">
            <div className="card action-card shadow-sm h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col me-2">
                    <div className="font-weight-bold text-uppercase mb-1">
                      {card.title}
                    </div>
                    <div className="h5 mb-0 font-weight-bold">{card.value}</div>
                  </div>
                  <div className="col-auto">
                    <i className={`${card.icon} fa-2x text-gray-300`}></i>
                  </div>
                </div>
                <small className="text-muted mt-2 d-block">{card.info}</small>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CARROSSEL DE LIVROS (NOVA IMPLEMENTAÇÃO) */}
      <h2 className="section-heading mb-3">Recomendações do Mês</h2>
      <div className="carousel-container book-grid mb-4">
        <div
          className="carousel-track"
          ref={trackRef}
          // A transição será controlada dinamicamente via JS para o loop infinito
          style={{ transition: `transform 0.0s linear` }}
        >
          {carouselItems.map((book, idx) => (
            // A key usa o índice e o título para ser única
            <BookCard key={idx + book.title} book={book} />
          ))}
        </div>
      </div>

      {/* Últimas Notícias (Mantidas Estáticas) */}
      <h2 className="section-heading mb-3">Últimas Notícias da Biblioteca</h2>
      <div className="row news-grid">
        {[
          {
            title: "Inscrições Abertas para Clube de Leitura",
            date: "22 de Junho de 2025",
            text: "Participe do nosso novo clube de leitura e explore grandes obras.",
          },
          {
            title: "Nova Coleção de Periódicos Científicos",
            date: "18 de Junho de 2025",
            text: "Ampliamos nosso acervo com os mais recentes periódicos.",
          },
          {
            title: "Horário de Verão da Biblioteca",
            date: "15 de Junho de 2025",
            text: "Consulte nossos novos horários de funcionamento para o verão.",
          },
        ].map((news, idx) => (
          <div key={idx} className="col-md-6 col-lg-4 mb-4">
            <div className="card news-card h-100">
              <div className="card-body">
                <h5 className="card-title">{news.title}</h5>
                <p className="card-text">
                  <small className="text-muted">{news.date}</small>
                </p>
                <p className="card-text">{news.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
