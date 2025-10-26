import React from 'react';

const Dashboard = () => {
  return (
    <div>
      <div className="hero-section text-left mb-4">
        <h1 className="hero-title">Slow Library</h1>
        <p className="hero-subtitle">Sistema Integral de Gerenciamento de Biblioteca do Slow Library</p>
        <button className="btn btn-custom">Explorar Acervo</button>
      </div>

      <div className="row mb-4">
        {[
          { title: 'Livros no Acervo', value: '1.250', icon: 'fas fa-book', info: 'Atualizado em 25/06/2025' },
          { title: 'Livros Emprestados', value: '150', icon: 'fas fa-handshake', info: 'Livros atualmente fora' },
          { title: 'Livros Reservados', value: '25', icon: 'fas fa-calendar-check', info: 'Itens aguardando retirada' },
          { title: 'Usuários Ativos', value: '450', icon: 'fas fa-users-cog', info: 'Membros com acesso' }
        ].map((card, idx) => (
          <div key={idx} className="col-xl-3 col-md-6 mb-4">
            <div className="card action-card shadow-sm h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col me-2">
                    <div className="font-weight-bold text-uppercase mb-1">{card.title}</div>
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

      <h2 className="section-heading mb-3">Recomendações do Mês</h2>
      <div className="row mb-4 book-grid">
        {[
          { title: 'Harry Potter', author: 'J.K. Rowling', isbn: '9788532530783' },
          { title: 'A Sociedade do Anel', author: 'J.R.R. Tolkien', isbn: '9788595084759' },
          { title: 'O Hobbit', author: 'J.R.R. Tolkien', isbn: '9788595084742' },
          { title: 'A Guerra dos Tronos', author: 'George R.R. Martin', img: 'https://m.media-amazon.com/images/I/71FZSPKM0lL._UF1000,1000_QL80_.jpg' },
          { title: 'Mindset', author: 'Carol S. Dweck', isbn: '9788547000240' },
          { title: 'O Poder do Hábito', author: 'Charles Duhigg', isbn: '9788539004119' }
        ].map((book, idx) => (
          <div key={idx} className="col-lg-2 col-md-4 col-sm-6 mb-4">
            <div className="card book-card h-100 shadow-sm">
              <img 
                src={book.img || `https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`} 
                className="card-img-top" 
                alt={`Capa: ${book.title}`}
                onError={(e) => {e.target.src = `https://placehold.co/400x600/8e44ad/ffffff?text=${encodeURIComponent(book.title)}`}}
              />
              <div className="card-body p-2">
                <h6 className="card-title fw-bold mb-0 fs-6">{book.title}</h6>
                <small className="text-muted">{book.author}</small>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="section-heading mb-3">Últimas Notícias da Biblioteca</h2>
      <div className="row news-grid">
        {[
          { title: 'Inscrições Abertas para Clube de Leitura', date: '22 de Junho de 2025', text: 'Participe do nosso novo clube de leitura e explore grandes obras.' },
          { title: 'Nova Coleção de Periódicos Científicos', date: '18 de Junho de 2025', text: 'Ampliamos nosso acervo com os mais recentes periódicos.' },
          { title: 'Horário de Verão da Biblioteca', date: '15 de Junho de 2025', text: 'Consulte nossos novos horários de funcionamento para o verão.' }
        ].map((news, idx) => (
          <div key={idx} className="col-md-6 col-lg-4 mb-4">
            <div className="card news-card h-100">
              <div className="card-body">
                <h5 className="card-title">{news.title}</h5>
                <p className="card-text"><small className="text-muted">{news.date}</small></p>
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