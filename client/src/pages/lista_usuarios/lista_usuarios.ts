import './lista_usuarios.css'
import "../../components/base_button.css"
import "../../components/input_boxes.css"

import { supabase } from "../../lib/supabase"
import { navigateTo } from '../../main';

import { encher_tabela_usuarios, sort_table_by_name, setup_table_sorting, setup_fill_table } from '../../components/table_functions';
import type { Usuario, sort_table_options } from '../../components/table_functions';

import { get_auth_user } from '../../components/auth_functions';
import { search_users } from '../../components/search_bar';
import { object } from 'zod';

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
  
                  <div class="header_cell_button">
                    <button id="sort_by_date_of_birth_button" class="base_table_button" style="max-width: 30px; min-width: 30px; margin-right: 5px;">
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

  let nomes_ascendentes = true;

  const user_id = user_session!.session?.user.id

  const table = container.querySelector<HTMLTableElement>('#reports_table')

  if (!table) { return; }

  const sort_name_button = container.querySelector<HTMLButtonElement>('#sort_by_user_name_button');

  setup_table_sorting({
    button: sort_name_button,
    fetch_data: async (nomes_ascendentes) => {

      return await get_usuarios('nome', nomes_ascendentes)

    },

    render_data: (usuarios) => {
      setup_fill_table(usuarios, table, go_to_user_page);
    }

  });

  const usuarios = await get_usuarios('nome', nomes_ascendentes);

  setup_fill_table(usuarios, table, go_to_user_page)

  const pagina_anterior_button = container.querySelector<HTMLButtonElement>('#pagina_anterior');
  const pagina_proxima_button = container.querySelector<HTMLButtonElement>('#pagina_proxima');

  pagina_anterior_button!.style.display = "none";

  pagina_anterior_button?.addEventListener('click', async () => {
    trocar_pagina(-1, user_id!, table, container, 'nome', nomes_ascendentes);
  });

  pagina_proxima_button?.addEventListener('click', async () => {
    trocar_pagina(1, user_id!, table, container, 'nome', nomes_ascendentes);
  });

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

  navigateTo("/perfil_usuario/" + user_id)

}

async function trocar_pagina(pagina: number, user_id: string, table: HTMLTableElement, container: HTMLDivElement, ordenar_por: string, ascendente: boolean) {


  const contador_pagina = container.querySelector<HTMLParagraphElement>('#current_page')
  const antes_button = container.querySelector<HTMLButtonElement>('#pagina_anterior')
  const proxima_button = container.querySelector<HTMLButtonElement>('#pagina_proxima')

  if (!contador_pagina) { return; }
  const pagina_atual = parseInt(contador_pagina.textContent || "1");
  const nova_pagina = pagina_atual + pagina;

  if (nova_pagina === 1) {
    antes_button!.style.display = "none";
  }
  else {
    antes_button!.style.display = "block";
  }

  if (nova_pagina < 1) {
    contador_pagina.textContent = "1";
    return;
  }
  contador_pagina.textContent = (nova_pagina).toString();

  const linhas = container.querySelectorAll('.reports_table_row')

  linhas.forEach(linha => {
    linha.remove();
  })

  const { data: relatorios, error: pegarRelatoriosError } = await supabase
    .rpc('obter_pacientes_do_usuario', {
      medico_id_param: user_id,
      ascendente: ascendente,
      ordenar_por: ordenar_por,
      pagina: nova_pagina,
    });

  if (pegarRelatoriosError) {
    console.log("Erro ao pegar dados de relatorios")
    console.log(pegarRelatoriosError)
    return;
  }

  if (relatorios.length < 24) {
    proxima_button!.style.display = "none";
  }
  else {
    proxima_button!.style.display = "block";
  }

  encher_tabela_usuarios(relatorios, table, go_to_user_page);

}