import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';

async function loadLoans() {
  try {
    const { data: loans, error } = await supabase
      .from('emprestimos')
      .select(`
        *,
        item:item_id(
          id,
          obra:obra_id(
            id,
            titulo
          )
        ),
        usuario:usuario_id(
          id,
          nome_completo
        )
      `);

    if (error) throw error;
    return loans || [];
  } catch (e) {
    console.error('Erro ao carregar empréstimos:', e);
    return [];
  }
}

async function loadBooks() {
  try {
    const { data: items, error } = await supabase
      .from('itens_acervo')
      .select(`
        id,
        codigo_barras_interno,
        obra:obra_id(
          id,
          titulo
        )
      `)
      .eq('status', 'Disponível')
      .order('codigo_barras_interno');
    
    if (error) throw error;
    return items || [];
  } catch (e) {
    console.error('Erro ao carregar itens do acervo:', e);
    return [];
  }
}

async function loadUsers() {
  try {
    const { data: users, error } = await supabase
      .from('usuarios')
      .select('id, nome_completo')
      .order('nome_completo');
    
    if (error) throw error;
    return users || [];
  } catch (e) {
    console.error('Erro ao carregar usuários:', e);
    return [];
  }
}

async function saveEmprestimo(emprestimo) {
  const { data, error } = await supabase
    .from('emprestimos')
    .upsert(emprestimo)
    .select();
  
  if (error) throw error;
  return data[0];
}

const Emprestimos = () => {
  const [loans, setLoans] = useState([]);
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    id: null,
    item_id: '',
    usuario_id: '',
    data_emprestimo: '',
    data_devolucao_prevista: '',
    status: 'Ativo'
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [loansData, booksData, usersData] = await Promise.all([
          loadLoans(),
          loadBooks(),
          loadUsers()
        ]);
        setLoans(loansData);
        setBooks(booksData);
        setUsers(usersData);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  function openNew() {
    setEditingId(null);
    setForm({
      id: null,
      livro_id: '',
      usuario_id: '',
      data_emprestimo: new Date().toISOString().slice(0,10),
      data_devolucao_prev: '',
      status: 'No prazo'
    });
    setIsModalOpen(true);
  }

  function openEdit(id) {
    const loan = loans.find(l => l.id === id);
    if (!loan) return;
    setEditingId(id);
    setForm({
      id: loan.id,
      livro_id: loan.livro_id,
      usuario_id: loan.usuario_id,
      data_emprestimo: loan.data_emprestimo,
      data_devolucao_prev: loan.data_devolucao_prev,
      status: loan.status
    });
    setIsModalOpen(true);
  }

  async function saveForm() {
    try {
      // compute status by dates if not 'Devolvido'
      const due = form.data_devolucao_prev ? new Date(form.data_devolucao_prev) : null;
      const today = new Date();
      if (due && form.status !== 'Devolvido') {
        due.setHours(0,0,0,0);
        today.setHours(0,0,0,0);
        if (due < today) form.status = 'Atrasado';
        else form.status = 'No prazo';
      }

      const savedLoan = await saveEmprestimo(form);
      
      if (editingId) {
        setLoans(prev => prev.map(l => l.id === editingId ? savedLoan : l));
      } else {
        setLoans(prev => [...prev, savedLoan]);
      }
      
      setIsModalOpen(false);
    } catch (error) {
      console.error('Erro ao salvar empréstimo:', error);
      alert('Erro ao salvar empréstimo. Verifique o console para mais detalhes.');
    }
  }

  async function registerReturn(id) {
    try {
      const { data, error } = await supabase
        .from('emprestimos')
        .update({ status: 'Devolvido', data_devolucao: new Date().toISOString() })
        .eq('id', id)
        .select();
      
      if (error) throw error;
      
      setLoans(prev => prev.map(l => l.id === id ? data[0] : l));
    } catch (error) {
      console.error('Erro ao registrar devolução:', error);
      alert('Erro ao registrar devolução. Verifique o console para mais detalhes.');
    }
  }

  async function deleteLoan(id) {
    if (!confirm('Deseja excluir este empréstimo?')) return;
    try {
      const { error } = await supabase
        .from('emprestimos')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      setLoans(prev => prev.filter(l => l.id !== id));
    } catch (error) {
      console.error('Erro ao excluir empréstimo:', error);
      alert('Erro ao excluir empréstimo. Verifique o console para mais detalhes.');
    }
  }

  function filteredLoans() {
    const q = search.trim().toLowerCase();
    return loans.filter(l => {
      if (q) {
        const hay = [
          l.id,
          l.livro?.titulo || '',
          l.usuario?.nome || ''
        ].join(' ').toLowerCase();
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
