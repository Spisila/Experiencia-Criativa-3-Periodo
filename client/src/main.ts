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

const show_options_button_path = [
  '/cadastro_paciente',
  '/cadastro_medico',
  '/cadastro_admin',
  '/lista_usuarios',
  '/lista_pacientes',
  '/relatorios_usuario',
  '/relatorios_admin',
  '/relatorio'
];

const hide_logout_button_path = [
  '/',
  '/login_total',
];

export function navigateTo(url: string) {
  window.history.pushState(null, '', url);
  handleRouting();
}

async function init() {
  initTheme();

  atualizar_botao_log_out("escondido");

  await carregar_pesos();
  handleRouting();

  const return_button = document.querySelector<HTMLButtonElement>('#btn-back');
  return_button?.addEventListener('click', return_to_options);

  const theme_button = document.querySelector<HTMLButtonElement>('#btn-theme-toggle');
  theme_button?.addEventListener('click', toggleTheme);

  const log_out_button = document.querySelector<HTMLButtonElement>('#btn-log-out');
  log_out_button?.addEventListener('click', log_out)
}

async function return_to_options() {
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.log("ERRO = " + error);
    return;
  }

  const role = data.user.user_metadata.perfil;

  if (role == "administrador") {
    navigateTo("/opcoes_admin");
  }
  else if (role == "medico") {
    navigateTo('/opcoes_usuario');
  }
  else {
    console.log("Role nao conhecida");
  }
}

function handleRouting() {
  const path = window.location.pathname;
  const render = routes[path] || routes['/login_total'];
  const app = document.querySelector<HTMLDivElement>('#app')!;

  if (show_options_button_path.includes(path)) {
    atualizar_botao_voltar("visivel");
  }
  else {
    atualizar_botao_voltar("escondido");
  }

  if (hide_logout_button_path.includes(path)) {
    atualizar_botao_log_out("escondido");
  }
  else {
    atualizar_botao_log_out("visivel");
  }

  app.innerHTML = '';
  render(app);
}

export function atualizar_botao_voltar(estado: "escondido" | "visivel") {

  const return_button = document.querySelector<HTMLButtonElement>('#btn-back');

  if (!return_button) {
    console.log("Botão voltar nao existe");
    return;
  }

  if (estado == "visivel") {
    return_button.style.display = 'block';
  }
  else if (estado == "escondido") {
    return_button.style.display = 'none';
  }
  else {
    console.log("estado de botao desconhecido");
  }

}

export async function log_out() {


  const { data: userAntes, error: userAntesError } = await supabase.auth.getUser();

  if (userAntesError) {
    console.log("Erro usuario nao achado em logout");
    console.log(userAntesError);
    return;
  }

  console.log(userAntes)

  const { error: logOutError } = await supabase.auth.signOut();

  if (logOutError) {
    console.log("Erro de log out")
    console.log(logOutError);
    return;
  }

  console.log("Log out");

  atualizar_botao_log_out("escondido")

  navigateTo('/login_total')

  const { data: userDepois } = await supabase.auth.getUser();

  console.log("User depois")
  console.log(userDepois)

}

export function atualizar_botao_log_out(estado: "escondido" | "visivel") {

  const botao_log_out = document.querySelector<HTMLButtonElement>('#btn-log-out');

  if (!botao_log_out) {
    console.log("Botão log out nao existe");
    return;
  }

  if (estado == "visivel") {
    botao_log_out.style.display = 'block';
  }
  else if (estado == "escondido") {
    botao_log_out.style.display = 'none';
  }
  else {
    console.log("estado de botao desconhecido");
  }

}

export function atualizarIconeTema(theme: string) {
  const themeIcon = document.querySelector<HTMLImageElement>('#theme_icon');
  if (!themeIcon) return;

  if (theme === 'light') {
    themeIcon.src = "/node_modules/lucide-static/icons/sun.svg"
  }
  else {
    themeIcon.src = "/node_modules/lucide-static/icons/moon.svg"
  }
}

export function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  let newTheme = 'dark';

  if (currentTheme === 'dark') {
    newTheme = 'light';
  }

  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  atualizarIconeTema(newTheme);
}

export function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  const systemTheme = savedTheme || 'dark';

  document.documentElement.setAttribute('data-theme', systemTheme);

  atualizarIconeTema(systemTheme);
}

window.addEventListener('popstate', handleRouting);
window.addEventListener('DOMContentLoaded', init);