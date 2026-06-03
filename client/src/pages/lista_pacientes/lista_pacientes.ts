import './lista_pacientes.css'
import "../../components/base_button.css"
import "../../components/input_boxes.css"

import { supabase } from "../../lib/supabase"
import { navigateTo } from '../../main';

import { get_auth_user } from '../../components/auth_functions';

import { encher_tabela_pacientes } from '../../components/table_functions';
import type { Paciente } from '../../components/table_functions';

import { setup_table_sorting, setup_fill_table, switch_page, clear_table } from '../../components/table_functions';

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
  
                  <div class="header_cell_button">
                    <button id="sort_by_avaliacao_date_button" class="base_table_button" style="max-width: 30px; min-width: 30px; margin-right: 5px;">
                      <img class="icon_image" src="/node_modules/lucide-static/icons/arrow-up-down.svg" alt="Ordenar"
                        style="height: 100%;  " />
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

  const user_session = await get_auth_user();

  // let nomes_ascendentes = true;
  // let nascimentos_ascendentes = true;
  // let sexo_ascendentes = true;

  const user_id = String(user_session!.session?.user.id)

  const table = container.querySelector<HTMLTableElement>('#reports_table')

  if (!table) { return; }



  const pacientes = await get_pacientes('nome', true, user_id, 1);
  const pacientes_entradas = pacientes.length;
  // const data = await get_pacientes('nome', true, user_id, (pagina - 1) * 24, (pagina * 24) - 1);

  let current_sort;


  setup_fill_table(pacientes, table, criar_novo_atendimento);

  current_sort = 'nome';

  const sort_by_patient_name_button = container.querySelector<HTMLButtonElement>('#sort_by_patient_name_button');
  const sort_by_date_of_birth_button = container.querySelector<HTMLButtonElement>('#sort_by_date_of_birth_button');
  const sort_by_sex_button = container.querySelector<HTMLButtonElement>('#sort_by_sex_button');

  sort_by_patient_name_button?.addEventListener('click', (_event) => {
    current_sort = 'nome';
  })

  sort_by_date_of_birth_button?.addEventListener('click', (_event) => {
    current_sort = 'data_nascimento';
  })

  sort_by_sex_button?.addEventListener('click', (_event) => {
    current_sort = 'sexo';
  })


  setup_table_sorting({
    button: sort_by_patient_name_button,
    fetch_data: async (nomes_ascendentes) => {
      return await get_pacientes('nome', nomes_ascendentes, user_id, 1)
    },
    render_data: (pacientes) => {
      setup_fill_table(pacientes, table, criar_novo_atendimento);
    }
  })

  setup_table_sorting({
    button: sort_by_date_of_birth_button,
    fetch_data: async (nascimentos_ascendentes) => {
      return await get_pacientes('data_nascimento', nascimentos_ascendentes, user_id, 1)
    },
    render_data: (pacientes) => {
      setup_fill_table(pacientes, table, criar_novo_atendimento);
    }
  })

  setup_table_sorting({
    button: sort_by_sex_button,
    fetch_data: async (sexo_ascendentes) => {
      return await get_pacientes('sexo', sexo_ascendentes, user_id, 1)
    },
    render_data: (pacientes) => {
      setup_fill_table(pacientes, table, criar_novo_atendimento);
    }
  })

  let page = 1;

  const pagina_anterior_button = container.querySelector<HTMLButtonElement>('#pagina_anterior');
  const pagina_proxima_button = container.querySelector<HTMLButtonElement>('#pagina_proxima');

  const current_page = container.querySelector<HTMLParagraphElement>('#current_page');

  pagina_anterior_button!.style.display = "none";

  pagina_anterior_button?.addEventListener('click', async () => {

    if (page === 1) {
      pagina_anterior_button!.style.display = "block";
    }
    else if (page > 1) {
      page--;
      pagina_anterior_button!.style.display = "none";
      pagina_proxima_button!.style.display = "block";
    }
    else {
      pagina_anterior_button!.style.display = "none";
      pagina_proxima_button!.style.display = "block";
    }

    current_page!.textContent = page.toString();

    const data = await get_pacientes('nome', true, user_id, page);

    clear_table(container)

    setup_fill_table(data, table, criar_novo_atendimento)


  });

  pagina_proxima_button?.addEventListener('click', async () => {

    page++;
    console.log("pagina: " + page)

    if (pacientes_entradas > 24) {
      pagina_proxima_button!.style.display = "block";
    }
    else {
      pagina_proxima_button!.style.display = "none";
      pagina_anterior_button!.style.display = "block";
    }

    current_page!.textContent = page.toString();

    const data = await get_pacientes('nome', true, user_id, page);

    clear_table(container)

    setup_fill_table(data, table, criar_novo_atendimento)

  });

}

async function get_pacientes<T extends object>(ordenar_por: string, ascendente: boolean, usuario_id: string, page: number): Promise<T[]> {

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

async function get_relatorios<T extends object>(ordenar_por: string, ascendente: boolean, usuario_id: string): Promise<T[]> {

  const { data: relatorios, error: pegarRelatoriosError } = await supabase
    .rpc("pegar_dados_relatorios", {
      usuario_id: usuario_id,
      ordenar_por: ordenar_por,
      ascendente: ascendente
    })

  if (pegarRelatoriosError) {
    console.log("Erro ao pegar dados de usuarios")
    console.log(pegarRelatoriosError)
    return [];
  }

  return relatorios as T[];

}

// async function trocar_pagina(pagina: number, user_id: string, table: HTMLTableElement, container: HTMLDivElement, ordenar_por: string, ascendente: boolean) {

//   const contador_pagina = container.querySelector<HTMLParagraphElement>('#current_page')
//   const antes_button = container.querySelector<HTMLButtonElement>('#pagina_anterior')
//   const proxima_button = container.querySelector<HTMLButtonElement>('#pagina_proxima')

//   if (!contador_pagina) { return; }
//   const pagina_atual = parseInt(contador_pagina.textContent || "1");
//   const nova_pagina = pagina_atual + pagina;

//   if (nova_pagina === 1) {
//     antes_button!.style.display = "none";
//   }
//   else {
//     antes_button!.style.display = "block";
//   }

//   if (nova_pagina < 1) {
//     contador_pagina.textContent = "1";
//     return;
//   }
//   contador_pagina.textContent = (nova_pagina).toString();

//   const linhas = container.querySelectorAll('.reports_table_row')

//   linhas.forEach(linha => {
//     linha.remove();
//   })

//   const { data: relatorios, error: pegarRelatoriosError } = await supabase
//     .rpc('obter_pacientes_do_usuario', {
//       medico_id_param: user_id,
//       ascendente: ascendente,
//       ordenar_por: ordenar_por,
//       pagina: nova_pagina,
//     });

//   if (pegarRelatoriosError) {
//     console.log("Erro ao pegar dados de relatorios")
//     console.log(pegarRelatoriosError)
//     return;
//   }

//   if (relatorios.length < 24) {
//     proxima_button!.style.display = "none";
//   }
//   else {
//     proxima_button!.style.display = "block";
//   }

//   encher_tabela_pacientes(relatorios, table, criar_novo_atendimento);

// }

function criar_novo_atendimento(paciente_id: string) {

  navigateTo("/nova_avaliacao")
  window.history.pushState(null, '', "/nova_avaliacao/" + paciente_id);

}