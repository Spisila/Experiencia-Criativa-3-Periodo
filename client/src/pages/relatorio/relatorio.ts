import './relatorio.css'
import "../../components/base_button.css"
import "../../components/input_boxes.css"

import { supabase } from "../../lib/supabase"
import { navigateTo } from '../../main';


export async function init_relatorio_page() {

  const container = document.querySelector<HTMLDivElement>('#app');

  if (container === null) {
    return;
  }

  container.innerHTML = /* html */`
      
    <div class="report_container">

        <div class="report_info_container">

          <div class="patient_info">
            
            <p id="nome_paciente_texto" >Nome Paciente : Paciente Teste</p>
            <p id="data_nascimento_texto" >Data Nascimento : dd/mm/YYYY</p>
            <p id="sexo_texto" >Sexo : Masculino/Feminino </p>

          </div>

          <div class="doctor_info">

            <p id="nome_medico_texto" >Nome medico : Medico Teste </p>
            <p id="data_avaliacao_texto" >Data avaliação : dd/mm/YYYY </p>
            <p id="indicacao_texto" >Indicação : Fazer teste genetico </p>

          </div>


        </div>

        <div class="report_data_container">

          <div class="report_conclusion_container">

            <div class="report_conclusion"">
              
              <p id="observacoes_texto" >Observações :</p>

            </div>

          </div>

          <div class="report_identified_symptoms_container">

            <table class="report_symptoms_table">
              
              <tr class="symptoms_table_header">
                <td class="symptoms_table_header_cell">
                  Sintoma
                </td>
                <td class="symptoms_table_header_cell">
                  Presente
                </td>
              </tr>

              <tr class="symptoms_table_row">
                <td class="symptoms_table_cell">
                  Deficiência Intelectual
                </td>
                <td id="deficiencia_intelectual_texto" class="symptoms_table_cell">
                  Nao
                </td>
              </tr>

              <tr class="symptoms_table_row">
                <td class="symptoms_table_cell">
                  Face alongada/orelhas
                </td>
                <td id="face_alongada_orelhas_texto" class="symptoms_table_cell">
                  Nao
                </td>
              </tr>

              <tr class="symptoms_table_row">
                <td class="symptoms_table_cell">
                  Macroorquidismo
                </td>
                <td id="macroorquidismo_texto" class="symptoms_table_cell">
                  Nao
                </td>
              </tr>

              <tr class="symptoms_table_row">
                <td class="symptoms_table_cell">
                  Hipermobilidade articular
                </td>
                <td id="hipermobilidade_articular_texto" class="symptoms_table_cell">
                  Nao
                </td>
              </tr>

              <tr class="symptoms_table_row">
                <td class="symptoms_table_cell">
                  Dificuldades de aprendizagem
                </td> 
                <td id="dificuldades_aprendizagem_texto" class="symptoms_table_cell">
                  Nao
                </td>
              </tr>

              <tr class="symptoms_table_row">
                <td class="symptoms_table_cell">
                  Déficit de atenção
                </td>
                <td id="deficit_atencao_texto" class="symptoms_table_cell">
                  Nao
                </td>
              </tr>

              <tr class="symptoms_table_row">
                <td class="symptoms_table_cell">
                  Movimentos repetitivos
                </td>
                <td id="movimentos_repetitivos_texto" class="symptoms_table_cell">
                  Nao
                </td>
              </tr>

              <tr class="symptoms_table_row">
                <td class="symptoms_table_cell">
                  Atraso na fala
                </td>
                <td id="atraso_fala_texto" class="symptoms_table_cell">
                  Nao
                </td>
              </tr>

              <tr class="symptoms_table_row">
                <td class="symptoms_table_cell">
                  Hiperatividade 
                </td>
                <td id="hiperatividade_texto" class="symptoms_table_cell">
                  Nao
                </td>
              </tr>

              <tr class="symptoms_table_row">
                <td class="symptoms_table_cell">
                  Evita contato visual 
                </td>
                <td id="evita_contato_visual_texto" class="symptoms_table_cell">
                  Nao
                </td>
              </tr>

              <tr class="symptoms_table_row">
                <td class="symptoms_table_cell">
                  Evita contato físico 
                </td>
                <td id="evita_contato_fisico_texto" class="symptoms_table_cell">
                  Nao
                </td>
              </tr>

              <tr class="symptoms_table_row">
                <td class="symptoms_table_cell">
                  Agressividade 
                </td>
                <td id="agressividade_texto" class="symptoms_table_cell">
                  Nao
                </td>
              </tr>

            </table>

          </div>

        </div>

        <button id="imprimir_button" class="base_button" style="margin-top: 15px;">

          Imprimir

        </button>

      </div>
  
  `

  const relatorio_id = window.location.pathname.replace("/relatorio/", "")

  const { data: relatorioDados, error: getRelatorioError } = await supabase.from("avaliacao").select("*").eq("id", relatorio_id);

  console.log(typeof relatorioDados)

  if (getRelatorioError) {
    console.log("Erro ao pegar relatorio");
    console.log(relatorioDados);
  }

  if (!relatorioDados) {
    console.log("Fala ao pegar dados do relatorio");
  }

  const medico_id = relatorioDados?.at(0).usuario_id;
  const paciente_id = relatorioDados?.at(0).paciente_id;

  const { data: medicoDados, error: getMedicoError } = await supabase.from("usuario").select("*").eq("id", medico_id);
  const { data: pacienteDados, error: getPacienteError } = await supabase.from("paciente").select("*").eq("id", paciente_id);

  if (getMedicoError || getPacienteError) {
    console.log("Erro ao pegar medico ou paciente em relatorio");
  }

  const nome_paciente = pacienteDados?.at(0).nome;
  const data_nascimento = pacienteDados?.at(0).data_nascimento;

  const nascimento_formatada = new Date(data_nascimento).toLocaleDateString('pt-BR');

  const sexo = pacienteDados?.at(0).sexo;

  const nome_medico = medicoDados?.at(0).nome;

  const data_avaliacao = relatorioDados?.at(0).data_realizada;

  const data_avaliacao_formatada = new Date(data_avaliacao).toLocaleString('pt-BR');

  const score_total = relatorioDados?.at(0).score_final;

  let indicacao = "Nenhuma"

  if (sexo == "masculino" && score_total > 0.56) {
    indicacao = "Fazer teste genetico";
  }
  else if (sexo == "feminino" && score_total > 0.55) {
    indicacao = "Fazer teste genetico";
  }
  else {
    indicacao == "Nenhuma";
  }

  const observacao = relatorioDados?.at(0).resultado_final;

  const nome_paciente_container = container.querySelector<HTMLTextAreaElement>('#nome_paciente_texto')
  const data_nascimento_container = container.querySelector<HTMLTextAreaElement>('#data_nascimento_texto')
  const sexo_container = container.querySelector<HTMLTextAreaElement>('#sexo_texto')

  const nome_medico_container = container.querySelector<HTMLTextAreaElement>('#nome_medico_texto')
  const data_avaliacao_container = container.querySelector<HTMLTextAreaElement>('#data_avaliacao_texto')
  const indicacao_container = container.querySelector<HTMLTextAreaElement>('#indicacao_texto')

  const observacao_container = container.querySelector<HTMLTextAreaElement>('#observacoes_texto')

  if (
    !nome_paciente_container ||
    !data_nascimento_container ||
    !sexo_container ||
    !nome_medico_container ||
    !data_avaliacao_container ||
    !indicacao_container ||
    !observacao_container) { return; }

  nome_paciente_container.textContent = "Nome do paciente : " + nome_paciente;
  data_nascimento_container.textContent = "Data nascimento : " + nascimento_formatada;
  sexo_container.textContent = "Sexo : " + sexo;

  nome_medico_container.textContent = "Nome Medico : " + nome_medico;
  data_avaliacao_container.textContent = "Data avaliação : " + data_avaliacao_formatada;
  indicacao_container.textContent = "Indicação : " + indicacao;

  observacao_container.textContent = "Observação : " + observacao;

  const { data: itemAvaliacaoDados, error: getItemAvaliacaoError } = await supabase.from("item_avaliacao").select("sintoma_id").eq("avaliacao_id", relatorio_id);

  if (getItemAvaliacaoError) {
    console.log("Erro ao pegar item relatorios");
  }

  if (!itemAvaliacaoDados) {
    console.log("Fala ao pegar dados do relatorio");
    return;
  }

  const deficiencia_intelectual_container = container.querySelector<HTMLTextAreaElement>('#deficiencia_intelectual_texto')
  const face_alongada_orelhas_container = container.querySelector<HTMLTextAreaElement>('#face_alongada_orelhas_texto')
  const macroorquidismo_container = container.querySelector<HTMLTextAreaElement>('#macroorquidismo_texto')
  const hipermobilidade_articular_container = container.querySelector<HTMLTextAreaElement>('#hipermobilidade_articular_texto')
  const dificuldades_aprendizagem_container = container.querySelector<HTMLTextAreaElement>('#dificuldades_aprendizagem_texto')
  const deficit_atencao_container = container.querySelector<HTMLTextAreaElement>('#deficit_atencao_texto')
  const movimentos_repetitivos_container = container.querySelector<HTMLTextAreaElement>('#movimentos_repetitivos_texto')
  const atraso_fala_container = container.querySelector<HTMLTextAreaElement>('#atraso_fala_texto')
  const hiperatividade_container = container.querySelector<HTMLTextAreaElement>('#hiperatividade_texto')
  const evita_contato_visual_container = container.querySelector<HTMLTextAreaElement>('#evita_contato_visual_texto')
  const evita_contato_fisico_container = container.querySelector<HTMLTextAreaElement>('#evita_contato_fisico_texto')
  const agressividade_container = container.querySelector<HTMLTextAreaElement>('#agressividade_texto')

  if (

    !deficiencia_intelectual_container ||
    !face_alongada_orelhas_container ||
    !macroorquidismo_container ||
    !hipermobilidade_articular_container ||
    !dificuldades_aprendizagem_container ||
    !deficit_atencao_container ||
    !movimentos_repetitivos_container ||
    !atraso_fala_container ||
    !hiperatividade_container ||
    !evita_contato_visual_container ||
    !evita_contato_fisico_container ||
    !agressividade_container
  ) {
    return
  }

  const containers = [
    deficiencia_intelectual_container,
    face_alongada_orelhas_container,
    macroorquidismo_container,
    hipermobilidade_articular_container,
    dificuldades_aprendizagem_container,
    deficiencia_intelectual_container,
    movimentos_repetitivos_container,
    atraso_fala_container,
    hiperatividade_container,
    evita_contato_visual_container,
    evita_contato_fisico_container,
    agressividade_container
  ]

  for (let i = 0; i < itemAvaliacaoDados.length; i++) {

    containers.at(itemAvaliacaoDados.at(i)?.sintoma_id)!.textContent = "Sim"

  }

  const imprimir = container.querySelector<HTMLButtonElement>('#imprimir_button');

  imprimir?.addEventListener('click', (MouseEvent) => {
    window.print();
  })

}
