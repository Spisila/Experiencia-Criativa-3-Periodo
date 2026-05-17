import './login_total.css'
import "../../components/base_button.css"
import "../../components/input_boxes.css"

import { supabase } from "../../lib/supabase"

import { navigateTo } from '../../main'

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
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email: email, password: password });

    if (error) {

      if (error.code == 'invalid_credentials') {
        console.log("Email ou senha incorretos");
      }

      return;
    }

    if (data) {
      console.log(data);
      if(data.user.user_metadata.role == "administrador") 
      {
        navigateTo("/opcoes_admin");
      }
      else if (data.user.user_metadata.role == "usuario") 
      {
        navigateTo("/opcoes_usuario");
      }
      else 
      {
        console.log("Erro: role desconhecida");
      }
    }

  }
}