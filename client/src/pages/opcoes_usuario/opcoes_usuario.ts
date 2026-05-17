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

      <button class="big_ass_button" id="relatorios_usuario_button">
        <img src="/node_modules/lucide-static/icons/clipboard.svg" alt="Relatorio" style="height: 30%;" />
        Relatorios
      </button>

      <button class="big_ass_button" id="pacientes_usuario_button">
        <img src="/node_modules/lucide-static/icons/heart-handshake.svg" alt="Relatorio" style="height: 30%;" />
        Pacientes
      </button>

    </div>
  `

  const relatorios_button = container.querySelector<HTMLButtonElement>("#relatorios_usuario_button")

  const pacientes_usuario_button = container.querySelector<HTMLButtonElement>("#pacientes_usuario_button")

  relatorios_button?.addEventListener('click', (_event) => {
    relatorios_button_press();
  });

  pacientes_usuario_button?.addEventListener('click', (_event) => {
    pacientes_usuario_button_press();
  });

  function relatorios_button_press() {
    navigateTo('/relatorios_usuario')
  }

  function pacientes_usuario_button_press() {
    navigateTo('/lista_pacientes')
  }

}


