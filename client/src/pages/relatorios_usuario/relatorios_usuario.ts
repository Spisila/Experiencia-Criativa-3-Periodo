import './relatorios_usuario.css'
import "../../components/base_button.css"
import "../../components/input_boxes.css"

import { supabase } from "../../lib/supabase"
import { navigateTo } from '../../main';
import { UserPlus } from 'lucide-static';

interface Relatorio {
  id: string;
  nome_paciente: string;
  data_nascimento: string;
  sexo: string;
  data_realizada: string;
  score_final: number;
};

export async function init_relatorios_usuario_page() {

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

  const { data: user_session } = await supabase.auth.getSession();

  if (!user_session) {
    return;
  }

  let nomes_ascendentes = true;
  let nascimentos_ascendentes = true;
  let sexo_ascendentes = true;
  let realizadas_ascendentes = true;
  let score_ascendentes = true;

  const user_id = user_session.session?.user.id

  const table = container.querySelector<HTMLTableElement>('#reports_table')

  if (!table) { return; }

  const { data: relatorios, error: pegarRelatoriosError } = await supabase
    .rpc('obter_relatorios_ordenados', {
      medico_id_param: user_id,
      ascendente: nomes_ascendentes,
      ordenar_por: 'nome'
    });

  if (pegarRelatoriosError) {
    console.log("Erro ao pegar dados de relatorios")
    console.log(pegarRelatoriosError)
    return;
  }

  encher_relatorios(relatorios, table);

  const sort_by_patient_name_button = container.querySelector<HTMLButtonElement>('#sort_by_patient_name_button');
  const sort_by_date_of_birth_button = container.querySelector<HTMLButtonElement>('#sort_by_date_of_birth_button');
  const sort_by_sex_button = container.querySelector<HTMLButtonElement>('#sort_by_sex_button');
  const sort_by_avaliacao_date_button = container.querySelector<HTMLButtonElement>('#sort_by_avaliacao_date_button');
  const sort_by_total_score_button = container.querySelector<HTMLButtonElement>('#sort_by_total_score_button');


  sort_by_patient_name_button?.addEventListener('click', async () => {

    const linhas = container.querySelectorAll('.reports_table_row')

    linhas.forEach(linha => {
      linha.remove();
    })

    const { data: relatorios, error: pegarRelatoriosError } = await supabase
      .rpc('obter_relatorios_ordenados', {
        medico_id_param: user_id,
        ascendente: nomes_ascendentes,
        ordenar_por: 'nome'
      });

    nomes_ascendentes = !nomes_ascendentes;

    if (pegarRelatoriosError) {
      console.log("Erro relatorios em ordem de nome");
      console.log(pegarRelatoriosError)
    }

    if (relatorios) {
      encher_relatorios(relatorios, table)
    }

  });

  sort_by_date_of_birth_button?.addEventListener('click', async () => {

    const linhas = container.querySelectorAll('.reports_table_row')

    linhas.forEach(linha => {
      linha.remove();
    })

    const { data: relatorios, error: pegarRelatoriosError } = await supabase
      .rpc('obter_relatorios_ordenados', {
        medico_id_param: user_id,
        ascendente: nascimentos_ascendentes,
        ordenar_por: 'nascimento'
      });

    nascimentos_ascendentes = !nascimentos_ascendentes;

    if (pegarRelatoriosError) {
      console.log("Erro relatorios em ordem de nascimento");
      console.log(pegarRelatoriosError)
    }

    if (relatorios) {
      encher_relatorios(relatorios, table)
    }

  });

  sort_by_sex_button?.addEventListener('click', async () => {

    const linhas = container.querySelectorAll('.reports_table_row')

    linhas.forEach(linha => {
      linha.remove();
    })

    const { data: relatorios, error: pegarRelatoriosError } = await supabase
      .rpc('obter_relatorios_ordenados', {
        medico_id_param: user_id,
        ascendente: sexo_ascendentes,
        ordenar_por: 'sexo'
      });

    sexo_ascendentes = !sexo_ascendentes;

    if (pegarRelatoriosError) {
      console.log("Erro relatorios em ordem de sexo");
      console.log(pegarRelatoriosError)
    }

    if (relatorios) {
      encher_relatorios(relatorios, table)
    }

  });

  sort_by_avaliacao_date_button?.addEventListener('click', async () => {

    const linhas = container.querySelectorAll('.reports_table_row')

    linhas.forEach(linha => {
      linha.remove();
    })

    const { data: relatorios, error: pegarRelatoriosError } = await supabase
      .rpc('obter_relatorios_ordenados', {
        medico_id_param: user_id,
        ascendente: realizadas_ascendentes,
        ordenar_por: 'realizada'
      });

    realizadas_ascendentes = !realizadas_ascendentes;

    if (pegarRelatoriosError) {
      console.log("Erro relatorios em ordem de realização");
      console.log(pegarRelatoriosError)
    }

    if (relatorios) {
      encher_relatorios(relatorios, table)
    }

  });

  sort_by_total_score_button?.addEventListener('click', async () => {

    const linhas = container.querySelectorAll('.reports_table_row')

    linhas.forEach(linha => {
      linha.remove();
    })

    const { data: relatorios, error: pegarRelatoriosError } = await supabase
      .rpc('obter_relatorios_ordenados', {
        medico_id_param: user_id,
        ascendente: score_ascendentes,
        ordenar_por: 'score'
      });

    score_ascendentes = !score_ascendentes;

    if (pegarRelatoriosError) {
      console.log("Erro relatorios em ordem de nascimento");
      console.log(pegarRelatoriosError)
    }

    if (relatorios) {
      encher_relatorios(relatorios, table)
    }

  });

}

function encher_relatorios(relatorios: Relatorio[], table: HTMLTableElement) {

  for (let i = 0; i < relatorios.length; i++) {

    const linha = document.createElement('tr');
    linha.className = "reports_table_row"

    const nome_paciente = document.createElement('td');
    nome_paciente.textContent = relatorios.at(i)!.nome_paciente;
    nome_paciente.className = "reports_table_cell"

    const data_nascimento = document.createElement('td');
    data_nascimento.textContent = new Date(relatorios.at(i)!.data_nascimento).toLocaleString('pt-BR');
    data_nascimento.className = "reports_table_cell"

    const sexo = document.createElement('td');
    sexo.textContent = relatorios.at(i)!.sexo;
    sexo.className = "reports_table_cell"

    const avaliacao_data = document.createElement('td');
    avaliacao_data.textContent = new Date(relatorios.at(i)!.data_realizada).toLocaleString('pt-BR');
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
      ir_relatorio_especifico(relatorios.at(i)!.id)
    })

    table.appendChild(linha)

    linha.appendChild(nome_paciente)
    linha.appendChild(data_nascimento)
    linha.appendChild(sexo)
    linha.appendChild(avaliacao_data)
    linha.appendChild(score_total)

    botao_container.appendChild(botao_abrir_relatorio)
    linha.appendChild(botao_container)


  }

}

function ir_relatorio_especifico(relatorio_id: string) {

  navigateTo("/relatorio")
  window.history.pushState(null, '', "/relatorio/" + relatorio_id);

}