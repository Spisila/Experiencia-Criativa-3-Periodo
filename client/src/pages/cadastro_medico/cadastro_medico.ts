import './cadastro_medico.css'
import "../../components/base_button.css"
import "../../components/input_boxes.css"

import { supabase } from "../../lib/supabase"
import { trigger_notification_popup } from '../../components/notification_popup';

import { cadastro_usuario_schema } from '../../schemas/cadastro_usuario_schema';

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
        <button id="register" class="base_button">Registrar</button>

      </div>

    </div>
  

  `
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
      trigger_notification_popup("Preencha todos os campos");
      return;
    }

    const dadosFormulario = {
      nome: name,
      cpf: cpf,
      email: email,
      senha: password
    }

    const resultado = cadastro_usuario_schema.safeParse(dadosFormulario);

    if (!resultado.success) {
      const messages = resultado.error.issues.map(issue => issue.message);
      console.log(messages[0]);
      trigger_notification_popup(messages[0]);
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
      trigger_notification_popup("Erro no cadastro");
      console.log("ERRO = " + error);
      return;
    }

    if (data) {
      trigger_notification_popup("Médico cadastrado com sucesso");
      console.log("Cadastro de usuario");
    }


  }


}