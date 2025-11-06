import React, { useState, useEffect } from 'react';
// Importa o cliente Supabase que criamos
import { supabase } from '../../supabaseClient'; 

// Componente de Modal para Adição Manual (ManualAddModal)
// Usamos props para controle e preenchimento (Cenário B)
const ManualAddModal = ({ show, onClose, initialEan, onSave }) => {
  const [formData, setFormData] = useState({
    ean_isbn: initialEan || '',
    titulo: '',
    autor: '',
    editora: '',
    ano_publicacao: '',
    categoria: 'Tecnologia', // Valor padrão
  });

  // Atualiza o EAN se a props 'initialEan' mudar (ex: busca falhou)
  useEffect(() => {
    setFormData(prev => ({ ...prev, ean_isbn: initialEan || '' }));
  }, [initialEan]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    setFormData({ // Reseta o formulário
      ean_isbn: '', titulo: '', autor: '', editora: '', ano_publicacao: '', categoria: 'Tecnologia',
    });
  };

  if (!show) return null;

  return (
    <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">Adicionar Livro Manualmente</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">EAN/ISBN</label>
                  <input type="text" name="ean_isbn" className="form-control" value={formData.ean_isbn} onChange={handleChange} required />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Título</label>
                  <input type="text" name="titulo" className="form-control" value={formData.titulo} onChange={handleChange} required />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Autor(es)</label>
                  <input type="text" name="autor" className="form-control" value={formData.autor} onChange={handleChange} />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Editora</label>
                  <input type="text" name="editora" className="form-control" value={formData.editora} onChange={handleChange} />
                </div>
              </div>
              <div className="row">
                 <div className="col-md-6 mb-3">
                  <label className="form-label">Ano de Publicação</label>
                  <input type="text" name="ano_publicacao" className="form-control" value={formData.ano_publicacao} onChange={handleChange} />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Categoria</label>
                  <select name="categoria" className="form-select" value={formData.categoria} onChange={handleChange}>
                    <option>Tecnologia</option>
                    <option>Finanças</option>
                    <option>História</option>
                    <option>Educação</option>
                    <option>Ficção</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>Cancelar</button>
              <button type="submit" className="btn btn-primary">Salvar no Acervo</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Componente de Modal de Confirmação da API (BookApiModal)
const BookApiModal = ({ show, onClose, bookData, onSave }) => {
  if (!show || !bookData) return null;

  const handleSaveClick = () => {
    // Mapeia os dados da API para o schema do Supabase
    const bookToSave = {
      ean_isbn: bookData.ean,
      titulo: bookData.title,
      autor: bookData.authors.join(', '),
      editora: bookData.publisher,
      ano_publicacao: bookData.publishedDate,
      // 'categoria' pode não vir da API, então definimos um padrão
      categoria: 'Desconhecida', 
      // Adicionamos a capa para referência, se o schema permitir
      // cover_url: bookData.coverUrl 
    };
    onSave(bookToSave);
  };

  return (
    <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirmar Livro Encontrado</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <h5>Detalhes do Livro Encontrado (Cenário A):</h5>
            <div className="row align-items-center">
              <div className="col-md-3 text-center">
                <img src={bookData.coverUrl} alt="Capa do Livro" className="img-fluid rounded" style={{ maxHeight: '200px' }} />
              </div>
              <div className="col-md-9">
                <p><strong>Título:</strong> {bookData.title}</p>
                <p><strong>Autor(es):</strong> {bookData.authors.join(', ')}</p>
                <p><strong>Editora:</strong> {bookData.publisher}</p>
                <p><strong>Ano:</strong> {bookData.publishedDate}</p>
                <p><strong>EAN/ISBN:</strong> {bookData.ean}</p>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancelar</button>
            <button type="button" className="btn btn-success" onClick={handleSaveClick}>Adicionar ao Acervo</button>
          </div>
        </div>
      </div>
    </div>
  );
};


// Componente Principal do Acervo
const Acervo = () => {
  const [eanInput, setEanInput] = useState('');
  const [acervoList, setAcervoList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchError, setSearchError] = useState('');

  // Estados para os Modais
  const [showApiModal, setShowApiModal] = useState(false);
  const [showManualModal, setShowManualModal] = useState(false);
  
  // Dados para os modais
  const [selectedBook, setSelectedBook] = useState(null); // (Cenário A)
  const [manualEan, setManualEan] = useState(''); // (Cenário B)

  // 1. Busca dados do Supabase ao carregar o componente
  useEffect(() => {
    fetchAcervo();
  }, []);

  // Função para buscar a lista do acervo no Supabase
  const fetchAcervo = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('acervo') // ATENÇÃO: 'acervo' deve ser o nome da sua tabela no Supabase
      .select('*')
      .order('id', { ascending: false }); // Exibe os mais novos primeiro

    if (error) {
      console.error('Erro ao buscar acervo:', error.message);
      setAcervoList([]); // Limpa a lista em caso de erro
    } else {
      setAcervoList(data);
    }
    setLoading(false);
  };

  // 2. Lógica de Busca (APIs Externas) - Conforme o fluxo
  const handleSearch = async () => {
    const ean = eanInput.trim();
    if (!ean) {
      alert('Por favor, digite um EAN/ISBN.');
      return;
    }

    setLoading(true);
    setSearchError('');
    let bookData = null;

    try {
      // API 1: Google Books (Preferencial)
      bookData = await searchGoogleBooks(ean);

      if (!bookData) {
        // API 2: OpenLibrary (Fallback)
        bookData = await searchOpenLibrary(ean);
      }

      if (bookData) {
        // SUCESSO - Cenário A
        setSelectedBook(bookData);
        setShowApiModal(true);
      } else {
        // FALHA - Cenário B
        setSearchError('Livro não encontrado em nenhuma API. Abrindo adição manual...');
        setManualEan(ean); // Preenche o EAN para o modal manual
        setShowManualModal(true);
      }

    } catch (error) {
      console.error("Erro na cadeia de busca:", error);
      setSearchError('Ocorreu um erro ao buscar. Tente adicionar manualmente.');
      // FALHA (Erro) - Cenário B
      setManualEan(ean);
      setShowManualModal(true);
    }
    setLoading(false);
  };

  // 3. Funções de Lógica das APIs (Internas)

  // API 1
  const searchGoogleBooks = async (ean) => {
    try {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${ean}`);
      const data = await response.json();
      if (data.totalItems > 0) {
        const item = data.items[0].volumeInfo;
        return {
          ean: ean,
          title: item.title,
          authors: item.authors || ['Desconhecido'],
          publisher: item.publisher || 'Desconhecida',
          publishedDate: item.publishedDate ? item.publishedDate.substring(0, 4) : 'N/A',
          coverUrl: item.imageLinks?.thumbnail || `https://placehold.co/128x192/8e44ad/ffffff?text=${encodeURIComponent(item.title)}`
        };
      }
      return null;
    } catch (e) { console.warn("Google Books falhou:", e); return null; }
  };

  // API 2
  const searchOpenLibrary = async (ean) => {
    try {
      const response = await fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${ean}&format=json&jscmd=data`);
      const data = await response.json();
      const bookKey = `ISBN:${ean}`;
      if (data[bookKey]) {
        const item = data[bookKey];
        return {
          ean: ean,
          title: item.title,
          authors: item.authors ? item.authors.map(a => a.name) : ['Desconhecido'],
          publisher: item.publishers ? item.publishers.map(p => p.name).join(', ') : 'Desconhecida',
          publishedDate: item.publish_date || 'N/A',
          coverUrl: item.cover?.medium || `https://placehold.co/128x192/2c3e50/ffffff?text=${encodeURIComponent(item.title)}`
        };
      }
      return null;
    } catch (e) { console.warn("OpenLibrary falhou:", e); return null; }
  };

  // 4. Funções de Salvamento (Supabase)

  // Salva o livro vindo da API (Cenário A)
  const handleApiAdd = async (bookData) => {
    const { error } = await supabase.from('acervo').insert([bookData]);
    if (error) {
      alert('Erro ao salvar no Supabase: ' + error.message);
    } else {
      alert('Livro adicionado com sucesso!');
      setShowApiModal(false);
      setSelectedBook(null);
      fetchAcervo(); // Atualiza a lista
    }
  };

  // Salva o livro vindo do Modal Manual (Cenário B ou Botão Verde)
  const handleManualAdd = async (formData) => {
    const { error } = await supabase.from('acervo').insert([formData]);
    if (error) {
      alert('Erro ao salvar no Supabase: ' + error.message);
    } else {
      alert('Livro adicionado com sucesso!');
      setShowManualModal(false);
      setManualEan('');
      fetchAcervo(); // Atualiza a lista
    }
  };

  // 5. Botão Verde (Adicionar Manualmente)
  const handleShowManualModal = () => {
    setManualEan(''); // Abre o modal com EAN em branco
    setShowManualModal(true);
  };

  // 6. Renderização
  return (
    <div>
      {/* Renderiza os Modais (eles controlam a própria visibilidade) */}
      <BookApiModal
        show={showApiModal}
        onClose={() => setShowApiModal(false)}
        bookData={selectedBook}
        onSave={handleApiAdd}
      />
      
      <ManualAddModal
        show={showManualModal}
        onClose={() => setShowManualModal(false)}
        initialEan={manualEan} // Preenche se a busca falhou (Cenário B)
        onSave={handleManualAdd}
      />

      {/* Cabeçalho e Ações */}
      <h2 className="section-heading">Gestão do Acervo</h2>
      <p>Utilize o campo abaixo para buscar informações de livros por EAN/ISBN via API ou adicione manualmente.</p>

      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Digite o EAN/ISBN do livro..."
          value={eanInput}
          onChange={(e) => setEanInput(e.target.value)}
          disabled={loading}
        />
        <button className="btn btn-primary" type="button" onClick={handleSearch} disabled={loading}>
          {loading ? 'Buscando...' : 'Buscar por EAN/ISBN'}
        </button>
        <button className="btn btn-success ms-2" type="button" onClick={handleShowManualModal} disabled={loading}>
          Adicionar Manualmente
        </button>
      </div>

      {searchError && <div className="alert alert-warning">{searchError}</div>}

      <hr />

      {/* Tabela de Acervo Atual (Dinâmica) */}
      <h4>Acervo Atual</h4>
      <div className="input-group mb-3">
        <input type="text" className="form-control" placeholder="Buscar no acervo local..." />
        <button className="btn btn-primary" type="button">Buscar</button>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Autor(a)</th>
            <th>Categoria</th>
            <th>EAN/ISBN</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {loading && (
            <tr>
              <td colSpan="6" className="text-center">Carregando acervo...</td>
            </tr>
          )}
          {!loading && acervoList.length === 0 && (
             <tr>
              <td colSpan="6" className="text-center">Nenhum item encontrado no acervo.</td>
            </tr>
          )}
          {acervoList.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.titulo}</td>
              <td>{item.autor}</td>
              <td>{item.categoria}</td>
              <td>{item.ean_isbn}</td>
              <td>
                <button className='btn btn-sm btn-info me-1'>Detalhes</button>
                <button className='btn btn-sm btn-warning'>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Acervo;