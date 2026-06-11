import './relatorios_admin.css'
import "../../components/base_button.css"
import "../../components/input_boxes.css"

import { supabase } from "../../lib/supabase"
import { navigateTo } from '../../main';

import { setup_fill_table, update_page, get_max_pages, setup_table_sorting } from '../../components/table_functions';

export async function init_relatorios_admin_page() {

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
              <col style="width: 200px;"> <!-- Data de nascimento -->
              <col style="width: 100px;"> <!-- Sexo -->
              <col style="width: 175px;"> <!-- Data avaliacao -->
              <col style="width: 150px;"> <!-- Score -->
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
                    Nome do Medico
                  </div>
  
                  <div class="header_cell_button">
                    <button id="sort_by_doctor_name_button" class="base_table_button" style="max-width: 30px; min-width: 30px; margin-right: 5px;">
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

  const { data: user_session } = await supabase.auth.getSession();

  if (!user_session) {
    console.log("Sem seção de usuário")
    return;
  }


  const table = container.querySelector<HTMLTableElement>('#reports_table')

  if (!table) { return; }

  const qnt = await get_entradas_todos_relatorios()

  let page = 1;

  let relatorios = await get_todos_relatorios('nome', true, 1);

  setup_fill_table(relatorios, table, ir_relatorio_especifico);

  const sort_by_patient_name_button = container.querySelector<HTMLButtonElement>('#sort_by_patient_name_button');
  const sort_by_doctor_name_button = container.querySelector<HTMLButtonElement>('#sort_by_doctor_name_button');
  const sort_by_date_of_birth_button = container.querySelector<HTMLButtonElement>('#sort_by_date_of_birth_button');
  const sort_by_sex_button = container.querySelector<HTMLButtonElement>('#sort_by_sex_button');
  const sort_by_avaliacao_date_button = container.querySelector<HTMLButtonElement>('#sort_by_avaliacao_date_button');
  const sort_by_total_score_button = container.querySelector<HTMLButtonElement>('#sort_by_total_score_button');


  setup_table_sorting(container,
    sort_by_patient_name_button,
    (ascendente) => get_todos_relatorios('nome', !ascendente, 1),
    (dados) => setup_fill_table(dados, table, ir_relatorio_especifico)
  )

  setup_table_sorting(container,
    sort_by_doctor_name_button,
    (ascendente) => get_todos_relatorios('usuario', ascendente, 1),
    (dados) => setup_fill_table(dados, table, ir_relatorio_especifico)
  )

  setup_table_sorting(container,
    sort_by_date_of_birth_button,
    (ascendente) => get_todos_relatorios('data_nascimento', ascendente, 1),
    (dados) => setup_fill_table(dados, table, ir_relatorio_especifico)
  )

  setup_table_sorting(container,
    sort_by_sex_button,
    (ascendente) => get_todos_relatorios('sexo', ascendente, 1),
    (dados) => setup_fill_table(dados, table, ir_relatorio_especifico)
  )

  setup_table_sorting(container,
    sort_by_avaliacao_date_button,
    (ascendente) => get_todos_relatorios('data_avaliacao', ascendente, 1),
    (dados) => setup_fill_table(dados, table, ir_relatorio_especifico)
  )

  setup_table_sorting(container,
    sort_by_total_score_button,
    (ascendente) => get_todos_relatorios('score', ascendente, 1),
    (dados) => setup_fill_table(dados, table, ir_relatorio_especifico)
  )



  const search_input = container.querySelector<HTMLButtonElement>('#search_bar');
  const search_button = container.querySelector<HTMLButtonElement>('#search_button');

  // TODO: Deixar pesquisa em uma função exportada em table_functions 
  search_button?.addEventListener('click', async (_MouseEvent) => {

    console.log(search_input?.value.length)

    if (search_input?.value.length === 0) {

      relatorios = await get_todos_relatorios('nome', true, 1);
      setup_fill_table(relatorios, table, ir_relatorio_especifico)
      return;

    }

    if (search_input?.value) {

      console.log("Pesquisando por: " + search_input.value)

      const { data: pacienteBuscado, error: pegarPacienteBuscadoError } = await supabase
        .from('paciente').select('id').or(`nome.ilike.${search_input.value}%, cpf.ilike.${search_input.value}%`);

      if (pegarPacienteBuscadoError) {
        console.log("Erro ao pesquisar paciente")
        console.log(pegarPacienteBuscadoError)
        return;
      }

      if (!pacienteBuscado || pacienteBuscado.length === 0) {
        console.log("Nenhum paciente encontrado com esse nome ou cpf")
        return;
      }

      const linhas = container.querySelectorAll('.reports_table_row')

      linhas.forEach(linha => {
        linha.remove();
      })

      console.log(pacienteBuscado)

      for (let i = 0; i < pacienteBuscado.length; i++) {

        const { data: relatoriosBuscados, error: pegarRelatoriosError } = await supabase
          .rpc('obter_relatorios_do_paciente_administrador', {
            paciente_id: pacienteBuscado.at(i)!.id,
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
  });

  update_page(
    container,
    page,
    get_max_pages(qnt!, 23),
    (p) => get_todos_relatorios('nome', true, p),
    (dados) => setup_fill_table(dados, table, ir_relatorio_especifico))

}

// TODO: Numero de itens por pagina dinamico
async function get_todos_relatorios(ordenar_por: string, ascendente: boolean, page: number) {

  const from = (page - 1) * 24
  const to = (page * 24) - 1

  const { data: relatorios, error: pegarRelatoriosError } = await supabase
    .rpc('pegar_dados_todos_relatorios', {
      ascendente: ascendente,
      ordenar_por: ordenar_por
    }).range(from, to);

  if (pegarRelatoriosError) {
    console.log("Erro ao pegar dados de relatorios")
    console.log(pegarRelatoriosError)
    return;
  }

  return relatorios

}

async function get_entradas_todos_relatorios() {

  const { count, error: pegarRelatoriosError } = await supabase
    .from('avaliacao')
    .select('*', { count: 'exact', head: true })

  if (pegarRelatoriosError) {
    console.log("Erro ao pegar dados de usuarios")
    console.log(pegarRelatoriosError)
    return 0;
  }

  return count;

}

function ir_relatorio_especifico(relatorio_id: string) {

  navigateTo("/relatorio")
  window.history.pushState(null, '', "/relatorio/" + relatorio_id);

}

