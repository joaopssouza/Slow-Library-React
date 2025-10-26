import React from 'react';

const MultasPagamentos = () => {
  return (
    <div>
      <h2 className="section-heading">Gestão de Multas e Pagamentos</h2>
      <p>
        Acompanhe multas por atraso e registre pagamentos. Prepare o sistema
        para futuras integrações de pagamento.
      </p>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID Multa</th>
            <th>Usuário</th>
            <th>Material Atrasado</th>
            <th>Valor (R$)</th>
            <th>Status Pagamento</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>M001</td>
            <td>Lucas Pereira</td>
            <td>C++ Essencial</td>
            <td>5,50</td>
            <td className="text-danger">Pendente</td>
            <td>
              <button className="btn btn-sm btn-success">
                Registrar Pagamento
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

// LINHA DE EXPORTAÇÃO CRÍTICA PARA RESOLVER O ERRO
export default MultasPagamentos;
