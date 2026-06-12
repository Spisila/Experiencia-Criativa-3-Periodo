import './login_total.css'
import "../../components/base_button.css"
import "../../components/input_boxes.css"

import { supabase } from "../../lib/supabase"

import { navigate_to } from '../../main'
import { atualizar_botao_log_out } from '../../components/logout_button'

import { trigger_notification_popup, show_notification, hide_notification } from '../../components/notification_popup'

import { login_schema } from '../../schemas/login_schema';

export function init_login_total_page() {

  const container = document.querySelector<HTMLDivElement>('#app');

  if (container === null) {
    return;
  }

  container.innerHTML =  /* html */`
    <div class="center">
      <div class="login_with_credentials">
  
        <h1>LOGIN</h1>
  
        <input id="email" type="text" class="base_input_text" placeholder="Email" />
        <input id="password" type="password" class="base_input_text" placeholder="Senha" />
        <button id="login_button" class="base_button">Login</button>
  
      </div>
  
    </div>
  `

  const email_input = container.querySelector<HTMLInputElement>('#email');
  const password_input = container.querySelector<HTMLInputElement>('#password');
  const login_button = container.querySelector<HTMLButtonElement>('#login_button');

  login_button?.addEventListener('click', e => {
    e.preventDefault()
    login_button_press();
  });

  async function login_button_press() {

    let email = email_input?.value;
    let password = password_input?.value;

    if (!email || !password) {

      trigger_notification_popup("Preencha todos os campos");

      return;
    }

    // Validação do Zod
    const dados_formulario = {
      email: email,
      senha: password
    }

    const resultado = login_schema.safeParse(dados_formulario);

    if (!resultado.success) {

      const messages = resultado.error.issues.map(issue => issue.message);
      console.log(messages[0]);
      trigger_notification_popup(messages[0]);
      return;

    }

    show_notification("Fazendo login...")

    const { data, error } = await supabase.auth.signInWithPassword({ email: email, password: password });

    if (error) {

      if (error.code == 'invalid_credentials') {
        console.log("Email ou senha incorretos");
      }

      trigger_notification_popup("Email ou senha incorretos");

      return;
    }

    // Checa o perfil do usuario e vai para a pagina de opções correspondente
    if (data) {

      if (data.user.user_metadata.perfil == "administrador") {
        navigate_to("/opcoes_admin");
      }
      else if (data.user.user_metadata.perfil == "medico") {
        navigate_to("/opcoes_usuario");
      }
      else {
        console.log("Erro: role desconhecida");
      }

      atualizar_botao_log_out("visivel");

    }

    hide_notification()

  }
}