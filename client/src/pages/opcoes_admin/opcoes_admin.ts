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
        <img class="icon_image" src="/node_modules/lucide-static/icons/clipboard.svg" alt="Relatorio" style="height: 30%;" />
      </button>

      <button class="big_ass_button" id="admin_usuarios_btn">
        Cadastrar usuario
        <img class="icon_image" src="/node_modules/lucide-static/icons/user.svg" alt="Relatorio" style="height: 30%;" />
      </button>

      <button class="big_ass_button" id="cadastrar_admin_btn">
        Cadastrar administrador
        <img class="icon_image" src="/node_modules/lucide-static/icons/user-cog.svg" alt="Relatorio" style="height: 30%;" />
      </button>

      <button class="big_ass_button" id="lista_usuarios_btn">
        Lista de usuarios
        <img class="icon_image" src="/node_modules/lucide-static/icons/book-user.svg" alt="Relatorio" style="height: 30%;" />
      </button>

    </div>
  `

  const relatorios_button = container.querySelector<HTMLInputElement>('#admin_relatorios_btn');
  const usuarios_button = container.querySelector<HTMLInputElement>('#admin_usuarios_btn');
  const cadastrar_admin_button = container.querySelector<HTMLInputElement>('#cadastrar_admin_btn');
  const lista_usuarios_button = container.querySelector<HTMLInputElement>('#lista_usuarios_btn');


  relatorios_button?.addEventListener('click', (_event) => {
    navigateTo("/relatorios_admin");
  })

  usuarios_button?.addEventListener('click', (_event) => {
    navigateTo("/cadastro_medico");
  })

  cadastrar_admin_button?.addEventListener('click', (_event) => {
    navigateTo("/cadastro_admin");
  })


  lista_usuarios_button?.addEventListener('click', (_event) => {
    navigateTo("/lista_usuarios");
  })

}


