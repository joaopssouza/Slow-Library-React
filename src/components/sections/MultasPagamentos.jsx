import React, { useEffect, useState } from 'react';

const STORAGE_KEY = 'slowlibrary_multas_v1';
const DEFAULT_FINE_PER_DAY = 0.5; // R$ por dia de atraso
const OBS_MAX = 250; // limite médio de caracteres para observações

function loadMultas() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Erro ao carregar multas:', e);
    return [];
  }
}

function saveMultas(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

function generateNextId(list) {
  let max = 0;
  list.forEach(m => {
    const r = m.id && m.id.match(/M(\d+)/);
    if (r && r[1]) max = Math.max(max, Number(r[1]));
  });
  return 'M' + String(max + 1).padStart(3, '0');
}

const MultasPagamentos = () => {
  const [multas, setMultas] = useState(() => loadMultas());
  const [filter, setFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [form, setForm] = useState({
    id: '',
    usuarioId: '',
    usuarioNome: '',
    usuarioManual: '',
    material: '',
    valor: '',
    dataMulta: '',
    diasAtraso: 0,
    status: 'Pendente',
    dataPagamento: '',
    observacoes: ''
  });

  // Tenta extrair materiais do Acervo (tabela estática) para popular select
  function getMaterialsFromAcervo() {
    try {
      const tables = Array.from(document.querySelectorAll('table'));
      for (const t of tables) {
        // encontrar tabela cujo header contenha "Título" ou "Título" (Acervo)
        const ths = Array.from(t.querySelectorAll('thead th')).map(n => n.textContent.trim().toLowerCase());
        if (ths.includes('título') || ths.includes('título') || ths.includes('título')) {
          const rows = Array.from(t.querySelectorAll('tbody tr'));
          return rows.map(r => {
            const tds = r.querySelectorAll('td');
            return { id: (tds[0] && tds[0].textContent.trim()) || '', title: (tds[1] && tds[1].textContent.trim()) || '' };
          }).filter(x => x.title);
        }
      }
    } catch (e) {
      console.error('Erro ao ler acervo:', e);
    }
    // fallback estático
    return [
      { id: '001', title: 'Programação em Python' },
      { id: '002', title: 'Fundamentos da Contabilidade' },
      { id: '003', title: 'História do Brasil' },
      { id: '004', title: 'Matemática para Concursos' }
    ];
  }

  const [materials, setMaterials] = useState(getMaterialsFromAcervo());

  // Extrai usuários da seção Usuarios (tabela estática) para popular select
  function getUsersFromUsuarios() {
    try {
      const tables = Array.from(document.querySelectorAll('table'));
      for (const t of tables) {
        const ths = Array.from(t.querySelectorAll('thead th')).map(n => n.textContent.trim().toLowerCase());
        // procura tabela de Usuários pela presença de 'nome' e 'email' nos headers
        if (ths.includes('nome completo') || (ths.includes('nome') && ths.includes('email'))) {
          const rows = Array.from(t.querySelectorAll('tbody tr'));
          return rows.map(r => {
            const tds = r.querySelectorAll('td');
            return { id: (tds[0] && tds[0].textContent.trim()) || '', name: (tds[1] && tds[1].textContent.trim()) || '' };
          }).filter(x => x.name);
        }
      }
    } catch (e) {
      console.error('Erro ao ler usuários:', e);
    }
    // fallback estático
    return [
      { id: 'U001', name: 'Carlos Oliveira' },
      { id: 'U002', name: 'Fernanda Rocha' }
    ];
  }

  const [users, setUsers] = useState(getUsersFromUsuarios());

  const LOANS_KEY = 'slowlibrary_loans_v1';
  function loadLoansFromStorage() {
    try {
      const raw = localStorage.getItem(LOANS_KEY);
      if (!raw) return [];
      return JSON.parse(raw);
    } catch (e) {
      console.error('Erro ao ler empréstimos do storage:', e);
      return [];
    }
  }

  useEffect(() => {
    // Re-sincroniza materiais quando o componente monta (caso Acervo seja carregado depois)
    const t = setTimeout(() => setMaterials(getMaterialsFromAcervo()), 300);
    // também atualiza lista de usuários
    setUsers(getUsersFromUsuarios());
    // detecta empréstimos atrasados lendo do storage (sincroniza com Emprestimos.jsx)
    const loans = loadLoansFromStorage();
    if (loans && loans.length) {
      const today = new Date(); today.setHours(0,0,0,0);
      loans.forEach(loan => {
        if (!loan.dataDevolucaoPrev) return;
        const due = new Date(loan.dataDevolucaoPrev); due.setHours(0,0,0,0);
        const statusLower = (loan.status || '').toLowerCase();
        const isReturned = statusLower.includes('devol');
        if (due < today && !isReturned) {
          // verifica se já existe multa para esse empréstimo
          const exists = multas.some(m => m.loanId === loan.id || (m.usuarioNome === loan.usuario && m.material === loan.material && m.dataMulta && new Date(m.dataMulta) >= due));
          if (!exists) {
            const days = Math.max(1, Math.ceil((today - due) / (1000*60*60*24)) );
            const valor = Number((days * DEFAULT_FINE_PER_DAY).toFixed(2));
            const matched = users.find(u => u.name === loan.usuario || u.id === loan.usuario);
            const newMulta = {
              id: generateNextId(multas),
              loanId: loan.id,
              usuarioId: matched ? matched.id : '',
              usuarioNome: matched ? matched.name : loan.usuario,
              material: loan.material,
              valor: valor,
              dataMulta: today.toISOString().slice(0,10),
              diasAtraso: days,
              status: 'Pendente',
              dataPagamento: '',
              observacoes: 'Gerada automaticamente por atraso do empréstimo.'
            };
            setMultas(prev => [...prev, newMulta]);
          }
        }
      });
    }
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    saveMultas(multas);
  }, [multas]);

  function openNew() {
    setEditingIndex(null);
    setForm({
      id: generateNextId(multas),
      usuarioId: users[0] ? users[0].id : '',
      usuarioNome: users[0] ? users[0].name : '',
      usuarioManual: '',
      material: materials[0] ? materials[0].title : '',
      valor: '',
      dataMulta: new Date().toISOString().slice(0, 10),
      diasAtraso: 0,
      status: 'Pendente',
      dataPagamento: '',
      observacoes: ''
    });
    setIsModalOpen(true);
  }

  function openEdit(idx) {
    const m = multas[idx];
    if (!m) return;
    setEditingIndex(idx);
    // se a multa armazenar usuarioId/nome use, senão tente mapear pelo nome
    if (m.usuarioId) {
      setForm({ ...m, usuarioId: m.usuarioId, usuarioNome: m.usuarioNome || '', usuarioManual: '' });
    } else if (m.usuario) {
      // entradas antigas podem ter apenas 'usuario' (nome)
      const matched = users.find(u => u.name === m.usuario || u.id === m.usuario);
      if (matched) {
        setForm({ ...m, usuarioId: matched.id, usuarioNome: matched.name, usuarioManual: '' });
      } else {
        setForm({ ...m, usuarioId: '', usuarioNome: '', usuarioManual: m.usuario || '' });
      }
    } else {
      setForm({ ...m, usuarioId: '', usuarioNome: '', usuarioManual: '' });
    }
    setIsModalOpen(true);
  }

  function handleSave() {
    // validações básicas
    const usuarioId = form.usuarioId && form.usuarioId.trim() ? form.usuarioId.trim() : '';
    const usuarioNome = usuarioId ? (users.find(u => u.id === usuarioId)?.name || form.usuarioNome || '') : (form.usuarioManual || '').trim();
    if (!usuarioNome || !form.material) {
      alert('Preencha usuário e material.');
      return;
    }
    const valorCalc = Number(form.valor) || 0;
    const entry = {
      id: form.id,
      usuarioId: usuarioId || '',
      usuarioNome: usuarioNome,
      material: form.material,
      valor: Number((valorCalc).toFixed(2)),
      dataMulta: form.dataMulta,
      diasAtraso: form.diasAtraso,
      status: form.status,
      dataPagamento: form.dataPagamento,
      observacoes: form.observacoes
    };
    if (editingIndex !== null) {
      const copy = [...multas];
      copy[editingIndex] = entry;
      setMultas(copy);
    } else {
      setMultas(prev => [...prev, entry]);
    }
    setIsModalOpen(false);
  }

  function handleDelete(idx) {
    if (!confirm('Deseja realmente excluir esta multa?')) return;
    setMultas(prev => prev.filter((_, i) => i !== idx));
  }

  function registerPayment(idx) {
    const copy = [...multas];
    copy[idx].status = 'Pago';
    copy[idx].dataPagamento = new Date().toISOString().slice(0, 10);
    setMultas(copy);
  }

  function cancelMulta(idx) {
    if (!confirm('Deseja cancelar esta multa?')) return;
    const copy = [...multas];
    copy[idx].status = 'Cancelado';
    setMultas(copy);
  }

  function calculateValor() {
    const dias = Number(form.diasAtraso) || 0;
    const v = dias * DEFAULT_FINE_PER_DAY;
    setForm(f => ({ ...f, valor: v.toFixed(2) }));
  }

  const filtered = multas.filter(m => {
    const f = filter.trim().toLowerCase();
    if (!f) return true;
    const hay = ((m.id || '') + ' ' + (m.usuarioId || '') + ' ' + (m.usuarioNome || m.usuario || '') + ' ' + (m.material || '')).toLowerCase();
    return hay.includes(f);
  });

  return (
    <div>
      <h2 className="section-heading">Gestão de Multas e Pagamentos</h2>
      <p>Acompanhe multas por atraso e registre pagamentos. Configure valores e registre observações.</p>

      <div className="d-flex mb-3 gap-2">
        <input className="form-control" placeholder="Buscar por ID, usuário ou material..." value={filter} onChange={e => setFilter(e.target.value)} />
        <button className="btn btn-success" onClick={openNew}>Nova Multa</button>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID Multa</th>
            <th>Usuário</th>
            <th>Material Atrasado</th>
            <th>Valor (R$)</th>
            <th>Status</th>
            <th>Data Pagamento</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 && (
            <tr><td colSpan={7} className="text-center">Nenhuma multa encontrada.</td></tr>
          )}
          {filtered.map((m, i) => (
            <tr key={i}>
              <td>{m.id}</td>
              <td>{m.usuarioNome || m.usuario || '-'}</td>
              <td>{m.material}</td>
              <td>{Number(m.valor).toFixed(2)}</td>
              <td className={m.status === 'Pendente' ? 'text-danger' : m.status === 'Pago' ? 'text-success' : 'text-secondary'}>{m.status}</td>
              <td>{m.dataPagamento || '-'}</td>
              <td>
                <div className="btn-group" role="group">
                  <button className="btn btn-sm btn-primary" onClick={() => openEdit(multas.indexOf(m))}>Editar</button>
                  {m.status !== 'Pago' && m.status !== 'Cancelado' && (
                    <button className="btn btn-sm btn-success" onClick={() => registerPayment(multas.indexOf(m))}>Registrar Pagamento</button>
                  )}
                  {m.status !== 'Cancelado' && (
                    <button className="btn btn-sm btn-warning" onClick={() => cancelMulta(multas.indexOf(m))}>Cancelar</button>
                  )}
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(multas.indexOf(m))}>Excluir</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal controlado */}
      {isModalOpen && (
        <div className="modal d-block" tabIndex={-1} style={{ background: 'rgba(0,0,0,0.4)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{editingIndex !== null ? 'Editar Multa' : 'Nova Multa'}</h5>
                <button type="button" className="btn-close" onClick={() => setIsModalOpen(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-2">
                  <label className="form-label">ID Multa</label>
                  <input className="form-control" value={form.id} readOnly />
                </div>
                <div className="mb-2">
                  <label className="form-label">Usuário</label>
                  <select className="form-select" value={form.usuarioId || ''} onChange={e => {
                    const val = e.target.value;
                    if (!val) {
                      setForm(f => ({ ...f, usuarioId: '', usuarioNome: '', usuarioManual: '' }));
                    } else {
                      const u = users.find(x => x.id === val);
                      setForm(f => ({ ...f, usuarioId: val, usuarioNome: u ? u.name : '', usuarioManual: '' }));
                    }
                  }}>
                    {users.map(u => (<option key={u.id} value={u.id}>{u.id} - {u.name}</option>))}
                    <option value="">-- Outro (digite abaixo) --</option>
                  </select>
                  {form.usuarioId === '' && (
                    <input className="form-control mt-2" placeholder="Digite o nome do usuário" value={form.usuarioManual || ''} onChange={e => setForm(f => ({ ...f, usuarioManual: e.target.value }))} />
                  )}
                </div>
                <div className="mb-2">
                  <label className="form-label">Material Atrasado</label>
                  <select className="form-select" value={form.material} onChange={e => setForm(f => ({ ...f, material: e.target.value }))}>
                    {materials.map(mat => (<option key={mat.id} value={mat.title}>{mat.title}</option>))}
                  </select>
                </div>
                <div className="row">
                  <div className="col mb-2">
                    <label className="form-label">Dias de Atraso</label>
                    <input type="number" className="form-control" value={form.diasAtraso} onChange={e => setForm(f => ({ ...f, diasAtraso: e.target.value }))} />
                  </div>
                  <div className="col mb-2">
                    <label className="form-label">Valor (R$)</label>
                    <input type="number" step="0.01" className="form-control" value={form.valor} onChange={e => setForm(f => ({ ...f, valor: e.target.value }))} />
                  </div>
                </div>
                <div className="mb-2 d-flex gap-2">
                  <button className="btn btn-outline-secondary" onClick={calculateValor}>Calcular valor (R$ {DEFAULT_FINE_PER_DAY}/dia)</button>
                </div>
                <div className="mb-2">
                  <label className="form-label">Data da Multa</label>
                  <input type="date" className="form-control" value={form.dataMulta} onChange={e => setForm(f => ({ ...f, dataMulta: e.target.value }))} />
                </div>
                <div className="mb-2">
                  <label className="form-label">Status</label>
                  <select className="form-select" value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
                    <option value="Pendente">Pendente</option>
                    <option value="Pago">Pago</option>
                    <option value="Cancelado">Cancelado</option>
                  </select>
                </div>
                {form.status === 'Pago' && (
                  <div className="mb-2">
                    <label className="form-label">Data Pagamento</label>
                    <input type="date" className="form-control" value={form.dataPagamento} onChange={e => setForm(f => ({ ...f, dataPagamento: e.target.value }))} />
                  </div>
                )}
                <div className="mb-2">
                  <label className="form-label">Observações</label>
                  <textarea
                    className="form-control"
                    rows={3}
                    maxLength={OBS_MAX}
                    value={form.observacoes}
                    onChange={e => setForm(f => ({ ...f, observacoes: e.target.value.slice(0, OBS_MAX) }))}
                    style={{ resize: 'vertical', maxHeight: '150px', overflow: 'auto' }}
                  />
                  <div className="form-text text-end">{(form.observacoes || '').length}/{OBS_MAX} caracteres</div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Cancelar</button>
                <button className="btn btn-primary" onClick={handleSave}>Salvar Multa</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MultasPagamentos;
