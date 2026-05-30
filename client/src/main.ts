import './style.css';
import './components/big_ass_button.css';

import { init_login_total_page } from './pages/login_total/login_total.ts';

import { init_cadastro_admin_page } from './pages/cadastro_admin/cadastro_admin.ts';
import { init_cadastro_medico_page } from './pages/cadastro_medico/cadastro_medico.ts';
import { init_cadastro_paciente_page } from './pages/cadastro_paciente/cadastro_paciente.ts';

import { init_opcoes_usuario_page } from './pages/opcoes_usuario/opcoes_usuario.ts';
import { init_opcoes_admin_page } from './pages/opcoes_admin/opcoes_admin.ts';

import { init_lista_pacientes_page } from './pages/lista_pacientes/lista_pacientes.ts';

import { init_relatorios_admin_page } from './pages/relatorios_admin/relatorios_admin.ts';
import { init_relatorios_usuario_page } from './pages/relatorios_usuario/relatorios_usuario.ts';

import { init_relatorio_page } from './pages/relatorio/relatorio.ts';

import { init_nova_avaliacao_page } from './pages/nova_avaliacao/nova_avaliacao.ts';

// Libs
import { carregar_pesos } from './lib/sintoma_pesos.ts';
import { supabase } from './lib/supabase.ts';

// Componentes
import { return_to_options, should_hide_return_button } from './components/return_to_options_button.ts';
import { should_hide_logout_button, log_out } from './components/logout_button.ts';
import { initTheme, toggleTheme } from './components/tema_claro_escuro.ts';


type FuncaoInit = (container: HTMLElement) => void;

interface Pagina {
  path: string,
  init: FuncaoInit,
  perfil_necessario: string | null,
  titulo: string
}

const Paginas: Pagina[] = [
  { path: '/login_total',        init: init_login_total_page,        perfil_necessario: null,            titulo: "LOGIN" },

  { path: '/cadastro_paciente',  init: init_cadastro_paciente_page,  perfil_necessario: "medico",        titulo: "CADASTRO DE PACIENTE" },

  { path: '/cadastro_medico',    init: init_cadastro_medico_page,    perfil_necessario: "administrador", titulo: "CADASTRO DE USUARIO" },
  { path: '/cadastro_admin',     init: init_cadastro_admin_page,     perfil_necessario: "administrador", titulo: "CADASTRO DE ADMIN" },

  { path: '/opcoes_usuario',     init: init_opcoes_usuario_page,     perfil_necessario: "medico",        titulo: "OPÇÕES DO USUARIO" },
  { path: '/opcoes_admin',       init: init_opcoes_admin_page,       perfil_necessario: "administrador", titulo: "OPÇÕES DO ADMINISTRADOR" },

  { path: '/lista_pacientes',    init: init_lista_pacientes_page,    perfil_necessario: "medico",        titulo: "LISTA DE PACIENTES" },

  { path: '/relatorios_usuario', init: init_relatorios_usuario_page, perfil_necessario: "medico",        titulo: "RELATORIOS DO USUARIO" },
  { path: '/relatorios_admin',   init: init_relatorios_admin_page,   perfil_necessario: "administrador", titulo: "RELATORIOS DO ADMINISTRADOR" },

  { path: '/relatorio',          init: init_relatorio_page,          perfil_necessario: "autorizado",    titulo: "RELATORIO" },

  { path: '/nova_avaliacao',     init: init_nova_avaliacao_page,     perfil_necessario: "medico",        titulo: "NOVA AVALIAÇÃO"}
]

let paths: string[] = Paginas.map(p => p.path);

export function navigateTo(url: string) {
  window.history.pushState(null, '', url);
  handleRouting();
}

async function init() {

  initTheme();

  await carregar_pesos();

  const { data: user_session } = await supabase.auth.getSession();

  if (!user_session) {
    navigateTo("/login_total")
  }

  handleRouting();


  const return_button = document.querySelector<HTMLButtonElement>('#btn-back');
  return_button?.addEventListener('click', return_to_options);

  const theme_button = document.querySelector<HTMLButtonElement>('#btn-theme-toggle');
  theme_button?.addEventListener('click', toggleTheme);

  const log_out_button = document.querySelector<HTMLButtonElement>('#btn-log-out');
  log_out_button?.addEventListener('click', log_out)
}

async function handleRouting() {

  const path = window.location.pathname;

  if (paths.includes(path) == false && path.startsWith("/relatorio/") == false) {
    window.alert("Pagina não existe")
    navigateTo("/login_total")
    return;
  }

  const app = document.querySelector<HTMLDivElement>('#app')!;

  const { data: user_session } = await supabase.auth.getSession();

  if (path != "/login_total") {
    if (!user_session.session) {
      navigateTo("/login_total")
      return;
    }
  }

  const user_perfil = user_session.session?.user.user_metadata.perfil;

  should_hide_return_button(path);
  should_hide_logout_button(path);

  app.innerHTML = '';

  for (let i = 0; i < Paginas.length; i++) {

    let pagina_i = Paginas.at(i)

    if (pagina_i?.path == path) {

      if (pagina_i.perfil_necessario == null) {
        atualizar_titulo_da_pagina(Paginas.at(i)?.titulo!)
        Paginas.at(i)?.init(app)
        return;
      }

      if (user_perfil == "medico" || user_perfil == "administrador") {
        atualizar_titulo_da_pagina(Paginas.at(i)?.titulo!)
        Paginas.at(i)?.init(app)
        return;
      }

      if (user_perfil != pagina_i.perfil_necessario) {
        window.alert("ACESSO NEGADO");
        navigateTo("/login_total");
        log_out();
        return;;
      }

      atualizar_titulo_da_pagina(Paginas.at(i)?.titulo!)

      Paginas.at(i)?.init(app)

    }
  }

}

function atualizar_titulo_da_pagina(titulo: string) {

  const title = document.querySelector<HTMLHeadingElement>('#page_title');

  if (!title) { return; }

  title.textContent = titulo;

}

window.addEventListener('popstate', handleRouting);
window.addEventListener('DOMContentLoaded', init);