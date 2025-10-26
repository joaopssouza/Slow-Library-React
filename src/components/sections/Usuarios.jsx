import React from 'react';

const Usuarios = () => {
  return (
    <div>
      <h2 className="section-heading">Gestão de Usuários</h2>
      <p>
        Cadastre novos usuários, edite informações de perfil e gerencie suas
        permissões de acesso ao sistema.
      </p>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar usuário por nome ou ID..."
          aria-label="Buscar usuário"
        />
        <button className="btn btn-primary" type="button">
          Buscar
        </button>
        <button className="btn btn-success ms-2" type="button">
          Novo Usuário
        </button>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome Completo</th>
            <th>Email</th>
            <th>Tipo de Usuário</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>U001</td>
            <td>Carlos Oliveira</td>
            <td>carlos.o@email.com</td>
            <td>Aluno</td>
            <td>
              <button className="btn btn-sm btn-info me-1">Ver Perfil</button>
              <button className="btn btn-sm btn-warning">Editar</button>
            </td>
          </tr>
          <tr>
            <td>U002</td>
            <td>Fernanda Rocha</td>
            <td>fernanda.r@email.com</td>
            <td>Professor</td>
            <td>
              <button className="btn btn-sm btn-info me-1">Ver Perfil</button>
              <button className="btn btn-sm btn-warning">Editar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Usuarios;
