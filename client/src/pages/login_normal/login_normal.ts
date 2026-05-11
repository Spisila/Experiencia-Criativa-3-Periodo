import './login_normal.css'
import "../../components/base_button.css"
import "../../components/input_boxes.css"

import { supabase } from "../../../../server/src/lib/supabase"

export function init_login_normal_page() {

  const container = document.querySelector<HTMLDivElement>('#app');

  if (container === null) {
    return;
  }

  container.innerHTML =  /* html */`
    <div class="center">
      <div class="login_with_credentials">
  
        <h1>LOGIN COM CREDENCIAIS </h1>
  
        <input id="email" type="text" class="base_input_text" placeholder="Email" />
        <input id="password" type="password" class="base_input_text" placeholder="Senha" />
        <button id="login_button" class="base_button">Login</button>
  
      </div>
  
      <div class="login_with_qr">
        <h1>SCAN QR CODE</h1>
  
        <div class="placeholder_QR">
  
          <p1>QR CODE PLACEHOLDER</p1>
  
        </div>
  
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

    const { data, error } = await supabase.from('usuario').select("email, senha");

    if (error) {
      console.error("ERRO =", error);
      return;
    }

    if (data.length === 0) {
      console.log("Usuario nao existe");
      return;
    }

    console.log("Usuario encontrado =", data[0]);

  }
}