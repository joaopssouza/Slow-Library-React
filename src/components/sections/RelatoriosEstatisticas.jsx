import React from 'react';

const RelatoriosEstatisticas = () => {
  return (
    <div>
      <h2 className="section-heading">Relatórios e Estatísticas</h2>
      <p>
        Gere relatórios detalhados sobre o uso da biblioteca, empréstimos,
        acervo e usuários.
      </p>
      <ul>
        <li>Relatório de Livros Mais Emprestados</li>
        <li>Relatório de Usuários Ativos</li>
        <li>Estatísticas de Acervo por Categoria</li>
        <li>Gráfico de Empréstimos por Período</li>
      </ul>
      <button className="btn btn-primary">Gerar Relatório Completo</button>
    </div>
  );
};

export default RelatoriosEstatisticas;
