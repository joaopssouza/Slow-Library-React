// Componente gerado automaticamente a partir de 'SlowLibrary-main/index.html'
// Comentários: preservei as classes e IDs originais para manter o layout e estilos.
// Recomenda-se revisar e transformar partes em componentes menores se desejar.

import React from 'react'

export default function Index() {
  return (
    <div dangerouslySetInnerHTML={{ __html: `<div class="d-flex" id="wrapper">
        <div id="sidebar-wrapper">
            <div>
                <img class="imglogo" src="/img/logo.png" alt="" sizes="" srcset="">
                
            </div>
            <div class="sidebar-heading text-center p-3">
                <i class="fas fa-book-open-reader me-2"></i> <span class="fw-bold">Slow Library</span>
            </div>
            <div class="list-group list-group-flush">
                <a href="#" class="list-group-item list-group-item-action active" data-section="dashboard">
                    <i class="fas fa-chart-line me-2"></i> Dashboard
                </a>
                <a href="#" class="list-group-item list-group-item-action" data-section="acervo">
                    <i class="fa fa-book me-2"></i> Acervo
                </a>
                <a href="#" class="list-group-item list-group-item-action" data-section="emprestimos-devolucoes">
                    <i class="fas fa-exchange-alt me-2"></i> Empréstimos/Devoluções
                </a>
                <a href="#" class="list-group-item list-group-item-action" data-section="usuarios">
                    <i class="fas fa-users me-2"></i> Usuários
                </a>
                <a href="#" class="list-group-item list-group-item-action" data-section="reservas-notificacoes">
                    <i class="fas fa-bookmark me-2"></i> Reservas/Notificações
                </a>
                <a href="#" class="list-group-item list-group-item-action" data-section="multas-pagamentos">
                    <i class="fas fa-coins me-2"></i> Multas/Pagamentos
                </a>
                <a href="#" class="list-group-item list-group-item-action" data-section="relatorios-estatisticas">
                    <i class="fas fa-chart-bar me-2"></i> Relatórios/Estatísticas
                </a>
                <a href="#" class="list-group-item list-group-item-action" data-section="canais-contato">
                    <i class="fa fa-envelope me-2"></i> Canais de contato
                </a>
                <a href="#" class="list-group-item list-group-item-action" data-section="configuracoes">
                    <i class="fas fa-cog me-2"></i> Configurações
                </a>
            </div>
        </div>
        <div id="page-content-wrapper">
            <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
            <div class="container-fluid">    
                <button class="btn btn-primary" id="menu-toggle">
                            <i class="fas fa-bars"></i>
                        </button>
                <!-- ÍCONES DE NOTIFICAÇÃO E E-MAIL -->
                        <ul class="navbar-nav ms-auto mt-2 mt-lg-0 align-items-center flex-row">
                            <li class="nav-item">
                                <a class="nav-link text-secondary position-relative" href="#">
                                    <i class="fas fa-bell fs-5"></i>
                                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style="font-size: 0.6em;">
                                        3
                                        <span class="visually-hidden">notificações não lidas</span>
                                    </span>
                                </a>
                            </li>
                            <li class="nav-item ms-3">
                                <a class="nav-link text-secondary position-relative" href="#">
                                    <i class="fas fa-envelope fs-5"></i>
                                     <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary" style="font-size: 0.6em;">
                                        5
                                        <span class="visually-hidden">mensagens não lidas</span>
                                    </span>
                                </a>
                            </li>
                            <li class="nav-item dropdown ms-4">
                                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img src="https://placehold.co/40x40/cccccc/333333?text=Admin" class="rounded-circle avatar me-2" alt="User Avatar">
                                    Bibliotecário(a)
                                </a>
                                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                    <li><a class="dropdown-item" href="#">Minha Conta</a></li>
                                    <li><hr class="dropdown-divider"></li>
                                    <li><a class="dropdown-item" href="#">Sair</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
            </nav>
        <!-- Conteúdo da Página -->
            <div class="container-fluid p-4">

                <div id="dashboard-content" class="content-section active-section">
                    <div class="hero-section text-left mb-4">
                        <h1 class="hero-title">Slow Library</h1>
                        <p class="hero-subtitle">Sistema Integral de Gerenciamento de Biblioteca do Slow Library</p>
                        <button class="btn btn-custom">Explorar Acervo</button>
                    </div>

                    <div class="row mb-4">
                        <div class="col-xl-3 col-md-6 mb-4">
                            <div class="card action-card shadow-sm h-100 py-2">
                                <div class="card-body">
                                    <div class="row no-gutters align-items-center">
                                        <div class="col me-2">
                                            <div class="font-weight-bold text-uppercase mb-1">Livros no Acervo</div>
                                            <div class="h5 mb-0 font-weight-bold">1.250</div>
                                        </div>
                                        <div class="col-auto">
                                            <i class="fas fa-book fa-2x text-gray-300"></i>
                                        </div>
                                    </div>
                                    <small class="text-muted mt-2 d-block">Atualizado em 25/06/2025</small>
                                </div>
                            </div>
                        </div>

                        <div class="col-xl-3 col-md-6 mb-4">
                            <div class="card action-card shadow-sm h-100 py-2">
                                <div class="card-body">
                                    <div class="row no-gutters align-items-center">
                                        <div class="col me-2">
                                            <div class="font-weight-bold text-uppercase mb-1">Livros Emprestados</div>
                                            <div class="h5 mb-0 font-weight-bold">150</div>
                                        </div>
                                        <div class="col-auto">
                                            <i class="fas fa-handshake fa-2x text-gray-300"></i>
                                        </div>
                                    </div>
                                    <small class="text-muted mt-2 d-block">Livros atualmente fora</small>
                                </div>
                            </div>
                        </div>

                        <div class="col-xl-3 col-md-6 mb-4">
                            <div class="card action-card shadow-sm h-100 py-2">
                                <div class="card-body">
                                    <div class="row no-gutters align-items-center">
                                        <div class="col me-2">
                                            <div class="font-weight-bold text-uppercase mb-1">Livros Reservados</div>
                                            <div class="h5 mb-0 font-weight-bold">25</div>
                                        </div>
                                        <div class="col-auto">
                                            <i class="fas fa-calendar-check fa-2x text-gray-300"></i>
                                        </div>
                                    </div>
                                    <small class="text-muted mt-2 d-block">Itens aguardando retirada</small>
                                </div>
                            </div>
                        </div>

                        <div class="col-xl-3 col-md-6 mb-4">
                            <div class="card action-card shadow-sm h-100 py-2">
                                <div class="card-body">
                                    <div class="row no-gutters align-items-center">
                                        <div class="col me-2">
                                            <div class="font-weight-bold text-uppercase mb-1">Usuários Ativos</div>
                                            <div class="h5 mb-0 font-weight-bold">450</div>
                                        </div>
                                        <div class="col-auto">
                                            <i class="fas fa-users-cog fa-2x text-gray-300"></i>
                                        </div>
                                    </div>
                                    <small class="text-muted mt-2 d-block">Membros com acesso</small>
                                </div>
                            </div>
                        </div>
                    </div>

                    <h2 class="section-heading mb-3">Recomendações do Mês</h2>
                        <div class="row mb-4">
                            <!-- Livro 1: Harry Potter e a Pedra Filosofal (ISBN: 9788532530783) -->
                            <div class="col-lg-2 col-md-4 col-sm-6 mb-4">
                                <div class="card book-card h-100 shadow-sm">
                                    <img src="https://covers.openlibrary.org/b/isbn/9788532530783-M.jpg" class="card-img-top" alt="Capa: Harry Potter" onerror="this.onerror=null;this.src='https.placehold.co/400x600/8e44ad/ffffff?text=Harry+Potter';">
                                    <div class="card-body p-2">
                                        <h6 class="card-title fw-bold mb-0 fs-6">Harry Potter</h6>
                                        <small class="text-muted">J.K. Rowling</small>
                                    </div>
                                </div>
                            </div>
                            <!-- Livro 2: A Sociedade do Anel (ISBN: 9788595084759) -->
                            <div class="col-lg-2 col-md-4 col-sm-6 mb-4">
                                <div class="card book-card h-100 shadow-sm">
                                    <img src="https://covers.openlibrary.org/b/isbn/9788595084759-M.jpg" class="card-img-top" alt="Capa: O Senhor dos Anéis" onerror="this.onerror=null;this.src='https.placehold.co/400x600/2c3e50/ffffff?text=O+Senhor+dos+Anéis';">
                                    <div class="card-body p-2">
                                        <h6 class="card-title fw-bold mb-0 fs-6">A Sociedade do Anel</h6>
                                        <small class="text-muted">J.R.R. Tolkien</small>
                                    </div>
                                </div>
                            </div>
                            <!-- Livro 3: O Hobbit (ISBN: 9788595084742) -->
                            <div class="col-lg-2 col-md-4 col-sm-6 mb-4">
                                <div class="card book-card h-100 shadow-sm">
                                    <img src="https://covers.openlibrary.org/b/isbn/9788595084742-M.jpg" class="card-img-top" alt="Capa: O Hobbit" onerror="this.onerror=null;this.src='https.placehold.co/400x600/8e44ad/ffffff?text=O+Hobbit';">
                                    <div class="card-body p-2">
                                        <h6 class="card-title fw-bold mb-0 fs-6">O Hobbit</h6>
                                        <small class="text-muted">J.R.R. Tolkien</small>
                                    </div>
                                </div>
                            </div>
                            <!-- Livro 4: A Guerra dos Tronos (ISBN: 9788576572762) -->
                            <div class="col-lg-2 col-md-4 col-sm-6 mb-4">
                                <div class="card book-card h-100 shadow-sm">
                                    <img src="https://m.media-amazon.com/images/I/71FZSPKM0lL._UF1000,1000_QL80_.jpg" class="card-img-top" alt="Capa: A Guerra dos Tronos" onerror="this.onerror=null;this.src='https.placehold.co/400x600/2c3e50/ffffff?text=A+Guerra+dos+Tronos';">
                                    <div class="card-body p-2">
                                        <h6 class="card-title fw-bold mb-0 fs-6">A Guerra dos Tronos</h6>
                                        <small class="text-muted">George R.R. Martin</small>
                                    </div>
                                </div>
                            </div>
                            <!-- Livro 5: Mindset (ISBN: 9788547000240) -->
                            <div class="col-lg-2 col-md-4 col-sm-6 mb-4">
                                <div class="card book-card h-100 shadow-sm">
                                    <img src="https://covers.openlibrary.org/b/isbn/9788547000240-M.jpg" class="card-img-top" alt="Capa: Mindset" onerror="this.onerror=null;this.src='https.placehold.co/400x600/8e44ad/ffffff?text=Mindset';">
                                    <div class="card-body p-2">
                                        <h6 class="card-title fw-bold mb-0 fs-6">Mindset</h6>
                                        <small class="text-muted">Carol S. Dweck</small>
                                    </div>
                                </div>
                            </div>
                            <!-- Livro 6: O Poder do Hábito (ISBN: 9788539004119) -->
                            <div class="col-lg-2 col-md-4 col-sm-6 mb-4">
                                <div class="card book-card h-100 shadow-sm">
                                    <img src="https://covers.openlibrary.org/b/isbn/9788539004119-M.jpg" class="card-img-top" alt="Capa: O Poder do Hábito" onerror="this.onerror=null;this.src='https.placehold.co/400x600/2c3e50/ffffff?text=O+Poder+do+Hábito';">
                                    <div class="card-body p-2">
                                        <h6 class="card-title fw-bold mb-0 fs-6">O Poder do Hábito</h6>
                                        <small class="text-muted">Charles Duhigg</small>
                                    </div>
                                </div>
                            </div>
                        </div>

                    <h2 class="section-heading mb-3">Últimas Notícias da Biblioteca</h2>
                    <div class="row news-grid">
                        <div class="col-md-6 col-lg-4 mb-4">
                            <div class="card news-card h-100">
                                <div class="card-body">
                                    <h5 class="card-title">Inscrições Abertas para Clube de Leitura</h5>
                                    <p class="card-text"><small class="text-muted">22 de Junho de 2025</small></p>
                                    <p class="card-text">Participe do nosso novo clube de leitura e explore grandes obras.</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-4 mb-4">
                            <div class="card news-card h-100">
                                <div class="card-body">
                                    <h5 class="card-title">Nova Coleção de Periódicos Científicos</h5>
                                    <p class="card-text"><small class="text-muted">18 de Junho de 2025</small></p>
                                    <p class="card-text">Ampliamos nosso acervo com os mais recentes periódicos.</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-4 mb-4">
                            <div class="card news-card h-100">
                                <div class="card-body">
                                    <h5 class="card-title">Horário de Verão da Biblioteca</h5>
                                    <p class="card-text"><small class="text-muted">15 de Junho de 2025</small></p>
                                    <p class="card-text">Consulte nossos novos horários de funcionamento para o verão.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="acervo-content" class="content-section">
                    <h2 class="section-heading">Gestão do Acervo</h2>
                    <p>Aqui você pode cadastrar, consultar, atualizar e excluir livros, periódicos e outros materiais. Utilize o campo abaixo para buscar informações de livros por EAN/ISBN via API.</p>

                    <div class="input-group mb-3">
                        <input type="text" class="form-control" id="eanInput" placeholder="Digite o EAN/ISBN do livro..." aria-label="EAN/ISBN do livro">
                        <button class="btn btn-primary" type="button" id="searchEanBtn">Buscar por EAN/ISBN</button>
                        <button class="btn btn-success ms-2" type="button">Novo Material Manual</button>
                    </div>

                    <div id="bookDetails" class="card p-3 mb-4" style="display: none;">
                        <h5>Detalhes do Livro Encontrado:</h5>
                        <div class="row align-items-center">
                            <div class="col-md-3 text-center">
                                <img id="bookCover" src="" alt="Capa do Livro" class="img-fluid rounded" style="max-height: 200px;">
                            </div>
                            <div class="col-md-9">
                                <p><strong>Título:</strong> <span id="bookTitle"></span></p>
                                <p><strong>Autor(es):</strong> <span id="bookAuthors"></span></p>
                                <p><strong>Editora:</strong> <span id="bookPublisher"></span></p>
                                <p><strong>Ano de Publicação:</strong> <span id="bookPublishedDate"></span></p>
                                <p><strong>Descrição:</strong> <span id="bookDescription"></span></p>
                                <button class="btn btn-sm btn-info mt-2">Adicionar ao Acervo</button>
                            </div>
                        </div>
                    </div>

                    <hr>
                    <h4>Acervo Atual</h4>
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" placeholder="Buscar no acervo atual..." aria-label="Buscar no acervo">
                        <button class="btn btn-primary" type="button">Buscar</button>
                    </div>
                    <table class="table table-striped">
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
                        <tbody id="acervoTableBody">
                            <tr><td>001</td><td>Programação em Python</td><td>Guido van Rossum</td><td>Tecnologia</td><td class='text-success'>Disponível</td><td><button class='btn btn-sm btn-info me-1'>Detalhes</button><button class='btn btn-sm btn-warning'>Editar</button></td></tr>
                            <tr><td>002</td><td>Fundamentos da Contabilidade</td><td>Maria Silva</td><td>Finanças</td><td class='text-danger'>Empr.</td><td><button class='btn btn-sm btn-info me-1'>Detalhes</button><button class='btn btn-sm btn-warning'>Editar</button></td></tr>
                            <tr><td>003</td><td>História do Brasil</td><td>Vários Autores</td><td>História</td><td class='text-success'>Disponível</td><td><button class='btn btn-sm btn-info me-1'>Detalhes</button><button class='btn btn-sm btn-warning'>Editar</button></td></tr>
                            <tr><td>004</td><td>Matemática para Concursos</td><td>João Costa</td><td>Educação</td><td class='text-danger'>Empr.</td><td><button class='btn btn-sm btn-info me-1'>Detalhes</button><button class='btn btn-sm btn-warning'>Editar</button></td></tr>

                        </tbody>
                    </table>
                </div>

                <div id="emprestimos-devolucoes-content" class="content-section">
                    <h2 class="section-heading">Empréstimos e Devoluções</h2>
                    <p>Gerencie todos os empréstimos e devoluções. Registre novas operações e monitore prazos.</p>
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" placeholder="Buscar empréstimo por ID ou usuário..." aria-label="Buscar empréstimo">
                        <button class="btn btn-primary" type="button">Buscar</button>
                        <button class="btn btn-success ms-2" type="button">Novo Empréstimo</button>
                    </div>
                    <table class="table table-striped">
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
                            <tr><td>E001</td><td>Aprenda Java</td><td>Ana Costa</td><td>2025-06-20</td><td>2025-07-05</td><td class='text-warning'>No prazo</td><td><button class='btn btn-sm btn-success'>Registrar Devolução</button></td></tr>
                            <tr><td>E002</td><td>C++ Essencial</td><td>Pedro Santos</td><td>2025-06-10</td><td>2025-06-24</td><td class='text-danger'>Atrasado</td><td><button class='btn btn-sm btn-success'>Registrar Devolução</button></td></tr>
                        </tbody>
                    </table>
                </div>

                <div id="usuarios-content" class="content-section">
                    <h2 class="section-heading">Gestão de Usuários</h2>
                    <p>Cadastre novos usuários, edite informações de perfil e gerencie suas permissões de acesso ao sistema.</p>
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" placeholder="Buscar usuário por nome ou ID..." aria-label="Buscar usuário">
                        <button class="btn btn-primary" type="button">Buscar</button>
                        <button class="btn btn-success ms-2" type="button">Novo Usuário</button>
                    </div>
                    <table class="table table-striped">
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
                            <tr><td>U001</td><td>Carlos Oliveira</td><td>carlos.o@email.com</td><td>Aluno</td><td><button class='btn btn-sm btn-info me-1'>Ver Perfil</button><button class='btn btn-sm btn-warning'>Editar</button></td></tr>
                            <tr><td>U002</td><td>Fernanda Rocha</td><td>fernanda.r@email.com</td><td>Professor</td><td><button class='btn btn-sm btn-info me-1'>Ver Perfil</button><button class='btn btn-sm btn-warning'>Editar</button></td></tr>
                        </tbody>
                    </table>
                </div>

                <div id="reservas-notificacoes-content" class="content-section">
                    <h2 class="section-heading">Reservas e Notificações</h2>
                    <p>Monitore as reservas de materiais e as notificações enviadas aos usuários.</p>
                    <table class="table table-striped">
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
                            <tr><td>R001</td><td>Algoritmos e Estruturas de Dados</td><td>Beatriz Lima</td><td>2025-06-23</td><td class='text-info'>Pendente</td><td><button class='btn btn-sm btn-primary'>Notificar Disponibilidade</button></td></tr>

                        </tbody>
                    </table>
                </div>

                <div id="multas-pagamentos-content" class="content-section">
                    <h2 class="section-heading">Gestão de Multas e Pagamentos</h2>
                    <p>Acompanhe multas por atraso e registre pagamentos. Prepare o sistema para futuras integrações de pagamento.</p>
                    <table class="table table-striped">
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
                            <tr><td>M001</td><td>Lucas Pereira</td><td>C++ Essencial</td><td>5,50</td><td class='text-danger'>Pendente</td><td><button class='btn btn-sm btn-success'>Registrar Pagamento</button></td></tr>

                        </tbody>
                    </table>
                </div>

                <div id="relatorios-estatisticas-content" class="content-section">
                    <h2 class="section-heading">Relatórios e Estatísticas</h2>
                    <p>Gere relatórios detalhados sobre o uso da biblioteca, empréstimos, acervo e usuários.</p>
                    <ul>
                        <li>Relatório de Livros Mais Emprestados</li>
                        <li>Relatório de Usuários Ativos</li>
                        <li>Estatísticas de Acervo por Categoria</li>
                        <li>Gráfico de Empréstimos por Período</li>
                    </ul>
                    <button class="btn btn-primary">Gerar Relatório Completo</button>
                </div>

                <div id="canais-contato-content" class="content-section">
                    <h2 class="section-heading">Canais de Contato</h2>
                    <p>Entre em contato conosco através dos seguintes canais:</p>
                    <ul>
                        <li>Email: contato@biblioteca.com</li>
                        <li>Telefone: (31) 1234-5678</li>
                        <li>WhatsApp: (31) 98765-4321</li>
                        <li>Chat Online: Disponível no site</li>
                    </ul>
                </div>

                <div id="configuracoes-content" class="content-section">
                    <h2 class="section-heading">Configurações do Sistema</h2>
                    <p>Ajuste as configurações gerais do sistema da biblioteca, como prazos de empréstimo e regras de multa.</p>
                    <form>
                        <div class="mb-3">
                            <label for="prazoEmprestimo" class="form-label">Prazo Padrão de Empréstimo (dias)</label>
                            <input type="number" class="form-control" id="prazoEmprestimo" value="15">
                        </div>
                        <div class="mb-3">
                            <label for="valorMultaDia" class="form-label">Valor da Multa por Dia de Atraso (R$)</label>
                            <input type="number" step="0.01" class="form-control" id="valorMultaDia" value="0.50">
                        </div>
                        <button type="submit" class="btn btn-primary">Salvar Configurações</button>
                    </form>
                </div>

            </div>
                            
        </div>
    </div>
        <footer>
            <div class="sidebar-footer p-3 text-center">
                <small>© 2025 Minas Code. Todos os direitos reservados.</small>
            </div>
        </footer>
    
    
    

<!-- Ícone de Chat Online -->
<a href="#" class="chat-icon" aria-label="Abrir chat online">
    <i class="fas fa-comment-dots"></i>
</a>` }} />
  )
}
