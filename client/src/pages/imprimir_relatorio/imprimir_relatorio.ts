import './imprimir_relatorio.css'
import "../../components/base_button.css"
import "../../components/input_boxes.css"

import { supabase } from "../../lib/supabase"
import { navigateTo } from '../../main';

export async function init_imprimir_relatorio_page() {

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

          <table class="reports_table" id="reports_table">

            <tr class="reports_table_header">
              <td class="reports_table_header_cell" style="display: flex; justify-content: left; align-items: center; text-align:center">

                <div class="header_cell_title_button_container">

                  <div class="header_cell_title">
                    Nome do Paciente
                  </div>
  
                  <div class="header_cell_button">
                    <button id="sort_by_patient_name_button" class="base_table_button" style="max-width: 30px; min-width: 30px; margin-right: 5px;">
                      <img class="icon_image" src="/node_modules/lucide-static/icons/arrow-up-down.svg" alt="Paciente"
                        style="height: 100%;  " />
                    </button>
                  </div>
                
                </div>


              </td>
              <td class="reports_table_header_cell">
                
                <div class="header_cell_title_button_container">

                  <div class="header_cell_title">
                    Data de nascimento
                  </div>
  
                  <div class="header_cell_button">
                    <button id="sort_by_date_of_birth_button" class="base_table_button" style="max-width: 30px; min-width: 30px; margin-right: 5px;">
                      <img class="icon_image" src="/node_modules/lucide-static/icons/arrow-up-down.svg" alt="Paciente"
                        style="height: 100%;  " />
                    </button>
                  </div>
                
                </div>

              </td>
              <td class="reports_table_header_cell">
                
                <div class="header_cell_title_button_container">

                  <div class="header_cell_title">
                    Sexo
                  </div>
  
                  <div class="header_cell_button">
                    <button id="sort_by_sex_button" class="base_table_button" style="max-width: 30px; min-width: 30px; margin-right: 5px;">
                      <img class="icon_image" src="/node_modules/lucide-static/icons/arrow-up-down.svg" alt="Paciente"
                        style="height: 100%; " />
                    </button>
                  </div>
                
                </div>

              </td>
              <td class="reports_table_header_cell">
                
                <div class="header_cell_title_button_container">

                  <div class="header_cell_title">
                    Data avaliação
                  </div>
  
                  <div class="header_cell_button">
                    <button id="sort_by_avaliacao_date_button" class="base_table_button" style="max-width: 30px; min-width: 30px; margin-right: 5px;">
                      <img class="icon_image" src="/node_modules/lucide-static/icons/arrow-up-down.svg" alt="Paciente"
                        style="height: 100%;  " />
                    </button>
                  </div>
                
                </div>

              </td>
              <td class="reports_table_header_cell">
                <div class="header_cell_title_button_container">

                  <div class="header_cell_title">
                    Score total
                  </div>
  
                  <div class="header_cell_button">
                    <button id="sort_by_total_score_button" class="base_table_button" style="width: 30%; margin-right: 5px;">
                      <img class="icon_image" src="/node_modules/lucide-static/icons/arrow-up-down.svg" alt="Paciente"
                        style="height: 100%;" />
                    </button>
                  </div>
                
                </div>
              </td>
              <td class="reports_table_header_cell" colspan="2">
                Abrir
              </td>
            </tr>

          </table>

        </div>

      </div>
  
  `

  

}
