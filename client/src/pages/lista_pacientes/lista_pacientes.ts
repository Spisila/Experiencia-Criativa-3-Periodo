import './lista_pacientes.css'
import "../../components/base_button.css"
import "../../components/input_boxes.css"

import { supabase } from "../../lib/supabase"
import { navigateTo } from '../../main';

import { get_auth_user } from '../../components/auth_functions';

import { setup_table_sorting, setup_fill_table, clear_table, update_page, get_max_pages } from '../../components/table_functions';

import { trigger_notification_popup, showNotification, hideNotification } from '../../components/notification_popup';

export async function init_lista_pacientes_page() {

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
              <col style="width: 250px;"> <!-- Data de nascimento -->
              <col style="width: 100px;"> <!-- Sexo -->
              <col style="width: 200px;"> <!-- CPF -->
              <col style="width: 50px;"> <!-- Botão -->
            </colgroup>

            <tr class="reports_table_header">
              <td class="reports_table_header_cell" style="display: flex; justify-content: left; align-items: center; text-align:center">

                <div class="header_cell_title_button_container">

                  <div class="header_cell_title">
                    Nome do Paciente
                  </div>
  
                  <div class="header_cell_button">
                    <button id="sort_by_patient_name_button" class="base_table_button" style="max-width: 30px; min-width: 30px; margin-right: 5px;">
                      <img class="icon_image" src="/node_modules/lucide-static/icons/arrow-up-down.svg" alt="Ordenar"
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
                      <img class="icon_image" src="/node_modules/lucide-static/icons/arrow-up-down.svg" alt="Ordenar"
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
                      <img class="icon_image" src="/node_modules/lucide-static/icons/arrow-up-down.svg" alt="Ordenar"
                        style="height: 100%; " />
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

  // TODO: função em auth_functions que pega o id do usuario
  const user_session = await get_auth_user();
  const user_id = String(user_session!.session?.user.id)
  
  const table = container.querySelector<HTMLTableElement>('#reports_table')
  
  if (!table) { return; }
  
  showNotification("Carregando pacientes...")
  
  let pacientes = await get_pacientes('nome', true, user_id, 1);
  
  if (pacientes!.length == 0) {
    hideNotification();
    trigger_notification_popup("Nenhum paciente encontrado");
  }
  else {

    hideNotification();
  }
  
  const pacientes_entradas = await get_entradas_pacientes(user_id);
  setup_fill_table(pacientes ?? [], table, ir_perfil_paciente);

  // Botoes de ordenação
  const sort_by_patient_name_button = container.querySelector<HTMLButtonElement>('#sort_by_patient_name_button');
  const sort_by_date_of_birth_button = container.querySelector<HTMLButtonElement>('#sort_by_date_of_birth_button');
  const sort_by_sex_button = container.querySelector<HTMLButtonElement>('#sort_by_sex_button');

  // Setup de botoes de ordenação
  setup_table_sorting(container,
    sort_by_patient_name_button,
    (ascendente) => get_pacientes('nome', !ascendente, user_id, 1),
    (dados) => setup_fill_table(dados, table, ir_perfil_paciente)
  )

  setup_table_sorting(container,
    sort_by_date_of_birth_button,
    (ascendente) => get_pacientes('data_nascimento', ascendente, user_id, 1),
    (dados) => setup_fill_table(dados, table, ir_perfil_paciente)
  )

  setup_table_sorting(container,
    sort_by_sex_button,
    (ascendente) => get_pacientes('sexo', ascendente, user_id, 1),
    (dados) => setup_fill_table(dados, table, ir_perfil_paciente)
  )

  let page = 1;

  update_page(
    container,
    page,
    get_max_pages(pacientes_entradas!, 25),
    (p) => get_pacientes('nome', true, user_id, p),
    (dados) => setup_fill_table(dados ?? [], table, ir_perfil_paciente)
  );

}

// Pega quantidade total de pacientes no banco
async function get_entradas_pacientes(usuario_id: string) {

  const { count, error: pegarRelatoriosError } = await supabase
    .from('paciente')
    .select('*', { count: 'exact', head: true })
    .eq('usuario_id', usuario_id)

  if (pegarRelatoriosError) {
    console.log("Erro ao pegar dados de usuarios")
    console.log(pegarRelatoriosError)
    return 0;
  }

  return count;

}

// TODO: Tamanho de pagina dinamico com tamanho da tela
// Pega pacientes do banco
async function get_pacientes<T extends object>(ordenar_por: string, ascendente: boolean, usuario_id: string, page: number): Promise<T[] | null> {

  const from = (page - 1) * 24
  const to = (page * 24) - 1

  const { data: pacientes, error: pegarRelatoriosError } = await supabase
    .from('paciente')
    .select('nome, data_nascimento, sexo, cpf, id')
    .eq('usuario_id', usuario_id)
    .order(ordenar_por, { ascending: ascendente })
    .range(from, to)

  if (pegarRelatoriosError) {
    console.log("Erro ao pegar dados de usuarios")
    console.log(pegarRelatoriosError)
    return [];
  }

  console.log("Pacientes length = " + pacientes.length)

  ascendente = !ascendente

  return pacientes as T[];

}

// Ir para pagina do perfil do paciente e colocar id do paciente na url para carregar as infos dele la
function ir_perfil_paciente(paciente_id: string) {

  navigateTo("/perfil_paciente")
  window.history.pushState(null, '', "/perfil_paciente/" + paciente_id);

}
