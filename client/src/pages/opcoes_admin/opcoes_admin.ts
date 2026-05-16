import './opcoes_admin.css'
import '../../components/base_button.css'

import { navigateTo } from '../../main';


export function init_opcoes_admin_page() {

  const container = document.querySelector<HTMLDivElement>('#app');

  if (!container) {
    return;
  }

  container.innerHTML =  /* html */`
    <div class="opcoes_admin_center">

      <button class="big_ass_button" id="admin_relatorios_btn">
        Relatorios
      </button>

      <button class="big_ass_button" id="admin_usuarios_btn">
      Usuarios
      </button>

    </div>
  `
  
  const relatorios_button = container.querySelector<HTMLInputElement>('#admin_relatorios_btn');
  const usuarios_button = container.querySelector<HTMLInputElement>('#admin_usuarios_btn');
  
    relatorios_button?.addEventListener('click', (_event) => {
      relatorios_button_press();
    })
  
    usuarios_button?.addEventListener('click', (_event) => {
      usuarios_button_press();
    })

  function relatorios_button_press() 
  {
    navigateTo("\relatorios_admin");
  }

  function usuarios_button_press() 
  {
    navigateTo("\lista_usuarios");
  }

}


