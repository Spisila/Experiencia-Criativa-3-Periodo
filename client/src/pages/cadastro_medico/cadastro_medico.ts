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

        <input type="text" class="base_input_text" placeholder="Nome" id="name" />
        <input type="text" class="base_input_text" placeholder="CPF" id="cpf" />
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

  const name_input = container.querySelector<HTMLInputElement>('#name');
  const cpf_input = container.querySelector<HTMLInputElement>('#cpf');
  const email_input = container.querySelector<HTMLInputElement>('#email');
  const password_input = container.querySelector<HTMLInputElement>('#password');

  register_button?.addEventListener('click', (_event) => {
    register_button_press();
  })

  async function register_button_press() {

    let name = name_input?.value
    let cpf = cpf_input?.value
    let email = email_input?.value
    let password = password_input?.value

    if (!name || !cpf || !email || !password) {
      window.alert("Preencha todos os campos");
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          nome: name,
          cpf: cpf,
          perfil: "medico"
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