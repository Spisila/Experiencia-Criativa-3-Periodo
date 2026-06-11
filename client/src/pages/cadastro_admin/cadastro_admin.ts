import './cadastro_admin.css'
import "../../components/base_button.css"
import "../../components/input_boxes.css"

import { supabase } from "../../lib/supabase"
import { trigger_notification_popup } from '../../components/notification_popup';

import { cadastro_usuario_schema } from '../../schemas/cadastro_usuario_schema';

export async function init_cadastro_admin_page() {

  const container = document.querySelector<HTMLDivElement>('#app');

  if (container === null) {
    return;
  }

  container.innerHTML = /* html */`
      
    <div class="card_container">

      <div class="cadastro_container">

        <h2>Cadastro de Administrador</h2>

        <input type="text" class="base_input_text" placeholder="Nome" id="name" />
        <input type="text" class="base_input_text" placeholder="CPF" id="cpf" maxlength="11" />
        <input type="email" class="base_input_text" placeholder="Email" id="email" />
        <input type="password" class="base_input_text" placeholder="Senha" id="password" />
        <button id="register" class="base_button">Registrar</button>

      </div>

    </div>

  `


  const register_button = container.querySelector<HTMLButtonElement>('#register');

  const name_input = container.querySelector<HTMLInputElement>('#name');
  const cpf_input = container.querySelector<HTMLInputElement>('#cpf')
  const email_input = container.querySelector<HTMLInputElement>('#email');
  const password_input = container.querySelector<HTMLInputElement>('#password');

  register_button?.addEventListener('click', (_event) => {
    register_button_press();
  })

  async function register_button_press() {

    let name = name_input?.value;
    let cpf = cpf_input?.value;
    let email = email_input?.value;
    let password = password_input?.value;

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

    const resultado_validacao = cadastro_usuario_schema.safeParse(dadosFormulario);

    if (!resultado_validacao.success) {
      const messages = resultado_validacao.error.issues.map(issue => issue.message);
      console.log(messages[0]);
      trigger_notification_popup(messages[0]);
      return;
    }

    const { data: cpf_exists } = await supabase.from('usuario').select('cpf').eq('cpf', cpf).single();

    if (cpf_exists) {
      trigger_notification_popup("CPF já cadastrado");
      return;
    }

    try {

      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData.session?.access_token;

      if (!token) {
        trigger_notification_popup("Usuário não autenticado");
        return;
      }

      const response = await fetch('http://localhost:3000/api/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          email: email,
          password: password,
          nome: name,
          cpf: cpf,
          perfil: 'administrador'
        })
      });

      const resultado = await response.json();

      if (!response.ok) {
        trigger_notification_popup('Erro ao cadastrar');
        throw new Error(resultado.error || 'Erro ao cadastrar');
      }

      trigger_notification_popup("Usuário cadastrado com sucesso");

    } catch (error) {
      console.log(error);
      trigger_notification_popup("Erro ao cadastrar usuário");
    }

  }


}