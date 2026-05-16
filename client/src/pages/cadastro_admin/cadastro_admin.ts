import './cadastro_admin.css'
import "../../components/base_button.css"
import "../../components/input_boxes.css"

import { supabase } from "../../lib/supabase"
import { navigateTo } from '../../main';

export async function init_cadastro_admin_page() {

  const container = document.querySelector<HTMLDivElement>('#app');

  if (container === null) {
    return;
  }

  container.innerHTML = /* html */`
      
    <div class="center_container">

      <div class="title_container">

        <h1>Cadastro</h1>

      </div>

      <div class="cadastro_container">

        <h2>Cadastro de Administrador</h2>

        <input type="text" class="base_input_text" placeholder="Nome" id="name" />
        <input type="email" class="base_input_text" placeholder="Email" id="email" />
        <input type="password" class="base_input_text" placeholder="Senha" id="password" />
        <button id="register" class="base_button">Registrar</button>

      </div>

    </div>
  

  `


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
          role: "administrador"
        }
      }
    })

    if (error) {
      console.log("ERRO = " + error);
      return;
    }

    if (data) 
    {
      console.log("Cadastro de admin");
    }

  }


}