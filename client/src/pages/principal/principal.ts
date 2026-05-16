import './principal.css'
import '../../components/base_button.css'

import { navigateTo } from '../../main';


export function init_principal_page() {

  const container = document.querySelector<HTMLDivElement>('#app');

  if (!container) {
    return;
  }

  container.innerHTML =  /* html */`
    <div class="principal_center">

      <div class="admin_or_normal_login_container ">
        
        <div class="admin_login_container">
      
          <h2>Admin Login</h2>
          <button id="admin_login_btn" class="base_button">Login</button>
        
        </div>

        <div class="normal_login_container">
        
          <h2>Normal Login</h2>
          <button id="normal_login_btn" class="base_button">Login</button>
          
        </div>

        <div class="normal_login_container">
        
          <h2>Cadastro</h2>
          <button id="cadastro_btn" class="base_button">Cadastro</button>
        
        </div>

      </div>


  </div>

  `
  const normal_login_button = container.querySelector<HTMLButtonElement>('#normal_login_btn');
  const admin_login_button = container.querySelector<HTMLButtonElement>('#admin_login_btn');
  const cadastro_button = container.querySelector<HTMLButtonElement>('#cadastro_btn');

  normal_login_button?.addEventListener('click', (_event) => {
    press_normal_login_button();
  })

  admin_login_button?.addEventListener('click', (_event) => {
    press_admin_login_button();
  })

  cadastro_button?.addEventListener('click', (_event) => {
    press_cadastro_button();
  })

  function press_normal_login_button() {
    navigateTo("\login_medico");
  }

  function press_admin_login_button() {
    navigateTo("\login_admin");
  }

  function press_cadastro_button() {
    navigateTo("\cadastro_medico")
  }

}


