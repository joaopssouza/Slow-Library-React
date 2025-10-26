import React from 'react';

const ReservasNotificacoes = () => {
  return (
    <div>
      <h2 className="section-heading">Reservas e Notificações</h2>
      <p>
        Monitore as reservas de materiais e as notificações enviadas aos
        usuários.
      </p>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID Reserva</th>
            <th>Material</th>
            <th>Usuário</th>
            <th>Data Reserva</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>R001</td>
            <td>Algoritmos e Estruturas de Dados</td>
            <td>Beatriz Lima</td>
            <td>2025-06-23</td>
            <td className="text-info">Pendente</td>
            <td>
              <button className="btn btn-sm btn-primary">
                Notificar Disponibilidade
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ReservasNotificacoes;
