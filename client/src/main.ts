import './style.css'
import './components/big_ass_button.css'

import { init_principal_page } from './pages/principal/principal.ts';

import { init_login_normal_page } from './pages/login_normal/login_normal.ts'
import { init_login_admin_page } from './pages/login_admin/login_admin.ts';
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

import { carregar_pesos } from './lib/sintoma_pesos.ts';
import { supabase } from './lib/supabase.ts';

type RenderFunction = (container: HTMLElement) => void;

const routes: Record<string, RenderFunction> = {
  '/login_medico': init_login_normal_page,
  '/login_admin': init_login_admin_page,
  '/login_total': init_login_total_page,

  '/cadastro_paciente': init_cadastro_paciente_page,
  '/cadastro_medico': init_cadastro_medico_page,
  '/cadastro_admin': init_cadastro_admin_page,

  '/opcoes_usuario': init_opcoes_usuario_page,
  '/opcoes_admin': init_opcoes_admin_page,

  '/lista_usuarios': init_lista_usuarios_page,
  '/lista_pacientes': init_lista_pacientes_page,

  '/relatorios_usuario': init_relatorios_usuario_page,
  '/relatorios_admin': init_relatorios_admin_page
};

const show_options_button_path = [
  '/cadastro_paciente',
  '/cadastro_medico',
  '/cadastro_admin',
  '/lista_usuarios',
  '/lista_pacientes',
  '/relatorios_usuario',
  '/relatorios_admin'
]

export function navigateTo(url: string) {
  window.history.pushState(null, '', url);
  handleRouting();
}

async function init() {

  await carregar_pesos();
  handleRouting();

  const return_button = document.querySelector<HTMLButtonElement>('#options_return_button');

  return_button?.addEventListener('click', return_to_options);

}

async function return_to_options() {

  const { data, error } = await supabase.auth.getUser()
  if (error) {
    console.log("ERRO = " + error)
    return;
  }

  const role = data.user.user_metadata.role;
  console.log(role);

  if (role == "administrador") {
    navigateTo("/opcoes_admin");
  }
  else if (role == "usuario") {
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

  const return_button = document.querySelector<HTMLButtonElement>('#options_return_button');

  console.log(path)

  if (show_options_button_path.includes(path)) {
    if (!return_button) { return; }

    return_button.hidden = false;
  }
  else {
    if (!return_button) { return; }

    return_button.hidden = true;
  }

  app.innerHTML = '';
  render(app);
}

window.addEventListener('popstate', handleRouting);
window.addEventListener('DOMContentLoaded', init);


// Background

const container = document.querySelector('.circles');
const numCircles = 150;

for (let i = 0; i < numCircles; i++) {
  const circle = document.createElement('div');
  circle.classList.add('circle');

  const size = Math.random() * 100 + 50;
  const posX = Math.random() * 125;
  const posY = Math.random() * 100;
  const delay = Math.random() * -60;

  Object.assign(circle.style, {
    width: `${size}px`,
    height: `${size}px`,
    top: `${posY}%`,
    left: `${posX}%`,
    opacity: (Math.random() * 0.5).toString(),
    animationDelay: `${delay}s`
  });

  container?.appendChild(circle);
}