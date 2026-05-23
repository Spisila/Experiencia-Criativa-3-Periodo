import './style.css';
import './components/big_ass_button.css';

import { init_login_total_page } from './pages/login_total/login_total.ts';

import { init_cadastro_admin_page } from './pages/cadastro_admin/cadastro_admin.ts';
import { init_cadastro_medico_page } from './pages/cadastro_medico/cadastro_medico.ts';
import { init_cadastro_paciente_page } from './pages/cadastro_paciente/cadastro_paciente.ts';

import { init_opcoes_usuario_page } from './pages/opcoes_usuario/opcoes_usuario.ts';
import { init_opcoes_admin_page } from './pages/opcoes_admin/opcoes_admin.ts';

import { init_lista_usuarios_page } from './pages/lista_usuarios/lista_usuarios.ts';
import { init_lista_pacientes_page } from './pages/lista_pacientes/lista_pacientes.ts';

import { init_relatorios_admin_page } from './pages/relatorios_admin/relatorios_admin.ts';
import { init_relatorios_usuario_page } from './pages/relatorios_usuario/relatorios_usuario.ts';

import { init_relatorio_page } from './pages/relatorio/relatorio.ts';

import { carregar_pesos } from './lib/sintoma_pesos.ts';
import { supabase } from './lib/supabase.ts';

import { return_to_options, should_hide_return_button } from './components/return_to_options_button.ts';
import { should_hide_logout_button, log_out } from './components/logout_button.ts';
import { initTheme, toggleTheme } from './components/tema_claro_escuro.ts';

type RenderFunction = (container: HTMLElement) => void;

const routes: Record<string, RenderFunction> = {
  '/': init_login_total_page,

  '/login_total': init_login_total_page,

  '/cadastro_paciente': init_cadastro_paciente_page,
  '/cadastro_medico': init_cadastro_medico_page,
  '/cadastro_admin': init_cadastro_admin_page,

  '/opcoes_usuario': init_opcoes_usuario_page,
  '/opcoes_admin': init_opcoes_admin_page,

  '/lista_usuarios': init_lista_usuarios_page,
  '/lista_pacientes': init_lista_pacientes_page,

  '/relatorios_usuario': init_relatorios_usuario_page,
  '/relatorios_admin': init_relatorios_admin_page,

  '/relatorio': init_relatorio_page
};

const path_to_page_title: Record<string, string> = {

  '/login_total': 'LOGIN',

  '/cadastro_paciente': "CADASTRO DE PACIENTE",
  '/cadastro_medico': "CADASTRO DE USUARIO",
  '/cadastro_admin': "CADASTRO DE ADMIN",

  '/opcoes_usuario': "OPÇÕES DO USUARIO",
  '/opcoes_admin': "OPÇÕES DO ADMINISTRADOR",

  '/lista_usuarios': "LISTA DE USUARIOS",
  '/lista_pacientes': "LISTA DE PACIENTES",

  '/relatorios_usuario': "RELATORIOS DO USUARIO",
  '/relatorios_admin': "RELATORIOS DO ADMINISTRADOR",

  '/relatorio': "RELATORIO"

};

const paginas_somente_medico = [
  '/opcoes_usuario',
  '/cadastro_paciente',
  '/lista_pacientes',
  '/relatorios_usuario',
  '/relatorio'
]

const paginas_somente_admin = [
  '/opcoes_admin',
  '/cadastro_medico',
  '/cadastro_admin',
  '/lista_usuarios',
  '/relatorios_admin',
  '/relatorio'
]

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
  const render = routes[path] || routes['/login_total'];
  const app = document.querySelector<HTMLDivElement>('#app')!;

  const { data: user_session } = await supabase.auth.getSession();

  if (path != "/login_total") {
    if (!user_session.session) {
      navigateTo("/login_total")
      return;
    }
  }

  const user_perfil = user_session.session?.user.user_metadata.perfil

  if (paginas_somente_admin.includes(path) && path != "/relatorio") {

    if (user_perfil == "medico") {
      window.alert("ACESSO NEGADO");
      log_out();
      navigateTo("/login_total")
      return;
    }

  }
  else if (paginas_somente_medico.includes(path) && path != "/relatorio") {

    if (user_perfil == "administrador") {
      window.alert("ACESSO NEGADO");
      log_out();
      navigateTo("/login_total")
      return;
    }

  }

  should_hide_return_button(path);
  should_hide_logout_button(path);

  atualizar_titulo_da_pagina(path_to_page_title[path])

  app.innerHTML = '';
  render(app);
}

function atualizar_titulo_da_pagina(titulo: string) {

  const title = document.querySelector<HTMLHeadingElement>('#page_title');

  if (!title) { return; }

  title.textContent = titulo;

}

window.addEventListener('popstate', handleRouting);
window.addEventListener('DOMContentLoaded', init);