import './relatorios_usuario.css'
import "../../components/base_button.css"
import "../../components/input_boxes.css"

import { supabase } from "../../lib/supabase"
import { navigate_to } from '../../main';

import { clear_table, get_max_pages, setup_fill_table, setup_table_sorting, update_page } from '../../components/table_functions';

import { get_user_id, get_user_session } from '../../components/auth_functions';
import { hide_notification, show_notification, trigger_notification_popup } from '../../components/notification_popup';


export async function init_relatorios_usuario_page() {

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

            <p id="current_page" >1</p>

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
                <col style="width: 200px;"> <!-- Data avaliacao -->
                <col style="width: 200px;"> <!-- Score -->
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
              <td class="reports_table_header_cell" colspan="1">
                Abrir
              </td>
            </tr>

          </table>

        </div>

      </div>
  
  `


  const user_id = await get_user_id();

  const table = container.querySelector<HTMLTableElement>('#reports_table')

  if (!table) { return; }

  show_notification("Buscando relatórios...")

  const relatorios = await get_relatorios(String(user_id), 'nome', true, 1)

  if (relatorios.length == 0) {
    hide_notification();
    trigger_notification_popup("Nenhum relatorio encontrado");
  }
  else {

    hide_notification();
  }


  setup_fill_table(relatorios, table, ir_relatorio_especifico);

  const sort_by_patient_name_button = container.querySelector<HTMLButtonElement>('#sort_by_patient_name_button');
  const sort_by_date_of_birth_button = container.querySelector<HTMLButtonElement>('#sort_by_date_of_birth_button');
  const sort_by_sex_button = container.querySelector<HTMLButtonElement>('#sort_by_sex_button');
  const sort_by_avaliacao_date_button = container.querySelector<HTMLButtonElement>('#sort_by_avaliacao_date_button');
  const sort_by_total_score_button = container.querySelector<HTMLButtonElement>('#sort_by_total_score_button');

  setup_table_sorting(container,
    sort_by_patient_name_button,
    (ascendente) => get_relatorios(user_id, 'nome', !ascendente, 1),
    (dados) => setup_fill_table(dados, table, ir_relatorio_especifico)
  )

  setup_table_sorting(container,
    sort_by_date_of_birth_button,
    (ascendente) => get_relatorios(user_id, 'data_nascimento', ascendente, 1),
    (dados) => setup_fill_table(dados, table, ir_relatorio_especifico)
  )

  setup_table_sorting(container,
    sort_by_sex_button,
    (ascendente) => get_relatorios(user_id, 'sexo', ascendente, 1),
    (dados) => setup_fill_table(dados, table, ir_relatorio_especifico)
  )

  setup_table_sorting(container,
    sort_by_avaliacao_date_button,
    (ascendente) => get_relatorios(user_id, 'data_avaliacao', ascendente, 1),
    (dados) => setup_fill_table(dados, table, ir_relatorio_especifico)
  )

  setup_table_sorting(container,
    sort_by_total_score_button,
    (ascendente) => get_relatorios(user_id, 'score', ascendente, 1),
    (dados) => setup_fill_table(dados, table, ir_relatorio_especifico)
  )


  // TODO: search como função 
  const search_input = container.querySelector<HTMLButtonElement>('#search_bar');
  const search_button = container.querySelector<HTMLButtonElement>('#search_button');

  search_button?.addEventListener('click', async (_MouseEvent) => {

    if (search_input?.value.length === 0) {

      let relatorios = await get_relatorios(user_id, 'nome', true, 1)

      clear_table(container)
      setup_fill_table(relatorios, table, ir_relatorio_especifico)
      return;
    }


    if (search_input?.value) {

      const { data: pacienteBuscado, error: pegarPacienteBuscadoError } = await supabase
        .from('paciente').select('id').or(`nome.ilike.${search_input.value}%, cpf.ilike.${search_input.value}%`);

      if (pegarPacienteBuscadoError) {
        console.log("Erro ao pesquisar paciente")
        console.log(pegarPacienteBuscadoError)
        return;
      }

      if (!pacienteBuscado || pacienteBuscado.length === 0) {
        trigger_notification_popup("Nenhum paciente encontrado com esse nome ou CPF")
        return;
      }

      clear_table(container);

      for (let i = 0; i < pacienteBuscado.length; i++) {

        const { data: relatoriosBuscados, error: pegarRelatoriosError } = await supabase
          .rpc('obter_relatorios_do_paciente', {
            paciente_id_param: pacienteBuscado.at(i)!.id,
            ascendente: true,
            ordenar_por: 'nome'
          });

        if (pegarRelatoriosError) {
          console.log("Erro relatorios buscados por paciente");
          console.log(pegarRelatoriosError)
        }

        if (relatoriosBuscados) {
          setup_fill_table(relatoriosBuscados, table, ir_relatorio_especifico)
        }
      }


    }

  })

  let realatorio_entadas = await get_entradas_relatorios(String(user_id))

  update_page(
    container,
    1,
    get_max_pages(realatorio_entadas!, 24),
    (p) => get_relatorios(String(user_id), 'nome', true, p),
    (dados) => setup_fill_table(dados ?? [], table, ir_relatorio_especifico)
  )

}

// TODO: items por pagina dinamico
async function get_relatorios(usuario_id: string, ordenar_por: string, ascendente: boolean, page: number) {

  const from = (page - 1) * 24
  const to = (page * 24) - 1

  console.log(usuario_id)

  const { data: relatorios, error: pegarRelatoriosError } = await supabase
    .rpc('pegar_dados_relatorios', {
      usuario_id: usuario_id,
      ascendente: ascendente,
      ordenar_por: ordenar_por
    }).range(from, to);

  if (pegarRelatoriosError) {
    console.log("Erro ao pegar dados de relatorios")
    console.log(pegarRelatoriosError)
    return;
  }

  console.log(relatorios)

  return relatorios

}

async function get_entradas_relatorios(usuario_id: string) {

  const { count, error: pegarRelatoriosError } = await supabase
    .from('avaliacao')
    .select('*', { count: 'exact', head: true })
    .eq('usuario_id', usuario_id)

  if (pegarRelatoriosError) {
    console.log("Erro ao pegar dados de usuarios")
    console.log(pegarRelatoriosError)
    return 0;
  }

  return count;

}

function ir_relatorio_especifico(relatorio_id: string) {

  navigate_to("/relatorio")
  window.history.pushState(null, '', "/relatorio/" + relatorio_id);

}

