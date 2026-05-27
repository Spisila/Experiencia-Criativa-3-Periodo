import './lista_pacientes.css'
import "../../components/base_button.css"
import "../../components/input_boxes.css"

import { supabase } from "../../lib/supabase"
import { navigateTo } from '../../main';

interface Paciente {
  paciente_id: string,
  nome_paciente: string,
  data_nascimento: string,
  sexo: string,
  paciente_cpf: string
}

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

  const { data: user_session } = await supabase.auth.getSession();
  
  if (!user_session) {
    return;
  }

  let nomes_ascendentes = true;
  let nascimentos_ascendentes = true;
  let sexo_ascendentes = true;
  let cpf_ascendentes = true;

  const user_id = user_session.session?.user.id

  const table = container.querySelector<HTMLTableElement>('#reports_table')

  if (!table) { return; }

  const { data: pacientes, error: pegarRelatoriosError } = await supabase
    .rpc('obter_pacientes_do_usuario', {
      medico_id_param: user_id,
      ascendente: nomes_ascendentes,
      ordenar_por: 'nome'
    });

  if (pegarRelatoriosError) {
    console.log("Erro ao pegar dados de relatorios")
    console.log(pegarRelatoriosError)
    return;
  }

  encher_relatorios(pacientes, table);

  const sort_by_patient_name_button = container.querySelector<HTMLButtonElement>('#sort_by_patient_name_button');
  const sort_by_date_of_birth_button = container.querySelector<HTMLButtonElement>('#sort_by_date_of_birth_button');
  const sort_by_sex_button = container.querySelector<HTMLButtonElement>('#sort_by_sex_button');

  sort_by_patient_name_button?.addEventListener('click', async () => {

    const linhas = container.querySelectorAll('.reports_table_row')

    linhas.forEach(linha => {
      linha.remove();
    })

    const { data: relatorios, error: pegarRelatoriosError } = await supabase
      .rpc('obter_pacientes_do_usuario', {
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
      .rpc('obter_pacientes_do_usuario', {
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
      .rpc('obter_pacientes_do_usuario', {
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


  const search_input = container.querySelector<HTMLButtonElement>('#search_bar');
  const search_button = container.querySelector<HTMLButtonElement>('#search_button');
  
  search_button?.addEventListener('click', async (_MouseEvent) => {
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

        const { data: pacienteEncontrado, error: pegarPacienteEncontradoError } = await supabase
          .from('paciente').select('*').eq('id', pacienteBuscado.at(i)!.id).single();
        
        if (pegarPacienteEncontradoError) {
          console.log("Erro ao pegar paciente encontrado")
          console.log(pegarPacienteEncontradoError)
          continue;
        }

        if (pacienteEncontrado) {
          const pacienteArray: Paciente[] = [{
            paciente_id: pacienteEncontrado.id,
            nome_paciente: pacienteEncontrado.nome,
            data_nascimento: pacienteEncontrado.data_nascimento,
            sexo: pacienteEncontrado.sexo,
            paciente_cpf: pacienteEncontrado.cpf
          }]
         
          encher_relatorios(pacienteArray, table);
        }
      }

    }

  })
  
}

function encher_relatorios(paciente: Paciente[], table: HTMLTableElement) {

  console.log(paciente)

  for (let i = 0; i < paciente.length; i++) {

    const linha = document.createElement('tr');
    linha.className = "reports_table_row"

    const nome_paciente = document.createElement('td');
    nome_paciente.textContent = paciente.at(i)!.nome_paciente;
    nome_paciente.className = "reports_table_cell"

    const data_nascimento = document.createElement('td');
    data_nascimento.textContent = new Date(paciente.at(i)!.data_nascimento).toLocaleString('pt-BR');
    data_nascimento.className = "reports_table_cell"

    const sexo = document.createElement('td');
    sexo.textContent = paciente.at(i)!.sexo;
    sexo.className = "reports_table_cell"

    const cpf = document.createElement('td');
    cpf.textContent = paciente.at(i)!.paciente_cpf;
    cpf.className = "reports_table_cell"

    const botao_container = document.createElement('td');
    botao_container.className = "reports_table_cell"

    const botao_criar_novo_relatorio = document.createElement("button");
    botao_criar_novo_relatorio.textContent = "Abrir"
    botao_criar_novo_relatorio.className = "base_table_button"

    botao_criar_novo_relatorio.addEventListener('click', (_MouseEvent) => {
      criar_novo_atendimento(paciente.at(i)!.paciente_id)
    })

    table.appendChild(linha)

    linha.appendChild(nome_paciente)
    linha.appendChild(data_nascimento)
    linha.appendChild(sexo)
    linha.appendChild(cpf)

    botao_container.appendChild(botao_criar_novo_relatorio)
    linha.appendChild(botao_container)


  }

}

function criar_novo_atendimento(paciente_id: string) {

  navigateTo("/nova_avaliacao")
  window.history.pushState(null, '', "/nova_avaliacao/" + paciente_id);

}