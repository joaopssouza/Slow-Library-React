import React, { useState } from 'react';

const Acervo = () => {
  const [eanInput, setEanInput] = useState('');
  // bookDetails pode ser nulo ou um objeto com a estrutura de dados da API
  const [bookDetails, setBookDetails] = useState(null); 

  const handleSearch = () => {
    const ean = eanInput.trim();
    if (ean) {
      // Endpoint Fictício: Mantém a chamada proxy original do script.js
      fetch(`api_proxy.php?ean=${ean}`) 
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            console.error(data.error);
            setBookDetails(null); 
            return;
          }
          // Simulação de dados da API para visualização
          setBookDetails({
             title: data.title || 'Título não encontrado',
             authors: data.authors || [{name: 'Autor(es) Desconhecido(s)'}],
             publishers: data.publishers || [{name: 'Editora Desconhecida'}],
             publish_date: data.publish_date || 'N/A',
             description: data.description || 'N/A',
             cover: data.cover || 'https://placehold.co/400x600/cccccc/333333?text=Sem+Capa' // Placeholder
          });
        })
        .catch(error => {
            console.error('Erro na requisição:', error);
            setBookDetails(null);
        });
    } else {
      alert('Por favor, digite um EAN/ISBN.');
    }
  };

  return (
    <div>
      <h2 className="section-heading">Gestão do Acervo</h2>
      <p>Aqui você pode cadastrar, consultar, atualizar e excluir livros, periódicos e outros materiais. Utilize o campo abaixo para buscar informações de livros por EAN/ISBN via API.</p>

      <div className="input-group mb-3">
        <input 
          type="text" 
          className="form-control" 
          placeholder="Digite o EAN/ISBN do livro..." 
          value={eanInput}
          onChange={(e) => setEanInput(e.target.value)}
        />
        <button className="btn btn-primary" type="button" onClick={handleSearch}>Buscar por EAN/ISBN</button>
        <button className="btn btn-success ms-2" type="button">Novo Material Manual</button>
      </div>

      {/* Renderização Condicional dos Detalhes do Livro */}
      {bookDetails && (
        <div className="card p-3 mb-4">
          <h5>Detalhes do Livro Encontrado:</h5>
          <div className="row align-items-center">
            <div className="col-md-3 text-center">
              <img src={bookDetails.cover || ''} alt="Capa do Livro" className="img-fluid rounded" style={{maxHeight: '200px'}} />
            </div>
            <div className="col-md-9">
              <p><strong>Título:</strong> {bookDetails.title}</p>
              <p><strong>Autor(es):</strong> {bookDetails.authors?.map(a => a.name).join(', ')}</p>
              <p><strong>Editora:</strong> {bookDetails.publishers?.map(p => p.name).join(', ')}</p>
              <p><strong>Ano de Publicação:</strong> {bookDetails.publish_date}</p>
              <p><strong>Descrição:</strong> {bookDetails.description}</p>
              <button className="btn btn-sm btn-info mt-2">Adicionar ao Acervo</button>
            </div>
          </div>
        </div>
      )}

      <hr />
      {/* Tabela de Acervo Atual (Estático) */}
      <h4>Acervo Atual</h4>
      <div className="input-group mb-3">
        <input type="text" className="form-control" placeholder="Buscar no acervo atual..." />
        <button className="btn btn-primary" type="button">Buscar</button>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Autor(a)</th>
            <th>Categoria</th>
            <th>Disponibilidade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>001</td><td>Programação em Python</td><td>Guido van Rossum</td><td>Tecnologia</td><td className='text-success'>Disponível</td><td><button className='btn btn-sm btn-info me-1'>Detalhes</button><button className='btn btn-sm btn-warning'>Editar</button></td></tr>
          <tr><td>002</td><td>Fundamentos da Contabilidade</td><td>Maria Silva</td><td>Finanças</td><td className='text-danger'>Empr.</td><td><button className='btn btn-sm btn-info me-1'>Detalhes</button><button className='btn btn-sm btn-warning'>Editar</button></td></tr>
          <tr><td>003</td><td>História do Brasil</td><td>Vários Autores</td><td>História</td><td className='text-success'>Disponível</td><td><button className='btn btn-sm btn-info me-1'>Detalhes</button><button className='btn btn-sm btn-warning'>Editar</button></td></tr>
          <tr><td>004</td><td>Matemática para Concursos</td><td>João Costa</td><td>Educação</td><td className='text-danger'>Empr.</td><td><button className='btn btn-sm btn-info me-1'>Detalhes</button><button className='btn btn-sm btn-warning'>Editar</button></td></tr>
        </tbody>
      </table>
    </div>
  );
};

export default Acervo;