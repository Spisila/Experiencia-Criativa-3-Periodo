import './relatorios_usuario.css'
import "../../components/base_button.css"
import "../../components/input_boxes.css"

import { supabase } from "../../lib/supabase"
import { navigateTo } from '../../main';
import { ta } from 'zod/locales';

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
              <td class="reports_table_header_cell">
                Nome do Paciente
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
            
          </table>

        </div>

      </div>
  
  `

  const { data: user_session } = await supabase.auth.getSession();

  if (!user_session) {
    return;
  }


  const user_id = user_session.session?.user.id

  const table = container.querySelector<HTMLTableElement>('#reports_table')

  if (!table) { return; }

  const { data: relatorios, error: pegarRelatoriosError } = await supabase.from("avaliacao").select("*").eq("usuario_id", user_id);

  if (pegarRelatoriosError) {
    console.log("Erro ao pegar dados de relatorios")
    console.log(pegarRelatoriosError)
    return;
  }

  for (let i = 0; i < relatorios.length; i++) {

    const { data: paciente, error } = await supabase.from("paciente").select("*").eq("id", relatorios.at(i).paciente_id);

    if (error) {
      return;
    }

    const linha = document.createElement('tr');
    linha.className = "reports_table_row"

    const nome_paciente = document.createElement('td');
    nome_paciente.textContent = paciente.at(0).nome;
    nome_paciente.className = "reports_table_cell"

    const data_nascimento = document.createElement('td');
    data_nascimento.textContent = paciente.at(0).data_nascimento;
    data_nascimento.className = "reports_table_cell"

    const sexo = document.createElement('td');
    sexo.textContent = paciente.at(0).sexo;
    sexo.className = "reports_table_cell"

    const avaliacao_data = document.createElement('td');
    avaliacao_data.textContent = relatorios.at(i).data_realizada;
    avaliacao_data.className = "reports_table_cell"

    const score_total = document.createElement('td');
    score_total.textContent = relatorios.at(i).score_final;
    score_total.className = "reports_table_cell"

    const botao_container = document.createElement('td');
    botao_container.className = "reports_table_cell"

    const botao_abrir_relatorio = document.createElement("button");
    botao_abrir_relatorio.textContent = "Abrir"
    botao_abrir_relatorio.className = "base_table_button"

    botao_abrir_relatorio.addEventListener('click', (MouseEvent) => {
      ir_relatorio_especifico(relatorios.at(i).id)
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

  navigateTo("/relatorio/" + relatorio_id)

}