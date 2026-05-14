import './opcoes_usuario.css'
import '../../components/base_button.css'

import { navigateTo } from '../../main';


export function init_opcoes_usuario_page() {

  const container = document.querySelector<HTMLDivElement>('#app');

  if (!container) {
    return;
  }

  container.innerHTML =  /* html */`
    <div class="opcoes_usuario_center">

      <button class="big_ass_button">
        <img src="/node_modules/lucide-static/icons/clipboard.svg" alt="Relatorio" style="height: 30%;" />
        Relatorios
      </button>

      <button class="big_ass_button">
        <img src="/node_modules/lucide-static/icons/heart-handshake.svg" alt="Relatorio" style="height: 30%;" />
        Pacientes
      </button>

    </div>
  `

}


