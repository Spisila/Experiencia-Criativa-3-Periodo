import './opcoes_usuario.css'
import '../../components/base_button.css'

import { navigateTo } from '../../main';
import { _nativeEnum } from 'zod/v4/core';


export function init_opcoes_usuario_page() {

  const container = document.querySelector<HTMLDivElement>('#app');

  if (!container) {
    return;
  }

  container.innerHTML =  /* html */`
    <div class="opcoes_usuario_center">

      <button class="big_ass_button" id="relatorios_usuario_button">
        <img class="icon_image" src="/node_modules/lucide-static/icons/clipboard.svg" alt="Relatorios" style="height: 30%;" />
        Relatorios
      </button>

      <button class="big_ass_button" id="cadastrar_paciente_button">
        <img class="icon_image" src="/node_modules/lucide-static/icons/user-round-plus.svg" alt="Cadastrar usuario" style="height: 30%;" />
        Cadastrar Paciente
      </button>

      <button class="big_ass_button" id="pacientes_usuario_button">
        <img class="icon_image" src="/node_modules/lucide-static/icons/heart-handshake.svg" alt="Paciente" style="height: 30%;" />
        Nova avaliação
      </button>

    </div>
  `

  const relatorios_button = container.querySelector<HTMLButtonElement>("#relatorios_usuario_button")

  const pacientes_usuario_button = container.querySelector<HTMLButtonElement>("#pacientes_usuario_button")

  const cadastrar_paciente_button = container.querySelector<HTMLButtonElement>("#cadastrar_paciente_button")

  relatorios_button?.addEventListener('click', (_event) => {
    relatorios_button_press();
  });

  pacientes_usuario_button?.addEventListener('click', (_event) => {
    pacientes_usuario_button_press();
  });

  cadastrar_paciente_button?.addEventListener('click', (_event) => {
    cadastrar_paciente_button_press();
  })

  function relatorios_button_press() {
    navigateTo('/relatorios_usuario')
  }

  function cadastrar_paciente_button_press() {
    navigateTo('cadastro_paciente')
  }

  function pacientes_usuario_button_press() {
    navigateTo('/lista_pacientes')
  }

}


