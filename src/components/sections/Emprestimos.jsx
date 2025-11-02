import React, { useEffect, useState } from 'react';

const LOANS_KEY = 'slowlibrary_loans_v1';

function loadLoans() {
  try {
    const raw = localStorage.getItem(LOANS_KEY);
    if (!raw) {
      return [
        { id: 'E001', material: 'Aprenda Java', usuario: 'Ana Costa', dataEmprestimo: '2025-06-20', dataDevolucaoPrev: '2025-07-05', status: 'No prazo' },
        { id: 'E002', material: 'C++ Essencial', usuario: 'Pedro Santos', dataEmprestimo: '2025-06-10', dataDevolucaoPrev: '2025-06-24', status: 'Atrasado' }
      ];
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Erro ao carregar empréstimos:', e);
    return [];
  }
}

function saveLoans(list) {
  localStorage.setItem(LOANS_KEY, JSON.stringify(list));
}

function nextLoanId(list) {
  let max = 0;
  list.forEach(l => {
    const m = l.id && l.id.match(/E(\d+)/);
    if (m && m[1]) max = Math.max(max, Number(m[1]));
  });
  return 'E' + String(max + 1).padStart(3, '0');
}

const Emprestimos = () => {
  const [loans, setLoans] = useState(() => loadLoans());
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [form, setForm] = useState({ id: '', material: '', usuario: '', dataEmprestimo: '', dataDevolucaoPrev: '', status: 'No prazo' });

  useEffect(() => {
    saveLoans(loans);
  }, [loans]);

  function openNew() {
    setEditingIndex(null);
    setForm({ id: nextLoanId(loans), material: '', usuario: '', dataEmprestimo: new Date().toISOString().slice(0,10), dataDevolucaoPrev: '', status: 'No prazo' });
    setIsModalOpen(true);
  }

  function openEdit(idx) {
    const l = loans[idx];
    if (!l) return;
    setEditingIndex(idx);
    setForm({ ...l });
    setIsModalOpen(true);
  }

  function saveForm() {
    // compute status by dates if not 'Devolvido'
    const due = form.dataDevolucaoPrev ? new Date(form.dataDevolucaoPrev) : null;
    const today = new Date();
    if (due && form.status !== 'Devolvido') {
      due.setHours(0,0,0,0);
      today.setHours(0,0,0,0);
      if (due < today) form.status = 'Atrasado';
      else form.status = 'No prazo';
    }
    if (editingIndex !== null) {
      const copy = [...loans];
      copy[editingIndex] = { ...form };
      setLoans(copy);
    } else {
      setLoans(prev => [...prev, { ...form }]);
    }
    setIsModalOpen(false);
  }

  function registerReturn(idx) {
    const copy = [...loans];
    copy[idx].status = 'Devolvido';
    // opcional: gravar data de devolução real
    setLoans(copy);
  }

  function deleteLoan(idx) {
    if (!confirm('Deseja excluir este empréstimo?')) return;
    setLoans(prev => prev.filter((_,i) => i !== idx));
  }

  function filteredLoans() {
    const q = search.trim().toLowerCase();
    return loans.filter(l => {
      if (q) {
        const hay = (l.id + ' ' + l.usuario + ' ' + l.material).toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (filter === 'all') return true;
      if (filter === 'atrasadas') {
        if (l.status === 'Devolvido') return false;
        if (!l.dataDevolucaoPrev) return false;
        const due = new Date(l.dataDevolucaoPrev); due.setHours(0,0,0,0);
        const today = new Date(); today.setHours(0,0,0,0);
        return due < today;
      }
      if (filter === 'noprazo') {
        if (l.status === 'Devolvido') return false;
        if (!l.dataDevolucaoPrev) return true;
        const due = new Date(l.dataDevolucaoPrev); due.setHours(0,0,0,0);
        const today = new Date(); today.setHours(0,0,0,0);
        return due >= today;
      }
      if (filter === 'devolvidas') return l.status === 'Devolvido';
      return true;
    });
  }

  return (
    <div>
      <h2 className="section-heading">Empréstimos e Devoluções</h2>
      <p>Gerencie todos os empréstimos e devoluções. Registre novas operações e monitore prazos.</p>

      <div className="d-flex mb-3 gap-2">
        <input className="form-control" placeholder="Buscar por ID, usuário ou material..." value={search} onChange={e => setSearch(e.target.value)} />
        <select className="form-select" value={filter} onChange={e => setFilter(e.target.value)} style={{ maxWidth: 200 }}>
          <option value="all">Todos</option>
          <option value="atrasadas">Atrasadas</option>
          <option value="noprazo">No prazo</option>
          <option value="devolvidas">Devolvidas</option>
        </select>
        <button className="btn btn-success" onClick={openNew}>Novo Empréstimo</button>
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
          {filteredLoans().map((l, idx) => (
            <tr key={idx}>
              <td>{l.id}</td>
              <td>{l.material}</td>
              <td>{l.usuario}</td>
              <td>{l.dataEmprestimo}</td>
              <td>{l.dataDevolucaoPrev}</td>
              <td className={l.status === 'Atrasado' ? 'text-danger' : l.status === 'Devolvido' ? 'text-success' : 'text-warning'}>{l.status}</td>
              <td>
                <div className="btn-group" role="group">
                  <button className="btn btn-sm btn-primary" onClick={() => openEdit(loans.indexOf(l))}>Editar</button>
                  {l.status !== 'Devolvido' && <button className="btn btn-sm btn-success" onClick={() => registerReturn(loans.indexOf(l))}>Registrar Devolução</button>}
                  <button className="btn btn-sm btn-danger" onClick={() => deleteLoan(loans.indexOf(l))}>Excluir</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="modal d-block" tabIndex={-1} style={{ background: 'rgba(0,0,0,0.4)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{editingIndex !== null ? 'Editar Empréstimo' : 'Novo Empréstimo'}</h5>
                <button className="btn-close" onClick={() => setIsModalOpen(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-2"><label className="form-label">ID Empréstimo</label><input className="form-control" value={form.id} readOnly /></div>
                <div className="mb-2"><label className="form-label">Material</label><input className="form-control" value={form.material} onChange={e => setForm(f => ({ ...f, material: e.target.value }))} /></div>
                <div className="mb-2"><label className="form-label">Usuário</label><input className="form-control" value={form.usuario} onChange={e => setForm(f => ({ ...f, usuario: e.target.value }))} /></div>
                <div className="row">
                  <div className="col mb-2"><label className="form-label">Data Empréstimo</label><input type="date" className="form-control" value={form.dataEmprestimo} onChange={e => setForm(f => ({ ...f, dataEmprestimo: e.target.value }))} /></div>
                  <div className="col mb-2"><label className="form-label">Data Devolução Prev.</label><input type="date" className="form-control" value={form.dataDevolucaoPrev} onChange={e => setForm(f => ({ ...f, dataDevolucaoPrev: e.target.value }))} /></div>
                </div>
                <div className="mb-2"><label className="form-label">Status</label>
                  <select className="form-select" value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
                    <option value="No prazo">No prazo</option>
                    <option value="Atrasado">Atrasado</option>
                    <option value="Devolvido">Devolvido</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Cancelar</button>
                <button className="btn btn-primary" onClick={saveForm}>Salvar</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Emprestimos;
