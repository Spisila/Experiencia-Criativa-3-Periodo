import './cadastro_medico.css'
import "../../components/base_button.css"
import "../../components/input_boxes.css"

import { supabase } from "../../lib/supabase"


export async function init_cadastro_medico_page() {

  const container = document.querySelector<HTMLDivElement>('#app');

  if (container === null) {
    return;
  }

  container.innerHTML = /* html */`
      
    <div class="card_container">

      <div class="cadastro_container">

        <h2>Cadastro de Usuário</h2>

        <input type="email" class="base_input_text" placeholder="Email" id="email" />
        <input type="password" class="base_input_text" placeholder="Senha" id="password" />
        <div class=cadastro_status>
          <h3 id="status">Status de cadastro<h3>
        </div>
        <button id="register" class="base_button">Registrar</button>

      </div>

    </div>
  

  `
  const mensagem_cadastro_feito = "Cadastro realizado";
  const mensagem_cadastro_nao = "Erro no cadastro";

  const status = container.querySelector<HTMLTextAreaElement>('#status');

  const register_button = container.querySelector<HTMLButtonElement>('#register');

  const email_input = container.querySelector<HTMLInputElement>('#email');
  const password_input = container.querySelector<HTMLInputElement>('#password');

  register_button?.addEventListener('click', (_event) => {
    register_button_press();
  })

  async function register_button_press() {

    let email = email_input?.value
    let password = password_input?.value

    if (!email || !password) {
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          role: "usuario"
        }
      }
    })

    if (error) {
      console.log("ERRO = " + error);
      if (status) {
        status.textContent = mensagem_cadastro_nao;
      }
      return;
    }

    if (data) {
      console.log("Cadastro de usuario");
      if (status) {
        status.textContent = mensagem_cadastro_feito;
      }
    }


  }


}