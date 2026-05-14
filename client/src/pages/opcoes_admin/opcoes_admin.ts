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

      <button class="big_ass_button">
      
        Relatorios
      </button>

      <button  class="big_ass_button">Usuarios</button>

    </div>
  `

}


