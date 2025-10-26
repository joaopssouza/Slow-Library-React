import React from 'react';

const Emprestimos = () => {
  return (
    <div>
      <h2 className="section-heading">Empréstimos e Devoluções</h2>
      <p>
        Gerencie todos os empréstimos e devoluções. Registre novas operações e
        monitore prazos.
      </p>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar empréstimo por ID ou usuário..."
          aria-label="Buscar empréstimo"
        />
        <button className="btn btn-primary" type="button">
          Buscar
        </button>
        <button className="btn btn-success ms-2" type="button">
          Novo Empréstimo
        </button>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID Empréstimo</th>
            <th>Material</th>
            <th>Usuário</th>
            <th>Data Empréstimo</th>
            <th>Data Devolução Prev.</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>E001</td>
            <td>Aprenda Java</td>
            <td>Ana Costa</td>
            <td>2025-06-20</td>
            <td>2025-07-05</td>
            <td className="text-warning">No prazo</td>
            <td>
              <button className="btn btn-sm btn-success">
                Registrar Devolução
              </button>
            </td>
          </tr>
          <tr>
            <td>E002</td>
            <td>C++ Essencial</td>
            <td>Pedro Santos</td>
            <td>2025-06-10</td>
            <td>2025-06-24</td>
            <td className="text-danger">Atrasado</td>
            <td>
              <button className="btn btn-sm btn-success">
                Registrar Devolução
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Emprestimos;
