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
      
    <div class="report_and_images_container"> 
    
      <div class="images_container">

        Rosto frente
        <div class="photo_report_container" id="face_front_container">
          <img src="" id="face_front_image" style=" width: auto; max-height: 100%; object-fit: cover;" />
        </div>

        Rosto 3/4
        <div class="photo_report_container" id="face_three_four_container">
          <img src="" id="face_three_four_image" style=" width: auto; max-height: 100%; object-fit: cover;" />
        </div>

        Rosto Perfil
        <div class="photo_report_container" id="face_profile_container">
          <img src="" id="face_profile_image" style=" width: auto; max-height: 100%; object-fit: cover;" />
        </div>
      </div>
    
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

              <div class="extra_report_info"> 

                <p id="tem_irmaos_texto" >Paciente tem irmãos :</p>
                <p id="tem_autismo_texto" >Paciente tem diagnostico de autismo :</p>
                <p id="tem_familia_sintomas_mentais_texto" >Paciente tem familiares com sintomas mentais :</p>
                <p id="tem_familia_ataxia_texto" >Familiares com ataxia :</p>

              </div>

              <div class="report_conclusion"">
                
                <p id="observacoes_texto" >Observações :</p>

              </div>

            </div>

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

          <div class="report_buttons_container">
          
            <button id="editar_button" class="base_small_button" style="margin-top: 15px;">
              Editar
            </button>
          
            <button id="imprimir_button" class="base_small_button" style="margin-top: 15px;">
              Imprimir
            </button>

            <button id="deletar_button" class="base_small_button" style="margin-top: 15px;">
              Deletar
            </button>

            </div>


        </div>
    
        </div>

  
  `

  const relatorio_id = window.location.pathname.replace("/relatorio/", "")

  const { data: relatorioDados, error: getRelatorioError } = await supabase.from("avaliacao").select("*").eq("id", relatorio_id);

  if (getRelatorioError) {
    console.log("Erro ao pegar relatorio");
    console.log(relatorioDados);
  }

  if (!relatorioDados) {
    console.log("Fala ao pegar dados do relatorio");
  }

  console.log(relatorioDados)

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

  let tem_irmaos = false;

  if (relatorioDados?.at(0).tem_irmaos == true) {
    tem_irmaos = true;
  }

  let tem_autismo = false;

  if (relatorioDados?.at(0).tem_autismo == true) {
    tem_autismo = true;
  }

  let familia_sintomas_mentais = false;

  if (relatorioDados?.at(0).familia_sintomas_mentais == true) {
    familia_sintomas_mentais = true;
  }

  let familia_ataxia = false;

  if (relatorioDados?.at(0).familia_ataxia == true) {
    familia_ataxia = true;
  }

  let indicacao = "Nenhuma"

  if (sexo == "masculino" && score_total > 0.56) {
    indicacao = "Fazer teste genetico";
  }
  else if (sexo == "feminino" && score_total > 0.55) {
    indicacao = "Fazer teste genetico";
  }
  else {
    indicacao = "Nenhuma";
  }

  const observacao = relatorioDados?.at(0).resultado_final;

  const nome_paciente_container = container.querySelector<HTMLTextAreaElement>('#nome_paciente_texto')
  const data_nascimento_container = container.querySelector<HTMLTextAreaElement>('#data_nascimento_texto')
  const sexo_container = container.querySelector<HTMLTextAreaElement>('#sexo_texto')

  const nome_medico_container = container.querySelector<HTMLTextAreaElement>('#nome_medico_texto')
  const data_avaliacao_container = container.querySelector<HTMLTextAreaElement>('#data_avaliacao_texto')
  const indicacao_container = container.querySelector<HTMLTextAreaElement>('#indicacao_texto')

  const observacao_container = container.querySelector<HTMLTextAreaElement>('#observacoes_texto')

  const tem_irmaos_container = container.querySelector<HTMLTextAreaElement>('#tem_irmaos_texto')
  const tem_autismo_container = container.querySelector<HTMLTextAreaElement>('#tem_autismo_texto')
  const tem_familia_sintomas_mentais_container = container.querySelector<HTMLTextAreaElement>('#tem_familia_sintomas_mentais_texto')
  const tem_familia_ataxia_container = container.querySelector<HTMLTextAreaElement>('#tem_familia_ataxia_texto')

  if (
    !nome_paciente_container ||
    !data_nascimento_container ||
    !sexo_container ||
    !nome_medico_container ||
    !data_avaliacao_container ||
    !indicacao_container ||
    !observacao_container ||
    !tem_irmaos_container ||
    !tem_autismo_container ||
    !tem_familia_sintomas_mentais_container ||
    !tem_familia_ataxia_container) { return; }

  nome_paciente_container.textContent = "Nome do paciente : " + nome_paciente;
  data_nascimento_container.textContent = "Data nascimento : " + nascimento_formatada;
  sexo_container.textContent = "Sexo : " + sexo;

  nome_medico_container.textContent = "Nome Medico : " + nome_medico;
  data_avaliacao_container.textContent = "Data avaliação : " + data_avaliacao_formatada;
  indicacao_container.textContent = "Indicação : " + indicacao;

  observacao_container.textContent = "Observação : " + observacao;

  tem_irmaos_container.textContent = "Paciente tem irmãos : " + (tem_irmaos ? "Sim" : "Não");
  tem_autismo_container.textContent = "Paciente tem diagnostico de autismo : " + (tem_autismo ? "Sim" : "Não");
  tem_familia_sintomas_mentais_container.textContent = "Paciente tem familiares com sintomas mentais : " + (familia_sintomas_mentais ? "Sim" : "Não");
  tem_familia_ataxia_container.textContent = "Familiares com ataxia : " + (familia_ataxia ? "Sim" : "Não");

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
    deficit_atencao_container,
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

  const front_view_url = `${medico_id}/${relatorio_id}/front_view`;
  const three_four_view_url = `${medico_id}/${relatorio_id}/three_four_view`;
  const profile_view_url = `${medico_id}/${relatorio_id}/profile_view`;

  const { data: front_photo } = supabase.storage
    .from('fotos_pacientes')
    .getPublicUrl(front_view_url);

  const { data: three_four_photo } = supabase.storage
    .from('fotos_pacientes')
    .getPublicUrl(three_four_view_url);

  const { data: profile_photo } = supabase.storage
    .from('fotos_pacientes')
    .getPublicUrl(profile_view_url);

  const front_image = container.querySelector<HTMLImageElement>('#face_front_image');
  const three_four_image = container.querySelector<HTMLImageElement>('#face_three_four_image');
  const profile_image = container.querySelector<HTMLImageElement>('#face_profile_image');

  if (front_image) {
    front_image.src = front_photo.publicUrl;
  }

  if (three_four_image) {
    three_four_image.src = three_four_photo.publicUrl;
  }

  if (profile_image) {
    profile_image.src = profile_photo.publicUrl;
  }


  const imprimir = container.querySelector<HTMLButtonElement>('#imprimir_button');

  imprimir?.addEventListener('click', (MouseEvent) => {
    window.print();
  })

  const deletar = container.querySelector<HTMLButtonElement>('#deletar_button')

  deletar?.addEventListener('click', async () => {

    const confirmar = confirm(
      "Tem certeza que deseja deletar este relatório?"
    );

    if (!confirmar) return;

    const { error } = await supabase
      .from("avaliacao")
      .delete()
      .eq("id", relatorio_id);

    if (error) {
      alert("Erro ao deletar relatório");
      console.error(error);
      return;
    }

    console.log(relatorio_id)

    alert("Relatório deletado com sucesso");

    navigateTo("/relatorios_usuario");
  });

}
