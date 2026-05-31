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
              <td class="reports_table_header_cell" colspan="2">
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

  let nomes_pacientes_ascendentes = true;
  let nomes_medicos_ascendentes = true;
  let nascimentos_ascendentes = true;
  let sexo_ascendentes = true;
  let realizadas_ascendentes = true;
  let score_ascendentes = true;

  const table = container.querySelector<HTMLTableElement>('#reports_table')

  if (!table) { return; }

  relatorios_por('nome', table, realizadas_ascendentes, container);

  const sort_by_patient_name_button = container.querySelector<HTMLButtonElement>('#sort_by_patient_name_button');
  const sort_by_doctor_name_button = container.querySelector<HTMLButtonElement>('#sort_by_doctor_name_button');
  const sort_by_date_of_birth_button = container.querySelector<HTMLButtonElement>('#sort_by_date_of_birth_button');
  const sort_by_sex_button = container.querySelector<HTMLButtonElement>('#sort_by_sex_button');
  const sort_by_avaliacao_date_button = container.querySelector<HTMLButtonElement>('#sort_by_avaliacao_date_button');
  const sort_by_total_score_button = container.querySelector<HTMLButtonElement>('#sort_by_total_score_button');


  sort_by_patient_name_button?.addEventListener('click', async () => {

    relatorios_por('nome', table, nomes_pacientes_ascendentes, container);
    nomes_pacientes_ascendentes = !nomes_pacientes_ascendentes;

  });

  sort_by_doctor_name_button?.addEventListener('click', async () => {

    relatorios_por('medico', table, nomes_medicos_ascendentes, container);
    nomes_medicos_ascendentes = !nomes_medicos_ascendentes;
  });

  sort_by_date_of_birth_button?.addEventListener('click', async () => {

    relatorios_por('nascimento', table, nascimentos_ascendentes, container);
    nascimentos_ascendentes = !nascimentos_ascendentes;

  });

  sort_by_sex_button?.addEventListener('click', async () => {

    relatorios_por('sexo', table, sexo_ascendentes, container);
    sexo_ascendentes = !sexo_ascendentes;

  });

  sort_by_avaliacao_date_button?.addEventListener('click', async () => {

    relatorios_por('realizada', table, realizadas_ascendentes, container);
    realizadas_ascendentes = !realizadas_ascendentes;

  });

  sort_by_total_score_button?.addEventListener('click', async () => {

    relatorios_por('score', table, score_ascendentes, container);
    score_ascendentes = !score_ascendentes;

  });

  const search_input = container.querySelector<HTMLButtonElement>('#search_bar');
  const search_button = container.querySelector<HTMLButtonElement>('#search_button');

  search_button?.addEventListener('click', async (_MouseEvent) => {

    console.log(search_input?.value.length)

    if (search_input?.value.length === 0) {

      console.log("Campo de pesquisa vazio, mostrando todos os relatorios")
      relatorios_por('nome', table, realizadas_ascendentes, container);
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
          encher_relatorios(relatoriosBuscados, table)
        }
      }
    }
  });

  console.log("Clicou no botao de pesquisa")

  const pagina_anterior_button = container.querySelector<HTMLButtonElement>('#pagina_anterior');
  const pagina_proxima_button = container.querySelector<HTMLButtonElement>('#pagina_proxima');

  pagina_anterior_button!.style.display = "none";

  pagina_anterior_button?.addEventListener('click', async () => {
    trocar_pagina(-1, table, container, 'nome', nomes_pacientes_ascendentes);
  });

  pagina_proxima_button?.addEventListener('click', async () => {
    trocar_pagina(1, table, container, 'nome', nomes_pacientes_ascendentes);
    console.log("Pagina proxima")
  });

}

interface Relatorio {
  avaliacao_id: string;
  nome_medico: string;
  nome_paciente: string;
  data_nascimento: string;
  sexo: string;
  data_avaliacao: string;
  score_final: number;
};


function encher_relatorios(relatorios: Relatorio[], table: HTMLTableElement) {

  for (let i = 0; i < relatorios.length; i++) {

    const linha = document.createElement('tr');
    linha.className = "reports_table_row"

    const nome_paciente = document.createElement('td');
    nome_paciente.textContent = relatorios.at(i)!.nome_paciente;
    nome_paciente.className = "reports_table_cell"

    const nome_medico = document.createElement('td');
    nome_medico.textContent = relatorios.at(i)!.nome_medico;
    nome_medico.className = "reports_table_cell"


    const data_nascimento = document.createElement('td');
    data_nascimento.textContent = new Date(relatorios.at(i)!.data_nascimento).toLocaleString('pt-BR');
    data_nascimento.className = "reports_table_cell"

    const sexo = document.createElement('td');
    sexo.textContent = relatorios.at(i)!.sexo;
    sexo.className = "reports_table_cell"

    const avaliacao_data = document.createElement('td');
    avaliacao_data.textContent = new Date(relatorios.at(i)!.data_avaliacao).toLocaleString('pt-BR');
    avaliacao_data.className = "reports_table_cell"

    const score_total = document.createElement('td');
    score_total.textContent = relatorios.at(i)!.score_final.toString();
    score_total.className = "reports_table_cell"

    const botao_container = document.createElement('td');
    botao_container.className = "reports_table_cell"

    const botao_abrir_relatorio = document.createElement("button");
    botao_abrir_relatorio.textContent = "Abrir"
    botao_abrir_relatorio.className = "base_table_button"

    botao_abrir_relatorio.addEventListener('click', (_MouseEvent) => {
      ir_relatorio_especifico(relatorios.at(i)!.avaliacao_id)
    })

    table.appendChild(linha)

    linha.appendChild(nome_paciente)
    linha.appendChild(nome_medico)
    linha.appendChild(data_nascimento)
    linha.appendChild(sexo)
    linha.appendChild(avaliacao_data)
    linha.appendChild(score_total)

    botao_container.appendChild(botao_abrir_relatorio)
    linha.appendChild(botao_container)


  }

}

async function trocar_pagina(pagina: number, table: HTMLTableElement, container: HTMLDivElement, ordenar_por: string, ascendente: boolean) {


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
    .rpc('obter_todos_relatorios', {
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

  encher_relatorios(relatorios, table);

}

async function relatorios_por(ordenar_por: string, table: HTMLTableElement, ascendente: boolean, container: HTMLDivElement) {

  const linhas = container.querySelectorAll('.reports_table_row')

  linhas.forEach(linha => {
    linha.remove();
  })

  const { data: relatorios, error: pegarRelatoriosError } = await supabase
    .rpc('obter_todos_relatorios', {
      ascendente: ascendente,
      ordenar_por: ordenar_por
    });

  if (pegarRelatoriosError) {
    console.log("Erro ao pegar dados de relatorios")
    console.log(pegarRelatoriosError)
    return;
  }

  encher_relatorios(relatorios, table);
}

function ir_relatorio_especifico(relatorio_id: string) {

  navigateTo("/relatorio")
  window.history.pushState(null, '', "/relatorio/" + relatorio_id);

}

