import './relatorio.css'
import "../../components/base_button.css"
import "../../components/input_boxes.css"

import { supabase } from "../../lib/supabase"
import { navigate_to } from '../../main';

import { trigger_notification_popup } from '../../components/notification_popup';

import { calcular_score_final, retornar_sintomas_selecionados } from '../../lib/sintoma_pesos';
import { deletar_fotos_avaliacao } from '../../components/bucket_functions';

// Record se tem sintomas
const tem_sintomas: Record<string, boolean> = {
  'deficiencia_intelectual': false,
  'face_orelhas_alongadas': false,
  'macroorquidismo': false,
  'hipermobilidade_articular': false,
  'dificuldade_de_aprendizagem': false,
  'deficit_de_atencao': false,
  'movimentos_repetitivos': false,
  'atraso_na_fala': false,
  'hiperatividade': false,
  'evita_contato_visual': false,
  'evita_contato_fisico': false,
  'agressividade': false
};


// Record se tem os extras
const tem_relatorio_extras: Record<string, boolean> = {
  'tem_autismo': false,
  'tem_irmaos': false,
  'familiares_ataxia': false,
  'familiares_sintomas_mentais': false,
};

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

                
                <table class="basic_table"> 

                  <tr class="basic_row"> 
                  
                    <td class="basic_cell"> 
                      <p>Tem diagnostico de autismo:</p>
                    </td>

                    <td class="basic_cell"> 

                      <div class="basic_cell_button_container"> 
                        <p id="tem_autismo_texto" >Não</p>
                        <button id="edit_tem_autismo_button" class="yes_no_small_toggle_button">
                          Não
                        </button>
                      </div>

          
                    </td>

                  </tr>

                  <tr class="basic_row"> 
                  
                    <td class="basic_cell"> 
                      <p>Tem irmãos</p>
                    </td>

                    <td class="basic_cell"> 
                    
                      <div class="basic_cell_button_container"> 
                        <p id="tem_irmaos_texto" >Não</p>
                        <button id="edit_tem_irmaos_button" class="yes_no_small_toggle_button">
                          Não
                        </button>
                      </div>
          
                    </td>

                  </tr>

                  <tr class="basic_row"> 
                  
                    <td class="basic_cell"> 
                      <p>Familiares com ataxia:</p>
                    </td>

                    <td class="basic_cell"> 
                    
                      <div class="basic_cell_button_container"> 
                        <p id="tem_familia_ataxia_texto" >Não</p>
                        <button id="edit_familia_ataxia_button" class="yes_no_small_toggle_button">
                          Não
                        </button>
                      </div>
          
                    </td>

                  </tr>

                  <tr class="basic_row"> 
                  
                    <td class="basic_cell"> 
                      <p>Familiares com sintomas mentais:</p>
                    </td>

                    <td class="basic_cell"> 
                    
                      <div class="basic_cell_button_container">
                        <p id="tem_familia_sintomas_mentais_texto" >Não</p> 
                        <button id="edit_familia_sintomas_mentais_button" class="yes_no_small_toggle_button">
                          Não
                        </button>
                      </div>
          
                    </td>

                  </tr>
                
                </table>
                
              </div>
                
              <div class="report_conclusion"">
                
                <p id="observacoes_texto" >Observações :</p>
                <input type="text" class="base_small_input_text" placeholder="Observação" id="observation_edit_input"/>

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
                <td class="symptoms_table_cell">Deficiência intelectual</td>
                <td class="symptoms_table_cell">
                  <div class="basic_cell_button_container">
                    <p id="deficiencia_intelectual_texto">Não</p>
                    <button id="edit_deficiencia_intelectual_button" class="yes_no_small_toggle_button">
                      Não
                    </button>
                  </div>
                </td>
              </tr>

              <tr class="symptoms_table_row">
                <td class="symptoms_table_cell">Face alongada/orelhas</td>
                <td class="symptoms_table_cell">
                  <div class="basic_cell_button_container">
                    <p id="face_alongada_orelhas_texto">Não</p>
                    <button id="edit_face_alongada_orelhas_button" class="yes_no_small_toggle_button">
                      Não
                    </button>
                  </div>
                </td>
              </tr>

              <tr class="symptoms_table_row">
                <td class="symptoms_table_cell">Macroorquidismo</td>
                <td class="symptoms_table_cell">
                  <div class="basic_cell_button_container">
                    <p id="macroorquidismo_texto">Não</p>
                    <button id="edit_macroorquidismo_button" class="yes_no_small_toggle_button">
                      Não
                    </button>
                  </div>
                </td>
              </tr>

              <tr class="symptoms_table_row">
                <td class="symptoms_table_cell">Hipermobilidade articular</td>
                <td class="symptoms_table_cell">
                  <div class="basic_cell_button_container">
                    <p id="hipermobilidade_articular_texto">Não</p>
                    <button id="edit_hipermobilidade_articular_button" class="yes_no_small_toggle_button">
                      Não
                    </button>
                  </div>
                </td>
              </tr>

              <tr class="symptoms_table_row">
                <td class="symptoms_table_cell">Dificuldades de aprendizagem</td>
                <td class="symptoms_table_cell">
                  <div class="basic_cell_button_container">
                    <p id="dificuldades_aprendizagem_texto">Não</p>
                    <button id="edit_dificuldades_aprendizagem_button" class="yes_no_small_toggle_button">
                      Não
                    </button>
                  </div>
                </td>
              </tr>

              <tr class="symptoms_table_row">
                <td class="symptoms_table_cell">Déficit de atenção</td>
                <td class="symptoms_table_cell">
                  <div class="basic_cell_button_container">
                    <p id="deficit_atencao_texto">Não</p>
                    <button id="edit_deficit_atencao_button" class="yes_no_small_toggle_button">
                      Não
                    </button>
                  </div>
                </td>
              </tr>

              <tr class="symptoms_table_row">
                <td class="symptoms_table_cell">Movimentos repetitivos</td>
                <td class="symptoms_table_cell">
                  <div class="basic_cell_button_container">
                    <p id="movimentos_repetitivos_texto">Não</p>
                    <button id="edit_movimentos_repetitivos_button" class="yes_no_small_toggle_button">
                      Não
                    </button>
                  </div>
                </td>
              </tr>

              <tr class="symptoms_table_row">
                <td class="symptoms_table_cell">Atraso na fala</td>
                <td class="symptoms_table_cell">
                  <div class="basic_cell_button_container">
                    <p id="atraso_fala_texto">Não</p>
                    <button id="edit_atraso_fala_button" class="yes_no_small_toggle_button">
                      Não
                    </button>
                  </div>
                </td>
              </tr>

              <tr class="symptoms_table_row">
                <td class="symptoms_table_cell">Hiperatividade</td>
                <td class="symptoms_table_cell">
                  <div class="basic_cell_button_container">
                    <p id="hiperatividade_texto">Não</p>
                    <button id="edit_hiperatividade_button" class="yes_no_small_toggle_button">
                      Não
                    </button>
                  </div>
                </td>
              </tr>

              <tr class="symptoms_table_row">
                <td class="symptoms_table_cell">Evita contato visual</td>
                <td class="symptoms_table_cell">
                  <div class="basic_cell_button_container">
                    <p id="evita_contato_visual_texto">Não</p>
                    <button id="edit_evita_contato_visual_button" class="yes_no_small_toggle_button">
                      Não
                    </button>
                  </div>
                </td>
              </tr>

              <tr class="symptoms_table_row">
                <td class="symptoms_table_cell">Evita contato físico</td>
                <td class="symptoms_table_cell">
                  <div class="basic_cell_button_container">
                    <p id="evita_contato_fisico_texto">Não</p>
                    <button id="edit_evita_contato_fisico_button" class="yes_no_small_toggle_button">
                      Não
                    </button>
                  </div>
                </td>
              </tr>

              <tr class="symptoms_table_row">
                <td class="symptoms_table_cell">Agressividade</td>
                <td class="symptoms_table_cell">
                  <div class="basic_cell_button_container">
                    <p id="agressividade_texto">Não</p>
                    <button id="edit_agressividade_button" class="yes_no_small_toggle_button">
                      Não
                    </button>
                  </div>
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
  // Pega id do relatorio da url
  const relatorio_id = window.location.pathname.replace("/relatorio/", "")

  // Função do banco que pega todos os dados que precisam ser pegos para o relatorio
  const { data: relatorio_dados, error: funcerr } = await supabase.rpc("get_dados_relatorio_especifico", {
    avaliacao_id: relatorio_id
  })

  // Pega os item de avaliação para marcar os sintomas que o foram marcados no relatorio
  const { data: itemAvaliacaoDados, error: getItemAvaliacaoError } = await supabase
    .from("item_avaliacao")
    .select("sintoma_id")
    .eq("avaliacao_id", relatorio_id);

  if (getItemAvaliacaoError) {
    console.log("Erro ao pegar item relatorios");
  }

  if (funcerr) {
    console.log(funcerr)
  }

  const usuario_id = relatorio_dados[0].usuario_id;

  // Cria variaveis para cada dado
  const nome_paciente = relatorio_dados[0].paciente_nome;
  const data_nascimento = relatorio_dados[0].paciente_data_nascimento;
  const nascimento_formatada = new Date(data_nascimento).toLocaleDateString('pt-BR');
  const sexo = relatorio_dados[0].paciente_sexo;

  const nome_medico = relatorio_dados[0].usuario_nome;
  const data_avaliacao = relatorio_dados[0].data_avaliacao;
  const data_avaliacao_formatada = new Date(data_avaliacao).toLocaleString('pt-BR');
  const score_total = relatorio_dados[0].score_final;

  tem_relatorio_extras.tem_autismo = relatorio_dados[0].tem_autismo;
  tem_relatorio_extras.tem_irmaos = relatorio_dados[0].tem_irmaos;
  tem_relatorio_extras.familiares_ataxia = relatorio_dados[0].familia_ataxia;
  tem_relatorio_extras.familiares_sintomas_mentais = relatorio_dados[0].familia_sintomas_mentais;

  let indicacao = calcular_indicacao(sexo, score_total);

  const observacao = relatorio_dados[0].resultado_final;

  // Pega as partes do relatorio no HTML
  const nome_paciente_container = container.querySelector<HTMLTextAreaElement>('#nome_paciente_texto')
  const data_nascimento_container = container.querySelector<HTMLTextAreaElement>('#data_nascimento_texto')
  const sexo_container = container.querySelector<HTMLTextAreaElement>('#sexo_texto')
  const nome_medico_container = container.querySelector<HTMLTextAreaElement>('#nome_medico_texto')
  const data_avaliacao_container = container.querySelector<HTMLTextAreaElement>('#data_avaliacao_texto')

  const indicacao_container = container.querySelector<HTMLTextAreaElement>('#indicacao_texto')
  const observacao_container = container.querySelector<HTMLTextAreaElement>('#observacoes_texto')

  const tem_containers = get_tem_text(container);
  const tem_edit_buttons = get_tem_edit_buttons(container);

  const tem_extras_chave = Object.keys(tem_relatorio_extras);

  // Seta texto dos extras como sim ou nao
  for (let i = 0; i < tem_containers!.length; i++) {

    if (tem_relatorio_extras[tem_extras_chave.at(i)!] == true) {
      tem_containers.at(i)!.textContent = "Sim"
    }

  }

  // Seta botoes dos extras como sim ou nao 
  for (let i = 0; i < tem_edit_buttons.length; i++) {
    tem_edit_buttons.at(i)!.addEventListener('click', () => {
      toggle_tem(tem_extras_chave.at(i)!, tem_relatorio_extras, tem_edit_buttons.at(i)!, tem_containers.at(i)!);
    })
  }

  // Seta botoes de sintomas como sim ou nao
  for (let i = 0; i < tem_containers.length; i++) {

    if (tem_containers.at(i)?.textContent === "Sim") {
      table_to_button_set_active(tem_containers.at(i)!, tem_edit_buttons.at(i)!, true);
    }
  }

  // Esconde todos os botoes de edit e mostra todos os textos
  hide_all_show_others(tem_edit_buttons, tem_containers);

  // Seta os dados no HTML
  nome_paciente_container!.textContent = "Nome do paciente : " + nome_paciente;
  data_nascimento_container!.textContent = "Data nascimento : " + nascimento_formatada;
  sexo_container!.textContent = "Sexo : " + sexo;
  nome_medico_container!.textContent = "Nome Medico : " + nome_medico;
  data_avaliacao_container!.textContent = "Data avaliação : " + data_avaliacao_formatada;

  indicacao_container!.textContent = "Indicação : " + indicacao;
  observacao_container!.textContent = "Observação : " + observacao;

  const sintomas_containers = get_sintomas_text(container);
  const edit_sintomas_buttons = get_edit_sintomas_buttons(container);


  for (let i = 0; i < itemAvaliacaoDados!.length; i++) {

    sintomas_containers.at(itemAvaliacaoDados!.at(i)?.sintoma_id)!.textContent = "Sim"

  }

  const chavesSintomas = Object.keys(tem_sintomas);

  for (let i = 0; i < itemAvaliacaoDados!.length; i++) {
    const sintomaId = itemAvaliacaoDados![i].sintoma_id;

    tem_sintomas[chavesSintomas[sintomaId]] = true;
  }

  hide_all_show_others(edit_sintomas_buttons, sintomas_containers);

  for (let i = 0; i < sintomas_containers.length; i++) {

    if (sintomas_containers.at(i)?.textContent === "Sim") {
      table_to_button_set_active(sintomas_containers.at(i)!, edit_sintomas_buttons.at(i)!, true);
    }
  }

  const tem_sintomas_chaves = Object.keys(tem_sintomas)

  for (let i = 0; i < edit_sintomas_buttons.length; i++) {
    edit_sintomas_buttons.at(i)!.addEventListener('click', () => {
      toggle_tem(tem_sintomas_chaves.at(i)!, tem_sintomas, edit_sintomas_buttons.at(i)!, sintomas_containers.at(i)!);
    })
  }


  set_fotos_avaliacao(container, usuario_id, relatorio_id)


  // Botoes

  const imprimir = container.querySelector<HTMLButtonElement>('#imprimir_button');

  imprimir?.addEventListener('click', (_event) => {
    window.print();
  })

  const delete_button = container.querySelector<HTMLButtonElement>('#deletar_button')

  delete_button?.addEventListener('click', async () => {

    const confirmar = confirm(
      "Tem certeza que deseja deletar este relatório?"
    );

    if (!confirmar) return;

    deletar_fotos_avaliacao(usuario_id, relatorio_id)

    const { error } = await supabase
      .from("avaliacao")
      .delete()
      .eq("id", relatorio_id);

    if (error) {
      trigger_notification_popup("Erro ao deletar relatório");
      console.error(error);
      return;
    }

    console.log(relatorio_id)

    trigger_notification_popup("Relatório deletado com sucesso");

    navigate_to("/relatorios_admin");
  });

  const edit_button = container.querySelector<HTMLButtonElement>('#editar_button');

  let editando = false;

  const observation_edit = container.querySelector<HTMLInputElement>('#observation_edit_input');

  observation_edit!.value = observacao;

  observation_edit!.style.display = "none";

  // Esconde os textos e mostra os inputs e vice e versa
  function toggle_editar(ativo: boolean) {

    if (ativo == true) {

      hide_one_display_other(observacao_container!, observation_edit!)
      hide_all_show_others(tem_containers, tem_edit_buttons);
      hide_all_show_others(sintomas_containers, edit_sintomas_buttons);

    }
    else {

      hide_one_display_other(observation_edit!, observacao_container!)
      hide_all_show_others(edit_sintomas_buttons, sintomas_containers);
      hide_all_show_others(tem_edit_buttons, tem_containers);
    }

  }

  edit_button?.addEventListener('click', async (_event) => {

    if (editando == false) {
      toggle_editar(true);
      editando = true;
      edit_button.textContent = "Salvar";
      delete_button!.style.display = "none";
    }
    else {
      toggle_editar(false);
      editando = false;
      edit_button.textContent = "Editar";
      delete_button!.style.display = "flex";

      let is_male = false;

      if (sexo === "masculino") {
        is_male = true;
      }
      else {
        is_male = false
      }

      observacao_container!.textContent = observation_edit!.value;

      let novo_score = calcular_score_final(tem_sintomas, is_male);

      // TODO: Colocar essa porra toda em uma transação

      const { data, error: erro_update_relatorio } = await supabase.from("avaliacao").update({
        diagnostico_autismo: tem_relatorio_extras.tem_autismo,
        tem_irmaos: tem_relatorio_extras.tem_irmaos,
        familia_sintomas_mentais: tem_relatorio_extras.familiares_sintomas_mentais,
        familia_ataxia: tem_relatorio_extras.familiares_ataxia,

        resultado_final: observation_edit?.value,

        score_final: novo_score
      }).eq('id', relatorio_id).single()

      if (erro_update_relatorio) {
        console.log("Erro update usuario = " + erro_update_relatorio);
        trigger_notification_popup("Erro ao atualizar usuario");
        return;
      }

      const { error: delete_sintomas_antigos_erro } = await supabase
        .from('item_avaliacao')
        .delete()
        .eq('avaliacao_id', relatorio_id)

      if (delete_sintomas_antigos_erro) {
        console.error('Error limpando sintomas antigos:', delete_sintomas_antigos_erro)
      }

      const chaves = Object.keys(tem_sintomas);

      for (let i = 0; i < chaves.length; i++) {

        if (tem_sintomas[chaves.at(i)!] == true) {

          const { error: erro_insert_item } = await supabase
            .from("item_avaliacao")
            .insert({
              avaliacao_id: relatorio_id,
              sintoma_id: i
            })

          if (erro_insert_item) {
            console.log(erro_insert_item);
          }

        }

      }

      indicacao = calcular_indicacao(sexo, novo_score);
      indicacao_container!.textContent = "Indicação : " + indicacao;

      trigger_notification_popup("Relatorio editado com sucesso");
    }

  })

}

// Muda os botoes de sim e nao
function toggle_tem(chave_tem: string, tem_record: Record<string, boolean>, botao: HTMLElement | null, text: HTMLTextAreaElement): void {
  if (!botao) return;

  const isSelected = botao.classList.toggle('is_active');

  if (chave_tem in tem_record) {

    if (isSelected == true) {
      tem_record[chave_tem] = true;
      botao.textContent = "Sim"
      text.textContent = "Sim"
    }
    else {
      tem_record[chave_tem] = false;
      botao.textContent = "Não"
      text.textContent = "Não"
    }

  }
}

function calcular_indicacao(sexo: string, score_total: number) {

  if (sexo == "masculino" && score_total > 0.56) {
    return "Fazer teste genetico";
  }
  else if (sexo == "feminino" && score_total > 0.55) {
    return "Fazer teste genetico";
  }
  else {
    return "Nenhuma";
  }
}

function hide_one_display_other(one: HTMLElement, other: HTMLElement) {

  one!.style.display = "none"
  other!.style.display = "flex"

}

function hide_all_show_others<A extends HTMLElement, B extends HTMLElement>(all: (A | null)[], others: (B | null)[]) {

  all.forEach(element => {
    element?.style.setProperty("display", "none");
  })

  others.forEach(element => {
    element?.style.setProperty("display", "flex");
  })

}

// TODO: Faz praticamente a mesma coisa que a outra função la em cima
function table_to_button_set_active(text: HTMLTextAreaElement, button: HTMLButtonElement, bool: boolean) {

  if (bool == true) {
    text.textContent = "Sim"
    button?.classList.add("is_active")
    button!.textContent = "Sim";
    return true;
  }
  else {
    text.textContent = "Não"
    button?.classList.remove("is_active")
    button!.textContent = "Não";
    return false;
  }
}

// TODO: Refatorar também
function set_fotos_avaliacao(container: HTMLDivElement, medico_id: string, relatorio_id: string) {


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

  // Pega HTML das imagens das fotos

  const front_image = container.querySelector<HTMLImageElement>('#face_front_image');
  const three_four_image = container.querySelector<HTMLImageElement>('#face_three_four_image');
  const profile_image = container.querySelector<HTMLImageElement>('#face_profile_image');

  // Seta as fotos

  if (front_image) {
    front_image.src = front_photo.publicUrl;
  }

  if (three_four_image) {
    three_four_image.src = three_four_photo.publicUrl;
  }

  if (profile_image) {
    profile_image.src = profile_photo.publicUrl;
  }

}


function get_tem_text(container: HTMLDivElement) {
  return [
    container.querySelector<HTMLTextAreaElement>('#tem_autismo_texto'),
    container.querySelector<HTMLTextAreaElement>('#tem_irmaos_texto'),
    container.querySelector<HTMLTextAreaElement>('#tem_familia_sintomas_mentais_texto'),
    container.querySelector<HTMLTextAreaElement>('#tem_familia_ataxia_texto')
  ];
}

function get_tem_edit_buttons(container: HTMLDivElement) {
  return [
    container.querySelector<HTMLButtonElement>('#edit_tem_autismo_button'),
    container.querySelector<HTMLButtonElement>('#edit_tem_irmaos_button'),
    container.querySelector<HTMLButtonElement>('#edit_familia_sintomas_mentais_button'),
    container.querySelector<HTMLButtonElement>('#edit_familia_ataxia_button')
  ];
}

function get_sintomas_text(container: HTMLDivElement) {
  return [
    container.querySelector<HTMLTextAreaElement>('#deficiencia_intelectual_texto'),
    container.querySelector<HTMLTextAreaElement>('#face_alongada_orelhas_texto'),
    container.querySelector<HTMLTextAreaElement>('#macroorquidismo_texto'),
    container.querySelector<HTMLTextAreaElement>('#hipermobilidade_articular_texto'),
    container.querySelector<HTMLTextAreaElement>('#dificuldades_aprendizagem_texto'),
    container.querySelector<HTMLTextAreaElement>('#deficit_atencao_texto'),
    container.querySelector<HTMLTextAreaElement>('#movimentos_repetitivos_texto'),
    container.querySelector<HTMLTextAreaElement>('#atraso_fala_texto'),
    container.querySelector<HTMLTextAreaElement>('#hiperatividade_texto'),
    container.querySelector<HTMLTextAreaElement>('#evita_contato_visual_texto'),
    container.querySelector<HTMLTextAreaElement>('#evita_contato_fisico_texto'),
    container.querySelector<HTMLTextAreaElement>('#agressividade_texto')
  ];
}

function get_edit_sintomas_buttons(container: HTMLDivElement) {
  return [
    container.querySelector<HTMLButtonElement>('#edit_deficiencia_intelectual_button'),
    container.querySelector<HTMLButtonElement>('#edit_face_alongada_orelhas_button'),
    container.querySelector<HTMLButtonElement>('#edit_macroorquidismo_button'),
    container.querySelector<HTMLButtonElement>('#edit_hipermobilidade_articular_button'),
    container.querySelector<HTMLButtonElement>('#edit_dificuldades_aprendizagem_button'),
    container.querySelector<HTMLButtonElement>('#edit_deficit_atencao_button'),
    container.querySelector<HTMLButtonElement>('#edit_movimentos_repetitivos_button'),
    container.querySelector<HTMLButtonElement>('#edit_atraso_fala_button'),
    container.querySelector<HTMLButtonElement>('#edit_hiperatividade_button'),
    container.querySelector<HTMLButtonElement>('#edit_evita_contato_visual_button'),
    container.querySelector<HTMLButtonElement>('#edit_evita_contato_fisico_button'),
    container.querySelector<HTMLButtonElement>('#edit_agressividade_button')
  ];
}

