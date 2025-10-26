import React from 'react';

const Configuracoes = () => {
  return (
    <div>
      <h2 className="section-heading">Configurações do Sistema</h2>
      <p>
        Ajuste as configurações gerais do sistema da biblioteca, como prazos de
        empréstimo e regras de multa.
      </p>
      <form>
        <div className="mb-3">
          <label htmlFor="prazoEmprestimo" className="form-label">
            Prazo Padrão de Empréstimo (dias)
          </label>
          {/* Usando defaultValue, pois é uma versão estática */}
          <input
            type="number"
            className="form-control"
            id="prazoEmprestimo"
            defaultValue="15"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="valorMultaDia" className="form-label">
            Valor da Multa por Dia de Atraso (R$)
          </label>
          {/* Usando defaultValue, pois é uma versão estática */}
          <input
            type="number"
            step="0.01"
            className="form-control"
            id="valorMultaDia"
            defaultValue="0.50"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Salvar Configurações
        </button>
      </form>
    </div>
  );
};

export default Configuracoes;
