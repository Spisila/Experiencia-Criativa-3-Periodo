import './lista_pacientes.css'
import "../../components/base_button.css"
import "../../components/input_boxes.css"

import { supabase } from "../../lib/supabase"
import { navigateTo } from '../../main';

export async function init_lista_pacientes_page() {

  const container = document.querySelector<HTMLDivElement>('#app');

  if (container === null) {
    return;
  }

  container.innerHTML = /* html */`
      
    <div class="card_center">

      <div class="patients_table">

        <div class="patients_table_header">
         
          <div class="entry_info_container">

            <div class="patient_name_container">
              <button>
                <img src="/node_modules/lucide-static/icons/arrow-down-narrow-wide.svg" alt="Relatorio" style="height: 30%;" />
              </button>
            
              Nome
            </div>
  
            <div class="separator"></div>

            <div class="patient_score_container">
              Score
            </div>
  
            <div class="separator"></div>

            <div style="width: 50%;">
  
            </div>
          
          </div>

          <div class="entry_buttons_container">

            <select>
            <option>Grande</option>
            <option>Medio</option>
            <option>Compacto</option>
            </select>

          </div>

        </div>

        <div class="patient_entry">

          <div class="entry_info_container">

            <div class="patient_name_container">
              Nome : Wilson Segundo
            </div>
  
            <div class="separator"></div>

            <div class="patient_score_container">
              Score = 10
            </div>
  
            <div class="separator"></div>

            <div style="width: 50%;">
  
            </div>
          
          </div>

          <div class="entry_buttons_container">

            <button class="patient_edit_button">
              editar
            </button>
          
            <button class="patient_delete_button">
              Deletar
            </button>

          </div>



        </div>

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

    if (data) {
      console.log("Cadastro de admin");
    }

  }


}