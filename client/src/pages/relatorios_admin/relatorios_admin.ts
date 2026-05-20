import './relatorios_admin.css'
import "../../components/base_button.css"
import "../../components/input_boxes.css"

import { supabase } from "../../lib/supabase"
import { navigateTo } from '../../main';

export async function init_relatorios_admin_page() {

  const container = document.querySelector<HTMLDivElement>('#app');

  if (container === null) {
    return;
  }

  container.innerHTML = /* html */`
      
    <div class="reports_container">

        <div class="search_and_pages_container">

          <img class="icon_image" src="/node_modules/lucide-static/icons/book-search.svg" alt="Pesquisar relatorios"
            style="height: 60%; margin-left: 10px; margin-right: 10px;" />
          <input class="base_input_text" type="text" placeholder="Pesquisar">

          <div class="report_pages_container">

            <button class="icon-btn" id="btn-back" title="Pagina anterior">
              <img class="icon_image" src="/node_modules/lucide-static/icons/arrow-left.svg"
                style="height: 100%; width: 100%;" alt="">
            </button>

            <p>1</p>

            <button class="icon-btn" id="btn-back" title="Proxima pagina">
              <img class="icon_image" src="/node_modules/lucide-static/icons/arrow-right.svg"
                style="height: 100%; width: 100%;" alt="">
            </button>

          </div>

        </div>

        <div class="reports_list_container">

          <table class="reports_table">

            <tr class="reports_table_header">
              <td class="reports_table_header_cell">
                Nome do Paciente
              </td>
              <td class="reports_table_header_cell">
                Nome do Medico
              </td>
              <td class="reports_table_header_cell">
                Data de nascimento
              </td>
              <td class="reports_table_header_cell">
                Sexo
              </td>
              <td class="reports_table_header_cell">
                Avaliação data
              </td>
              <td class="reports_table_header_cell">
                Score total
              </td>
              <td class="reports_table_header_cell" colspan="2">
                Botoes
              </td>
            </tr>

            <tr class="reports_table_row">
              <td class="reports_table_cell">
                Paciente 1
              </td>
              <td class="reports_table_cell">
                Medico 1
              </td>
              <td class="reports_table_cell">
                dd/mm/YYYY
              </td>
              <td class="reports_table_cell">
                Masculino
              </td>
              <td class="reports_table_cell">
                dd/mm/YYYY
              </td>
              <td class="reports_table_cell">
                1.85
              </td>
              <td class="reports_table_cell">
                <button class="base_table_button">Abrir</button>
              </td>
            </tr>

            <tr class="reports_table_row">
              <td class="reports_table_cell">
                Paciente 1
              </td>
              <td class="reports_table_cell">
                Medico 1
              </td>
              <td class="reports_table_cell">
                dd/mm/YYYY
              </td>
              <td class="reports_table_cell">
                Masculino
              </td>
              <td class="reports_table_cell">
                dd/mm/YYYY
              </td>
              <td class="reports_table_cell">
                1.85
              </td>
              <td class="reports_table_cell">
                <button class="base_table_button">Abrir</button>
              </td>
            </tr>

            
          </table>

        </div>

      </div>
  

  `

}