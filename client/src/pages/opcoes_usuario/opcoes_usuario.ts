import './opcoes_usuario.css'
import '../../components/base_button.css'

import { navigateTo } from '../../main';
import { get_auth_user } from '../../components/auth_functions';

export async function init_opcoes_usuario_page() {

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
        Lista de pacientes
      </button>

      <button class="big_ass_button" id="usuario_perfil_button">
        <img class="icon_image" src="/node_modules/lucide-static/icons/user-pen.svg" alt="Paciente" style="height: 30%;" />
        Seu perfil
      </button>

    </div>
  `

  const relatorios_button = container.querySelector<HTMLButtonElement>("#relatorios_usuario_button")

  const pacientes_usuario_button = container.querySelector<HTMLButtonElement>("#pacientes_usuario_button")

  const cadastrar_paciente_button = container.querySelector<HTMLButtonElement>("#cadastrar_paciente_button")

  const usuario_perfil_button = container.querySelector<HTMLButtonElement>("#usuario_perfil_button");

  relatorios_button?.addEventListener('click', (_event) => {
    navigateTo('/relatorios_usuario')
  });

  pacientes_usuario_button?.addEventListener('click', (_event) => {
    navigateTo('/lista_pacientes')
  });

  cadastrar_paciente_button?.addEventListener('click', (_event) => {
    navigateTo('/cadastro_paciente')
  })

  const user_session = await get_auth_user();

  const user_id = user_session?.session?.user.id;

  usuario_perfil_button?.addEventListener('click', (_event) => {

    navigateTo("/perfil_usuario")
    window.history.pushState(null, '', "/perfil_usuario/" + user_id);

  })


}


