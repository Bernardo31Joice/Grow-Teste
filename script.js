const state = {
  role: "PROFESSOR",
  selectedCourse: "Academic English"
};

const screen = document.querySelector("#screen");

const courses = [
  {
    name: "Academic English",
    code: "LAP-AI-26",
    students: 18,
    time: "Terças e Quintas, 19h-20h30",
    progress: 65,
    presence: 87,
    cover: "Academic English"
  },
  {
    name: "Inglês Avançado",
    code: "ENG-AV-26",
    students: 25,
    time: "Sábados, 10h-11h30",
    progress: 35,
    presence: 45,
    cover: "DIALEKTOS"
  }
];

function setScreen(name) {
  screen.className = "screen";
  screens[name]();
  screen.scrollTop = 0;
}

function wrapMint(html) {
  screen.classList.add("mint");
  screen.innerHTML = html;
}

function logo() {
  return `
    <div class="logo-area">
      <div class="logo">GRW</div>
      <h1 class="brand">EdTech</h1>
      <div class="subtitle">Plataforma Educacional</div>
    </div>
  `;
}

function footer() {
  return `
    <div class="footer-copy">
      © 2026 GROW · Transformando vidas através da<br>
      educação
    </div>
  `;
}

function topbar() {
  return `
    <div class="topbar">
      <button class="menu menu-open" onclick="openSideMenu()">☰</button>
      <input 
        class="search" 
        placeholder="🔍 Buscar..." 
        oninput="filterCurrentScreen(this.value)" 
      />
    </div>

    <div class="menu-overlay" onclick="closeSideMenu()"></div>

    <aside class="side-menu">
      <div class="side-head">
        <div class="logo small-logo">GRW</div>

        <div>
          <h2 id="menuTitle">Menu</h2>
          <p>Acesse as opções</p>
        </div>

        <button class="close-menu" onclick="closeSideMenu()">×</button>
      </div>

      <div class="menu-options" id="menuOptions"></div>

      <button class="logout-btn" onclick="logout()">
        ↪ SAIR
      </button>
    </aside>

    <div class="search-empty" id="searchEmpty">
      Nenhum resultado encontrado.
    </div>
  `;
}

function bottom(active = "home") {
  return `
    <nav class="bottom-nav">
      <button class="${active === "home" ? "active" : ""}" onclick="goHome()">⌂<br>Início</button>
      <button class="${active === "projects" ? "active" : ""}" onclick="setScreen('volProjects')">▣<br>Projetos</button>
      <button class="${active === "time" ? "active" : ""}" onclick="setScreen('volTime')">◷<br>Tempo</button>
      <button class="${active === "docs" ? "active" : ""}" onclick="setScreen('volDocs')">▤<br>Docs</button>
    </nav>
  `;
}

function goHome() {
  if (state.role === "PROFESSOR") {
    setScreen("teacherDashboard");
  } else if (state.role === "ALUNO") {
    setScreen("studentDashboard");
  } else {
    setScreen("volDashboard");
  }
}

function formBase() {
  return `
    <div class="field">
      <label>E-mail</label>
      <div class="input-row">✉ <input placeholder="Digite seu e-mail"></div>
    </div>

    <div class="field">
      <label>Número / WhatsApp</label>
      <div class="input-row">☏ <input placeholder="Digite seu número"></div>
    </div>

    <div class="field">
      <label>Nome completo</label>
      <div class="input-row">♙ <input placeholder="Digite seu nome completo"></div>
    </div>

    <div class="field">
      <label>Idade - apenas números</label>
      <div class="input-row">▢ <input placeholder="Digite sua idade"></div>
    </div>

    <div class="field">
      <label>Estado / Província / Região</label>
      <div class="input-row">⌂ <input placeholder="Digite seu estado e região"></div>
    </div>

    <div class="field">
      <label>País</label>
      <div class="input-row">⌾ <input placeholder="Digite seu país"></div>
    </div>
  `;
}

function courseCards(target = "courseDetail") {
  return courses.map((course, index) => `
    <article class="course-card">
      <div class="course-cover ${index ? "alt" : ""}">
        ${course.cover}
      </div>

      <h3>${course.name}</h3>
      <p class="muted">Turma de inglês acadêmico para escrita de artigos.</p>

      <div class="meta">
        <span>▣ ${course.code}</span>
        <span>👥 ${course.students} alunos</span>
        <span>▤ ${course.time}</span>
      </div>

      <div class="progress">
        <div class="bar" style="width:${course.progress}%"></div>
      </div>

      <div class="section-title">
        <span class="muted">Progresso ${course.progress}%</span>
        <button class="secondary" onclick="state.selectedCourse='${course.name}'; setScreen('${target}')">
          Acessar Turma →
        </button>
      </div>
    </article>
  `).join("");
}

function activityList(done = false, student = false) {
  const items = done
    ? ["Atividade 5 - Semana 3", "Atividade 4 - Semana 3"]
    : ["Atividade 4 - Semana 2", "Atividade 5 - Semana 3"];

  return items.map((title, index) => `
    <article class="activity-card">
      <div class="doc-icon ${done ? "green" : ""}">
        ${done ? "✓" : "▤"}
      </div>

      <div>
        <h3>${title}</h3>
        <p class="muted">
          ${index ? "Grammar Exercise - Present Continuous" : "Listening Exercise - Conversation"}
        </p>

        <div class="meta">
          <span>📅 Entrega: ${index ? "20" : "18"} de mar às 23:59</span>
          <span>🏅 10 pts</span>
        </div>

        ${done ? `<span class="tag">Notas Disponíveis</span>` : ""}

        <br><br>

        <button class="secondary">
          ${student ? "Ver Atividade" : done ? "Ver Detalhes" : "Importar Resultados"}
        </button>
      </div>
    </article>
  `).join("");
}

const screens = {
  role() {
    wrapMint(`
      ${logo()}

      <div class="login-card">
        <h2>Bem-vindo de volta!</h2>
        <p>Antes de começar, precisamos saber em qual das opções abaixo você se encaixa.</p>

        ${["PROFESSOR", "ALUNO", "VOLUNTÁRIO"].map(role => `
          <div class="choice-row">
            <span class="person">♙</span>
            <button 
              class="role-btn ${state.role === role ? "active" : ""}"
              onclick="state.role='${role}'; setScreen('role')">
              ${role}
            </button>
          </div>
        `).join("")}

        <button class="primary" onclick="setScreen('login')">Entrar</button>

        <button class="ghost" onclick="setScreen('recover')">
          Esqueceu sua senha?
        </button>

        <button class="ghost" onclick="setScreen('studentRegister')">
          Cadastro aluno
        </button>

        <button class="ghost" onclick="setScreen('volunteerRegister')">
          Cadastro voluntário
        </button>
      </div>

      ${footer()}
    `);
  },

  login() {
    wrapMint(`
      ${logo()}

      <div class="login-card">
        <h2>Bem-vindo de volta!</h2>

        <div class="field">
          <label>ID do Usuário</label>
          <div class="input-row">♙ <input placeholder="Digite seu ID"></div>
        </div>

        <div class="field">
          <label>Senha</label>
          <div class="input-row">▢ <input type="password" placeholder="Digite sua senha"></div>
        </div>

        <button class="primary" onclick="goHome()">Entrar</button>

        <button class="ghost" onclick="setScreen('recover')">
          Esqueceu sua senha?
        </button>
      </div>

      ${footer()}
    `);
  },

  recover() {
    wrapMint(`
      ${logo()}

      <div class="login-card">
        <h2>Recuperar senha</h2>
        <p>Digite seu e-mail cadastrado para receber as instruções.</p>

        <div class="input-row">
          ✉ <input placeholder="seuemail@email.com">
        </div>

        <button class="primary blue" onclick="setScreen('login')">
          Enviar
        </button>

        <button class="ghost" onclick="setScreen('login')">
          Voltar ao login
        </button>
      </div>

      ${footer()}
    `);
  },

  studentRegister() {
    wrapMint(`
      <div class="form-card">
        <h2>Cadastro do aluno</h2>

        ${formBase()}

        <div class="radio-group">
          <b>Nível no idioma escolhido:</b>
          <label><input type="radio" name="nivel"> A1</label>
          <label><input type="radio" name="nivel"> A2</label>
          <label><input type="radio" name="nivel"> B1</label>
          <label><input type="radio" name="nivel"> B2</label>
          <label><input type="radio" name="nivel"> C1</label>
          <label><input type="radio" name="nivel"> C2</label>
        </div>

        <div class="radio-group">
          <b>Qual seu objetivo ao aprender o idioma?</b>
          <label><input type="radio" name="objetivo"> Para estudar ou migrar no exterior.</label>
          <label><input type="radio" name="objetivo"> Para melhorar as oportunidades de trabalho.</label>
          <label><input type="radio" name="objetivo"> Por interesse cultural.</label>
        </div>

        <button class="primary blue" onclick="setScreen('studentDashboard')">
          Próximo
        </button>
      </div>

      ${footer()}
    `);
  },

  volunteerRegister() {
    wrapMint(`
      <div class="form-card">
        <h2>Cadastro do voluntário</h2>

        ${formBase()}

        <div class="radio-group">
          <b>Escolaridade:</b>
          <label><input type="radio" name="esc"> Ensino Médio em andamento</label>
          <label><input type="radio" name="esc"> Ensino Médio completo</label>
          <label><input type="radio" name="esc"> Ensino Superior em andamento</label>
        </div>

        <div class="radio-group">
          <b>Qual sua área de interesse?</b>
          <label><input type="checkbox"> Pedagógico</label>
          <label><input type="checkbox"> Marketing</label>
          <label><input type="checkbox"> Tecnologia da Informação</label>
          <label><input type="checkbox"> Comercial / Vendas</label>
        </div>

        <div class="radio-group">
          <b>Disponibilidade semanal:</b>
          <label><input type="radio" name="tempo"> 2 horas</label>
          <label><input type="radio" name="tempo"> 3 horas</label>
          <label><input type="radio" name="tempo"> 5 horas</label>
          <label><input type="radio" name="tempo"> Mais de 5 horas</label>
        </div>

        <div class="attach">📎 Anexar documentos</div>

        <button class="primary blue" onclick="setScreen('volDashboard')">
          Próximo
        </button>
      </div>

      ${footer()}
    `);
  },

  teacherDashboard() {
    screen.innerHTML = `
      ${topbar()}

      <div class="content">
        <section class="dashboard-hero">
          <h1>Portal do Professor </h1>
          <p>Terça-feira, 17 de março</p>

          <div class="stats-grid">
            <div class="stat">
              <strong>2</strong>
              <span>Turmas ativas</span>
            </div>

            <div class="stat blue">
              <strong>33</strong>
              <span>Alunos total</span>
            </div>

            <div class="stat yellow">
              <strong>89%</strong>
              <span>Frequência média</span>
            </div>

            <div class="stat dark">
              <strong>24</strong>
              <span>Certificados emitidos</span>
            </div>
          </div>
        </section>

        <h2>Ações Rápidas</h2>

        <div class="quick">
          <button class="quick-card blue" onclick="setScreen('teacherPresence')">
            <b>Registrar Presença</b>
            Marcar presença da última aula
          </button>

          <button class="quick-card yellow" onclick="setScreen('teacherActivities')">
            <b>Publicar Atividade</b>
            Criar nova atividade
          </button>

          <button class="quick-card mint">
            <b>Importar Dados</b>
            Upload de planilhas
          </button>
        </div>

        <h2>Minhas Turmas</h2>

        ${courseCards("teacherPresence")}

        <h2>Desempenho dos Alunos</h2>

        ${["Maria Silva", "Pedro Oliveira", "Ana Santos", "Carlos Lima", "Juliana Costa"].map((name, index) => `
          <div class="student-card">
            <div class="section-title">
              <b>${name}</b>
              <span class="tag">${index === 3 ? "Bom" : "Excelente"}</span>
            </div>

            <div class="two-col">
              <div class="stat">
                <span>Frequência</span>
                <strong style="font-size:18px">${[95, 89, 92, 78, 100][index]}%</strong>
              </div>

              <div class="stat">
                <span>Clareza</span>
                <strong style="font-size:18px">${[98, 87, 95, 72, 100][index]}%</strong>
              </div>
            </div>
          </div>
        `).join("")}
      </div>
    `;
  },

  teacherPresence() {
    screen.innerHTML = `
      ${topbar()}

      <div class="content">
        <button class="back" onclick="setScreen('teacherDashboard')">
          ‹ Voltar
        </button>

        <div class="class-header">
          <div class="class-hero">
            <h1>Academic English</h1>
          </div>

          <div class="class-info">
            <div class="meta">
              <span>▣ Código: LAP-AI-26</span>
              <span>👥 18 alunos</span>
              <span>▤ Terças e Quintas, 19h-20h30</span>
            </div>

            <b>Professor João Santos</b>
          </div>
        </div>

        <div class="stats-grid">
          <div class="stat">
            <strong>18</strong>
            <span>Total de alunos</span>
          </div>

          <div class="stat">
            <strong>87%</strong>
            <span>Presença média</span>
          </div>
        </div>

        <article class="white-card" style="width:100%">
          <h2 style="text-align:left">Gerenciar Sessões de Presença</h2>
          <p>Crie sessões e adicione palavras-chave para que os alunos registrem presença.</p>

          <button class="small-btn">+ Adicionar Sessão</button>

          <div class="field">
            <label>Data da Aula</label>
            <div class="input-row"><input></div>
          </div>

          <div class="field">
            <label>Horário de Início</label>
            <div class="input-row"><input></div>
          </div>

          <div class="field">
            <label>Horário de Término</label>
            <div class="input-row"><input></div>
          </div>

          <div class="field">
            <label>Descrição</label>
            <div class="input-row">
              <input placeholder="Ex: Present Perfect - Aula teórica">
            </div>
          </div>

          <button class="primary blue">Adicionar</button>
        </article>

        <h2>Próximas Sessões</h2>

        ${["17 de março de 2026", "19 de março de 2026", "22 de março de 2026"].map((date, index) => `
          <div class="presence-card">
            <b>${date}</b>
            <p class="muted">${["Present Perfect - Aula teórica", "Present Perfect - Prática", "Conversação - Free Talk"][index]}</p>
            <span class="tag">${["perfect", "first", "people"][index]}</span>
          </div>
        `).join("")}
      </div>
    `;
  },

  teacherActivities() {
    screen.innerHTML = `
      ${topbar()}

      <div class="content">
        <button class="back" onclick="setScreen('teacherDashboard')">
          ‹ Voltar
        </button>

        <div class="class-header">
          <div class="class-hero">
            <h1>Academic English</h1>
          </div>

          <div class="class-info">
            <div class="tabs">
              <span class="tab">Mural</span>
              <span class="tab active">Atividades</span>
              <span class="tab">Painel</span>
            </div>
          </div>
        </div>

        <div class="section-title">
          <h2>Atividades</h2>
          <button class="small-btn">+ Nova Atividade</button>
        </div>

        <h2>Atividades Ativas</h2>
        ${activityList(false)}

        <h2>Atividades Corrigidas</h2>
        ${activityList(true)}

        <h2>Nova avaliação</h2>

        <div class="form-card" style="width:100%">
          <div class="field">
            <label>Nome</label>
            <div class="input-row"><input></div>
          </div>

          <div class="field">
            <label>Data</label>
            <div class="input-row"><input></div>
          </div>

          <div class="field">
            <label>Gmail</label>
            <div class="input-row"><input></div>
          </div>

          <div class="field">
            <label>Questão 1</label>
            <div class="input-row"><input></div>
          </div>

          <button class="primary blue">Adicionar</button>
        </div>

        <div class="notes">
          <table>
            <tr>
              <th>Aluno</th>
              <th>Entrega</th>
              <th>Nota</th>
            </tr>
            <tr>
              <td>Alisson</td>
              <td>Certo</td>
              <td>77/100</td>
            </tr>
            <tr>
              <td>Caio</td>
              <td>Certo</td>
              <td>100/100</td>
            </tr>
            <tr>
              <td>Fernanda</td>
              <td>Atraso</td>
              <td>90/100</td>
            </tr>
          </table>
        </div>
      </div>
    `;
  },

  studentDashboard() {
    screen.innerHTML = `
      ${topbar()}

      <div class="content">
        <h1>Meus Cursos</h1>
        <p class="muted">Acesse suas turmas da Grow.</p>

        ${courseCards("studentCourse")}

        <h2>Desempenho</h2>

        <div class="stats-grid">
          <div class="stat">
            <strong>87%</strong>
            <span>Presença</span>
          </div>

          <div class="stat">
            <strong>65%</strong>
            <span>Progresso</span>
          </div>
        </div>
      </div>
    `;
  },

  studentCourse() {
    screen.innerHTML = `
      ${topbar()}

      <div class="content">
        <button class="back" onclick="setScreen('studentDashboard')">
          ‹ Voltar
        </button>

        <div class="class-header">
          <div class="class-hero">
            <h1>Academic English</h1>
          </div>

          <div class="class-info">
            <div class="meta">
              <span>▣ LAP-AI-26</span>
              <span>👥 18 alunos</span>
              <span>▤ Terças e Quintas, 19h-20h30</span>
            </div>

            <div class="tabs">
              <span class="tab active">Mural</span>
              <span class="tab" onclick="setScreen('studentActivities')">Atividades</span>
              <span class="tab" onclick="setScreen('studentPanel')">Painel</span>
            </div>
          </div>
        </div>

        <article class="presence-card">
          <b>João Santos</b>
          <span class="muted"> · 14 de mar</span>

          <p>
            Boa tarde, galera! Segue o link do documento com o gabarito da tarefa
            de hoje. Não esqueçam de fazer a atividade de listening!
          </p>

          <button class="secondary">Gabarito - Semana 3</button>
        </article>
      </div>
    `;
  },

  studentActivities() {
    screen.innerHTML = `
      ${topbar()}

      <div class="content">
        <button class="back" onclick="setScreen('studentCourse')">
          ‹ Voltar
        </button>

        <div class="class-header">
          <div class="class-hero">
            <h1>Academic English</h1>
          </div>

          <div class="class-info">
            <div class="tabs">
              <span class="tab" onclick="setScreen('studentCourse')">Mural</span>
              <span class="tab active">Atividades</span>
              <span class="tab" onclick="setScreen('studentPanel')">Painel</span>
            </div>
          </div>
        </div>

        <h2>Pendentes</h2>
        ${activityList(false, true)}

        <h2>Entregues</h2>
        ${activityList(true, true)}
      </div>
    `;
  },

  studentPanel() {
    screen.innerHTML = `
      ${topbar()}

      <div class="content">
        <button class="back" onclick="setScreen('studentCourse')">
          ‹ Voltar
        </button>

        <div class="class-header">
          <div class="class-hero">
            <h1>PAINEL</h1>
          </div>

          <div class="class-info">
            <div class="tabs">
              <span class="tab" onclick="setScreen('studentCourse')">Mural</span>
              <span class="tab" onclick="setScreen('studentActivities')">Atividades</span>
              <span class="tab active">Painel</span>
            </div>

            <div class="meta">
              <span>▣ Código: LAP-AI-26</span>
              <span>🏆 posição: 3º</span>
              <span>📅 Nível: Avançado</span>
            </div>
          </div>
        </div>

        <div class="ranking">
          <h2>Ranking</h2>

          <table>
            <tr>
              <th>#</th>
              <th>Aluno</th>
              <th>Pts</th>
            </tr>

            <tr>
              <td>1</td>
              <td>Bruno Henrique</td>
              <td>96</td>
            </tr>

            <tr>
              <td>2</td>
              <td>Laura Martins</td>
              <td>88</td>
            </tr>

            <tr>
              <td>3</td>
              <td>Você</td>
              <td>83</td>
            </tr>
          </table>
        </div>

        <h2>Percentual de frequência</h2>

<div class="frequency-card">
  <div class="frequency-info">
    <div class="legend-item">
      <span class="legend-color presence"></span>
      <strong>presenças</strong>
      <small>87%</small>
    </div>

    <div class="legend-item">
      <span class="legend-color absence"></span>
      <strong>faltas</strong>
      <small>13%</small>
    </div>
  </div>

  <div class="pie-chart">
    <span>87%</span>
  </div>
</div>
    `;
  },

  studentPresence() {
    screen.innerHTML = `
      ${topbar()}

      <div class="content">
        <h1>Registrar Presença</h1>
        <p class="muted">Selecione a turma para registrar sua presença.</p>

        ${courses.map(course => `
          <article class="course-card">
            <div class="course-cover">${course.cover}</div>
            <h3>${course.name}</h3>

            <div class="meta">
              <span>▣ ${course.code}</span>
              <span>👥 ${course.students} alunos</span>
              <span>▤ ${course.time}</span>
            </div>

            <div class="two-col">
              <div>
                <b>${course.presence}%</b>
                <p class="muted">Presença</p>
              </div>

              <div>
                <b>${course.progress}%</b>
                <p class="muted">Progresso</p>
              </div>
            </div>

            <button class="secondary" onclick="setScreen('presenceKey')">
              Registrar →
            </button>
          </article>
        `).join("")}
      </div>
    `;
  },

  presenceKey() {
    screen.innerHTML = `
      ${topbar()}

      <div class="content">
        <div class="class-header">
          <div class="class-hero">
            <h1>Academic English</h1>
          </div>

          <div class="class-info">
            <div class="stats-grid">
              <div class="stat">
                <strong>87%</strong>
                <span>Presença</span>
              </div>

              <div class="stat">
                <strong>21/24</strong>
                <span>Aulas</span>
              </div>
            </div>
          </div>
        </div>

        <article class="white-card" style="width:100%">
          <h2 style="text-align:left">Registrar Presença</h2>

          <p>Insira a data da aula e a palavra-chave fornecida pelo professor.</p>

          <div class="field">
            <label>Data da Aula</label>
            <div class="input-row"><input></div>
          </div>

          <div class="field">
            <label>Palavra-chave</label>
            <div class="input-row">
              <input placeholder="DIGITE A PALAVRA-CHAVE">
            </div>
          </div>

          <button class="primary blue">Confirmar Presença</button>

          <div class="notice">
            Dica: a palavra-chave é fornecida pelo professor durante a aula.
          </div>
        </article>

        <h2>Histórico de Presença</h2>

        <div class="presence-card">
          ✅ 15 de março 2026<br>
          <span class="muted">Aula 04: Past Continuous</span>
        </div>

        <div class="presence-card">
          ⭕ 10 de março 2026<br>
          <span class="muted">Aula 03: Phrasal Verbs</span>
        </div>
      </div>
    `;
  },

  volDashboard() {
    screen.innerHTML = `
      ${topbar()}

      <div class="content">
        <h1>Bem-vindo(a) de volta, Voluntário(a).</h1>
        <p class="muted">
          Sua contribuição neste semestre impactou mais de 120 alunos.
        </p>

        <button class="primary blue" onclick="setScreen('volTime')">
          Check-in rápido →
        </button>

        <h2>Progressão Semanal 15 / 20h</h2>

        <div class="progress">
          <div class="bar" style="width:75%"></div>
        </div>

        <div class="stats-grid">
          <div class="stat">
            <strong>03</strong>
            <span>Projetos ativos</span>
          </div>

          <div class="stat">
            <strong>3.2h</strong>
            <span>Total de horas</span>
          </div>
        </div>

        <div class="vol-card">
          <b>Alerta institucional</b>
          <p class="muted">
            Um novo certificado para o ciclo “Pesquisas de impacto 2025”
            está disponível.
          </p>

          <button class="secondary" onclick="setScreen('volDocs')">
            Ver documentos
          </button>
        </div>

        <h2>Projeto Ativo</h2>

        ${["Inglês para negócios", "Alcance Comunitário", "Alfabetização Digital"].map((project, index) => `
          <div class="project-card">
            <h3>${project}</h3>
            <p class="muted">
              ${["Turma 2026 · Grupo A", "Foco Regional · Norte", "Programa Semear · 2025"][index]}
            </p>

            <div class="progress">
              <div class="bar" style="width:${[82, 47, 93][index]}%"></div>
            </div>
          </div>
        `).join("")}
      </div>

      ${bottom("home")}
    `;
  },

  volProjects() {
    screen.innerHTML = `
      ${topbar()}

      <div class="content">
        <h1>Rastreador de projetos</h1>

        <p class="muted">
          Potencialize seu impacto. Acompanhe seus marcos de ensino.
        </p>

        <section class="dashboard-hero">
          <p>Projeto em destaque</p>
          <h1>Conversação Avançada</h1>
          <strong style="font-size:34px">72%</strong>

          <div class="progress">
            <div class="bar" style="width:72%; background:var(--yellow)"></div>
          </div>
        </section>

        <h2>Tarefas Semanais</h2>

        <div class="vol-card">
          <label><input type="checkbox"> Carregar materiais</label><br>
          <label><input type="checkbox" checked> Registrar classe atendida</label><br>
          <label><input type="checkbox"> Envio feedback mensal</label>

          <button class="primary blue">Ver todas as tarefas</button>
        </div>

        <div class="notice">
          Aviso de voluntariado: avaliações de maio serão abertas na próxima semana.
        </div>
      </div>

      <button class="floating">+</button>

      ${bottom("projects")}
    `;
  },

  volTime() {
    screen.innerHTML = `
      ${topbar()}

      <div class="content">
        <div class="timer">
          <p>Sessão atual</p>
          <strong>02:44:12</strong>
          <p class="muted">Ativo: Projeto de Pesquisa</p>

          <button class="primary blue">Sair</button>
          <button class="secondary" style="margin-top:8px">Pausar</button>
        </div>

        <h2>Tempo semanal</h2>

        <section class="dashboard-hero">
          <strong style="font-size:28px">12.5h</strong>
          <p>Faltam 7.5 horas para atingir a meta.</p>

          <div class="week">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </section>

        <h2>Histórico de entradas diárias</h2>

        ${["Out 24, 2026", "Out 23, 2026", "Out 22, 2026"].map(date => `
          <div class="presence-card">
            <b>${date}</b>

            <div class="meta">
              <span>Início 09:00</span>
              <span>Fim 12:30</span>
            </div>
          </div>
        `).join("")}

        <div class="quick">
          <button class="quick-card mint">
            <b>Entrada manual</b>
            Esqueceu de registrar o ponto?
          </button>

          <button class="quick-card mint">
            <b>Exportar relatório</b>
            Baixe o PDF/CSV referente ao mês atual.
          </button>
        </div>
      </div>

      ${bottom("time")}
    `;
  },

  volDocs() {
    screen.innerHTML = `
      ${topbar()}

      <div class="content">
        <h1>Oficiais Certificações</h1>

        <p class="muted">
          Acesse e verifique seus registros profissionais de voluntariado.
        </p>

        <div class="certified">
          ✓ Horário verificado<br>
          <strong>135.0</strong>
        </div>

        <h2>Documentos Disponíveis</h2>

        ${["Certificado de Conclusão 2025.2", "Certificado de Compromisso Semanal"].map(title => `
          <article class="doc-card">
            <h3>${title}</h3>

            <p class="muted">
              Validado em 20 de dezembro de 2026
            </p>

            <div class="two-col">
              <button class="secondary">Visualizar</button>
              <button class="secondary">Download PDF</button>
            </div>
          </article>
        `).join("")}

        <div class="notice">
          Todos os certificados contêm hash criptográfico exclusivo e um código QR
          para verificação institucional.
        </div>
      </div>

      ${bottom("docs")}
    `;
  }
};

document.querySelectorAll("[data-go]").forEach(button => {
  button.addEventListener("click", () => {
    setScreen(button.dataset.go);
  });
});

setScreen("role");
window.addEventListener("load", () => {
  const sideMenu = document.getElementById("sideMenu");
  const menuOverlay = document.getElementById("menuOverlay");

  if (sideMenu) {
    sideMenu.classList.remove("active");
  }

  if (menuOverlay) {
    menuOverlay.classList.remove("active");
  }
});
/* =========================
   MENU LATERAL E BUSCA
========================= */

const menuByRole = {
  PROFESSOR: [
    {
      title: "Portal do Professor",
      desc: "Voltar para o painel inicial",
      screen: "teacherDashboard",
      icon: "⌂"
    },
    {
      title: "Presença",
      desc: "Gerenciar presença das turmas",
      screen: "teacherPresence",
      icon: "✓"
    },
    {
      title: "Atividades",
      desc: "Publicar e corrigir atividades",
      screen: "teacherActivities",
      icon: "▤"
    }
  ],

  ALUNO: [
    {
      title: "Meus Cursos",
      desc: "Ver cursos disponíveis",
      screen: "studentDashboard",
      icon: "▣"
    },
    {
      title: "Mural",
      desc: "Acessar avisos da turma",
      screen: "studentCourse",
      icon: "☰"
    },
    {
      title: "Atividades",
      desc: "Pendentes e entregues",
      screen: "studentActivities",
      icon: "▤"
    },
    {
      title: "Painel",
      desc: "Ranking e desempenho",
      screen: "studentPanel",
      icon: "★"
    },
    {
      title: "Presença",
      desc: "Registrar presença",
      screen: "studentPresence",
      icon: "✓"
    }
  ],

  VOLUNTÁRIO: [
    {
      title: "Início",
      desc: "Painel institucional",
      screen: "volDashboard",
      icon: "⌂"
    },
    {
      title: "Projetos",
      desc: "Acompanhar projetos ativos",
      screen: "volProjects",
      icon: "▣"
    },
    {
      title: "Tempo",
      desc: "Registrar horas",
      screen: "volTime",
      icon: "◷"
    },
    {
      title: "Documentos",
      desc: "Acessar certificados e arquivos",
      screen: "volDocs",
      icon: "▤"
    }
  ]
};

function openSideMenu() {
  const overlay = document.querySelector(".menu-overlay");
  const sideMenu = document.querySelector(".side-menu");
  const menuOptions = document.querySelector("#menuOptions");
  const menuTitle = document.querySelector("#menuTitle");

  if (!overlay || !sideMenu || !menuOptions || !menuTitle) {
    return;
  }

  const role = state.role || "PROFESSOR";
  const items = menuByRole[role] || menuByRole.PROFESSOR;

  if (role === "PROFESSOR") {
    menuTitle.textContent = "Menu Professor";
  } else if (role === "ALUNO") {
    menuTitle.textContent = "Menu Aluno";
  } else {
    menuTitle.textContent = "Menu Voluntário";
  }

  menuOptions.innerHTML = items.map(item => `
    <button class="menu-item" onclick="menuNavigate('${item.screen}')">
      <span class="menu-icon">${item.icon}</span>
      <span>
        <b>${item.title}</b>
        <small>${item.desc}</small>
      </span>
    </button>
  `).join("");

  overlay.classList.add("active");
  sideMenu.classList.add("active");
}

function closeSideMenu() {
  const overlay = document.querySelector(".menu-overlay");
  const sideMenu = document.querySelector(".side-menu");

  if (overlay) {
    overlay.classList.remove("active");
  }

  if (sideMenu) {
    sideMenu.classList.remove("active");
  }
}

function menuNavigate(screenName) {
  closeSideMenu();
  setScreen(screenName);
}

function logout() {
  closeSideMenu();
  state.role = "PROFESSOR";
  state.selectedCourse = "Academic English";
  setScreen("role");
}

/* =========================
   BUSCA BÁSICA
========================= */

function filterCurrentScreen(value) {
  const term = value.trim().toLowerCase();
  const currentScreen = document.querySelector("#screen");

  if (!currentScreen) {
    return;
  }

  const items = currentScreen.querySelectorAll(`
    .course-card,
    .activity-card,
    .presence-card,
    .student-card,
    .project-card,
    .doc-card,
    .vol-card,
    .quick-card,
    .stat,
    .white-card,
    .ranking,
    .notice,
    .certified
  `);

  const emptyMessage = document.querySelector("#searchEmpty");
  let found = 0;

  items.forEach(item => {
    const text = item.innerText.toLowerCase();
    const match = text.includes(term);

    if (!term || match) {
      item.classList.remove("is-hidden-by-search");
      found++;
    } else {
      item.classList.add("is-hidden-by-search");
    }
  });

  if (emptyMessage) {
    if (term && found === 0) {
      emptyMessage.classList.add("active");
      emptyMessage.textContent = `Nenhum resultado encontrado para: ${value}`;
    } else {
      emptyMessage.classList.remove("active");
    }
  }
}