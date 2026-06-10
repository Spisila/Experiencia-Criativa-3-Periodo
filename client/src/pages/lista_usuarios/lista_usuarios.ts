import './lista_usuarios.css'
import "../../components/base_button.css"
import "../../components/input_boxes.css"

import { supabase } from "../../lib/supabase"
import { navigateTo } from '../../main';

import { setup_table_sorting, setup_fill_table } from '../../components/table_functions';

import { get_auth_user } from '../../components/auth_functions';
import { showNotification, hideNotification, trigger_notification_popup } from '../../components/notification_popup';

export async function init_lista_usuarios_page() {

  const container = document.querySelector<HTMLDivElement>('#app');

  if (container === null) {
    return;
  }

  container.innerHTML = /* html */`
      
    <div class="reports_container">

        <div class="search_and_pages_container">

          <input id="search_bar" class="base_input_text" type="text" placeholder="Pesquisar Nome ou CPF" style="margin-left: 10px;">
          <button class="base_table_button" id="search_button" title="Pesquisar" style="height: 50px; width: 75px; margin-left: 10px">
            <img class="icon_image" src="/node_modules/lucide-static/icons/file-search-corner.svg"
              style="height: 80%; width: auto;" alt="">
          </button>

          <div class="report_pages_container">

            <button class="icon-btn" id="pagina_anterior" title="Pagina anterior">
              <img class="icon_image" src="/node_modules/lucide-static/icons/arrow-left.svg"
                style="height: 100%; width: 100%;" alt="">
            </button>

            <p id="current_page">1</p>

            <button class="icon-btn" id="pagina_proxima" title="Proxima pagina">
              <img class="icon_image" src="/node_modules/lucide-static/icons/arrow-right.svg"
                style="height: 100%; width: 100%;" alt="">
            </button>

          </div>

        </div>

        <div class="reports_list_container">

          <table class="reports_table" id="reports_table">

            <colgroup>
              <col style="width: auto;"> <!-- Nome do paciente -->
              <col style="width: auto;"> <!-- Nome do paciente -->
              <col style="width: 50px;"> <!-- Botão -->
            </colgroup>

            <tr class="reports_table_header">
              <td class="reports_table_header_cell" style="display: flex; justify-content: left; align-items: center; text-align:center">

                <div class="header_cell_title_button_container">

                  <div class="header_cell_title">
                    Nome do Usuario
                  </div>
  
                  <div class="header_cell_button">
                    <button id="sort_by_user_name_button" class="base_table_button" style="max-width: 30px; min-width: 30px; margin-right: 5px;">
                      <img class="icon_image" src="/node_modules/lucide-static/icons/arrow-up-down.svg" alt="Ordenar"
                        style="height: 100%;  " />
                    </button>
                  </div>
                
                </div>


              </td>
              <td class="reports_table_header_cell">
                
                <div class="header_cell_title_button_container">

                  <div class="header_cell_title">
                    CPF
                  </div>
                
                </div>

              </td>

              <td class="reports_table_header_cell" colspan="1">
                Abrir
              </td>
            </tr>

          </table>

        </div>

      </div>
  
  `

  let nomes_ascendentes = true;

  const table = container.querySelector<HTMLTableElement>('#reports_table')

  if (!table) { return; }

  const sort_name_button = container.querySelector<HTMLButtonElement>('#sort_by_user_name_button');
  
  const usuarios = await get_usuarios('nome', nomes_ascendentes);

  setup_table_sorting(container,
    sort_name_button,
    (ascendente) => get_usuarios('nome', !ascendente),
    (usuarios) => setup_fill_table(usuarios, table, go_to_user_page)
  );

  showNotification("Carregando usuarios...")


  if (usuarios.length == 0) {
    hideNotification();
    trigger_notification_popup("Nenhum relatorio encontrado");
  }
  else {

    hideNotification();
  }

  setup_fill_table(usuarios, table, go_to_user_page)


}

async function get_usuarios<T extends object>(ordenar_por: string, ascendente: boolean): Promise<T[]> {

  const { data: usuarios, error: pegarUsuariosError } = await supabase.
    from('usuario')
    .select('nome, cpf, id')
    .eq('permissao', 'medico')
    .order(ordenar_por, { ascending: ascendente });;

  if (pegarUsuariosError) {
    console.log("Erro ao pegar dados de usuarios")
    console.log(pegarUsuariosError)
    return [];
  }

  return usuarios as T[];

}

function go_to_user_page(user_id: string) {

  navigateTo("/perfil_usuario")
  window.history.pushState(null, '', "/perfil_usuario/" + user_id);

}

