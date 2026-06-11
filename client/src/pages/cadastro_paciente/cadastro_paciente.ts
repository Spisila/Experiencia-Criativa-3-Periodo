import './cadastro_paciente.css'
import "../../components/base_button.css"
import "../../components/input_boxes.css"

import { supabase } from "../../lib/supabase"
import { sintomas_atuais_masculinas, sintomas_atuais_feminino } from '../../lib/sintoma_pesos'
import { hide_notification, show_notification, trigger_notification_popup } from '../../components/notification_popup'

import { get_user_id, get_user_session } from '../../components/auth_functions';

import { cadastro_paciente_schema } from '../../schemas/cadastro_pacientes_schema';

import { switch_pair_button } from '../../components/switch_pair_button';


import { v4 as uuidv4 } from 'uuid';
import { navigate_to } from '../../main'

// Associação entre o sintoma e se ele esta presente
const temSintomas: Record<string, boolean> = {
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

export async function init_cadastro_paciente_page() {

  const container = document.querySelector<HTMLDivElement>('#app');

  if (container === null) {
    return;
  }

  container.innerHTML = /* html */`
      
    <div class="patient_sign_up_card">

        <div class="patient_data_input_container">
          
          <div class="patient_input_container">
        
            <input class="base_small_input_text" placeholder="Nome do Paciente" id="name">
            <input class="base_small_input_text" placeholder="CPF do paciente" id="cpf" maxlength="11">
            <input class="base_small_input_text" placeholder="Data nascimento do paciente" type="date" id="birth_date">
            <input class="base_small_input_text" placeholder="Nome da mãe" id="mother_name">
            <input class="base_small_input_text" placeholder="Responsavel pelo paciente" id="responsible_name">
            <input class="base_small_input_text" placeholder="CPF do responsavel" id="cpf_responsible" maxlength="11">
            <input class="base_small_input_text" placeholder="Telefone" id="phone_number" maxlength="10">
            <input class="base_small_input_text" placeholder="Pais" id="country">
            <input class="base_small_input_text" placeholder="Estado" id="state">
            <input class="base_small_input_text" placeholder="Cidade" id="city">
            <input class="base_small_input_text" placeholder="Observação" id="observation">

          </div>
          
          <div class="patient_sex_container">
        
            <button class="toggle_small_base_button" id="toggle_male" >
              Masculino 
            </button> 
          
            <button class="toggle_small_base_button" id="toggle_female">
              Feminino
            </button>
          
          </div>
        
          <button class="base_button" id="cadastrar">
            Cadastrar
          </button>
        
        </div>

        <div class="patient_extra_data_input_container"> 

          <div class="yes_no_questions_container"> 
          
            <div class="yes_no_container"> 
            
              <p class="yes_no_text">Possui diagnostico de autismo?</p>

              <div class="yes_no_button_container">
            
                <button class="toggle_small_base_button" id="autism_diagnosis_yes" >
                  Sim
                </button> 
              
                <button class="toggle_small_base_button" id="autism_diagnosis_no">
                  Não
                </button>
              
              </div>
            
            </div>


            <div class="yes_no_container"> 
            
              <p class="yes_no_container">Tem irmãos?</p>

              <div class="yes_no_button_container">
            
                <button class="toggle_small_base_button" id="has_siblings_yes" >
                  Sim
                </button> 
              
                <button class="toggle_small_base_button" id="has_siblings_no">
                  Não
                </button>
              
              </div>
            
            </div>

            <div class="yes_no_container"> 
            
              <p class="yes_no_container">Familiares com sintomas mentais?</p>

              <div class="yes_no_button_container">
            
                <button class="toggle_small_base_button" id="family_with_mental_symptoms_yes" >
                  Sim
                </button> 
              
                <button class="toggle_small_base_button" id="family_with_mental_symptoms_no">
                  Não
                </button>
              
              </div>
            
            </div>

            <div class="yes_no_container"> 
            
              <p class="yes_no_container">Familiares com ataxia?</p>

              <div class="yes_no_button_container">
            
                <button class="toggle_small_base_button" id="family_with_ataxia_yes" >
                  Sim
                </button> 
              
                <button class="toggle_small_base_button" id="family_with_ataxia_no">
                  Não
                </button>
              
              </div>
            
            </div>

          </div>

          <div class="photo_upload_container"> 
          
            <div class="photo_container" id="face_front_container">
              Rosto frente
              <input type="file" id="face_front_input" accept="image/*" style="display: none;" />
            </div>

            <div class="photo_container" id="face_three_four_container">
              Rosto 3/4
              <input type="file" id="face_three_four_input" accept="image/*" style="display: none;" />
            </div>

            <div class="photo_container" id="face_profile_container">
              Rosto Perfil
              <input type="file" id="face_profile_input" accept="image/*" style="display: none;" />
            </div>

          </div>
          

        </div>

        <div class="symptoms_checklist_container">
          <button class="toggle_base_button" id="symptom_button_deficiência_intelectual" aria-pressed="false">
            Deficiência Intelectual
          </button>
          <button class="toggle_base_button" id="symptom_button_face_orelhas_alongadas" aria-pressed="false">
            Face/orelhas alongadas
          </button>
          <button class="toggle_base_button" id="symptom_button_macroorquidismo" aria-pressed="false">
            Macroorquidismo
          </button>
          <button class="toggle_base_button" id="symptom_button_hipermobilidade_articular" aria-pressed="false">
            Hipermobilidade articular
          </button>
          <button class="toggle_base_button" id="symptom_button_dificuldade_de_aprendizagem" aria-pressed="false">
            Dificuldade de aprendizagem
          </button>
          <button class="toggle_base_button" id="symptom_button_deficit_de_atenção" aria-pressed="false">
            Déficit de atenção
          </button>
          <button class="toggle_base_button" id="symptom_button_movimentos_repetitivos" aria-pressed="false">
            Movimentos repetitivos
          </button>
          <button class="toggle_base_button" id="symptom_button_atraso_na_fala" aria-pressed="false">
            Atraso na fala
          </button>
          <button class="toggle_base_button" id="symptom_button_hiperatividade" aria-pressed="false">
            Hiperatividade
          </button>
          <button class="toggle_base_button" id="symptom_button_evita_contato_visual" aria-pressed="false">
            Evita contato visual
          </button>
          <button class="toggle_base_button" id="symptom_button_evita_contato_fisico" aria-pressed="false">
            Evita contato fisico
          </button>
          <button class="toggle_base_button" id="symptom_button_agressividade" aria-pressed="false">
            Agressividade
          </button> 
          
        </div>

      </div>
  

  `

  // Pegando inputs de escrever

  const name_input = container.querySelector<HTMLInputElement>('#name');
  const cpf_input = container.querySelector<HTMLInputElement>('#cpf');
  const birth_day_input = container.querySelector<HTMLInputElement>('#birth_date');

  const mother_name_input = container.querySelector<HTMLInputElement>('#mother_name');
  const responsible_name_input = container.querySelector<HTMLInputElement>('#responsible_name');
  const cpf_responsible_input = container.querySelector<HTMLInputElement>('#cpf_responsible');
  const phone_number_input = container.querySelector<HTMLInputElement>('#phone_number');

  const country_input = container.querySelector<HTMLInputElement>('#country');
  const state_input = container.querySelector<HTMLInputElement>('#state');
  const city_input = container.querySelector<HTMLInputElement>('#city');

  const observation_input = container.querySelector<HTMLInputElement>('#observation');

  // TODO: Função que pega esses botoes
  // Pegando inputs de botão sim ou nao

  const toggleMaleButton = container.querySelector<HTMLButtonElement>('#toggle_male');
  const toggleFemaleButton = container.querySelector<HTMLButtonElement>('#toggle_female');

  const autismDiagnosisYesButton = container.querySelector<HTMLButtonElement>('#autism_diagnosis_yes');
  const autismDiagnosisNoButton = container.querySelector<HTMLButtonElement>('#autism_diagnosis_no');

  const hasSiblingsYesButton = container.querySelector<HTMLButtonElement>('#has_siblings_yes');
  const hasSiblingsNoButton = container.querySelector<HTMLButtonElement>('#has_siblings_no');

  const familyWithMentalSymptomsYesButton = container.querySelector<HTMLButtonElement>('#family_with_mental_symptoms_yes');
  const familyWithMentalSymptomsNoButton = container.querySelector<HTMLButtonElement>('#family_with_mental_symptoms_no');

  const familyWithAtaxiaYesButton = container.querySelector<HTMLButtonElement>('#family_with_ataxia_yes');
  const familyWithAtaxiaNoButton = container.querySelector<HTMLButtonElement>('#family_with_ataxia_no');

  // TODO: função que inicia as variaveis
  // Setando variaveis de sim e não e setando todos os botoes como não

  let has_autism_diagnosis = switch_pair_button(autismDiagnosisNoButton!, autismDiagnosisYesButton!, false);
  let has_siblings = switch_pair_button(hasSiblingsNoButton!, hasSiblingsYesButton!, false);
  let family_with_mental_symptoms = switch_pair_button(familyWithMentalSymptomsNoButton!, familyWithMentalSymptomsYesButton!, false);
  let family_with_ataxia = switch_pair_button(familyWithAtaxiaNoButton!, familyWithAtaxiaYesButton!, false);

  // TODO: Função que adiciona os eventos para todas as variaveis
  // Linkando o evento de click dos botoes de sim e nao com a função que faz eles trocarem e atualiza a variavel

  autismDiagnosisYesButton?.addEventListener('click', (_event) => {
    has_autism_diagnosis = switch_pair_button(autismDiagnosisNoButton!, autismDiagnosisYesButton!, has_autism_diagnosis);
  });

  autismDiagnosisNoButton?.addEventListener('click', (_event) => {
    has_autism_diagnosis = switch_pair_button(autismDiagnosisNoButton!, autismDiagnosisYesButton!, has_autism_diagnosis);
  });

  hasSiblingsYesButton?.addEventListener('click', (_event) => {
    has_siblings = switch_pair_button(hasSiblingsNoButton!, hasSiblingsYesButton!, has_siblings);
  });

  hasSiblingsNoButton?.addEventListener('click', (_event) => {
    has_siblings = switch_pair_button(hasSiblingsNoButton!, hasSiblingsYesButton!, has_siblings);
  });

  familyWithMentalSymptomsYesButton?.addEventListener('click', (_event) => {
    family_with_mental_symptoms = switch_pair_button(familyWithMentalSymptomsNoButton!, familyWithMentalSymptomsYesButton!, family_with_mental_symptoms);
  });

  familyWithMentalSymptomsNoButton?.addEventListener('click', (_event) => {
    family_with_mental_symptoms = switch_pair_button(familyWithMentalSymptomsNoButton!, familyWithMentalSymptomsYesButton!, family_with_mental_symptoms);
  });

  familyWithAtaxiaYesButton?.addEventListener('click', (_event) => {
    family_with_ataxia = switch_pair_button(familyWithAtaxiaNoButton!, familyWithAtaxiaYesButton!, family_with_ataxia);
  });

  familyWithAtaxiaNoButton?.addEventListener('click', (_event) => {
    family_with_ataxia = switch_pair_button(familyWithAtaxiaNoButton!, familyWithAtaxiaYesButton!, family_with_ataxia);
  });


  // Linkando botoes de mudar de sexo

  toggleMaleButton?.addEventListener('click', (_event) => {
    toggle_sex();
  });
  toggleFemaleButton?.addEventListener('click', (_event) => {
    toggle_sex();
  });


  // Botao de cadastro

  const cadastrarButton = container.querySelector<HTMLButtonElement>('#cadastrar');

  cadastrarButton?.addEventListener('click', (_event) => {
    cadastrarButtonPress();
  });


  // Botao de checar sintoma de macroorquidismo separado para desativar ele caso sexo = feminino
  const symptomButtonMacroorquidismo = container.querySelector<HTMLButtonElement>('#symptom_button_macroorquidismo');

  // Pega e seta os botoes de sintomas
  const sintomas_botoes = get_sintomas_buttons(container)
  setup_sintomas_buttons(sintomas_botoes, Object.keys(temSintomas));

  // Seta inputs de fotos
  const photo_inputs = get_photo_inputs(container);
  photo_upload(container, photo_inputs)

  // Seta variavel de sexo como masculino 
  let is_male_ = switch_pair_button(toggleMaleButton!, toggleFemaleButton!, false);
  symptomButtonMacroorquidismo!.disabled = false;

  // Função que troca o sexo do paciente e habilita/desabilita macrooquidismo
  function toggle_sex() {

    if (toggleMaleButton && toggleFemaleButton && symptomButtonMacroorquidismo) {
      if (is_male_ == true) {
        is_male_ = switch_pair_button(toggleMaleButton, toggleFemaleButton, is_male_);
        symptomButtonMacroorquidismo.disabled = true;
      }
      else {
        is_male_ = switch_pair_button(toggleMaleButton, toggleFemaleButton, is_male_);
        symptomButtonMacroorquidismo.disabled = false;
      }
    }

    clear_symptoms(sintomas_botoes);
  }

  // Inicializa array dos ids dos sintomas selecionados
  const id_sintomas_selecionados: number[] = [];

  async function cadastrarButtonPress() {

    // Pega valor de todos os inputs de escrita
    const nome = name_input?.value;
    const cpf = cpf_input?.value;
    const data_nascimento = birth_day_input?.valueAsDate;
    const mother_name = mother_name_input?.value;
    const responsible_name = responsible_name_input?.value;
    const cpf_responsible = cpf_responsible_input?.value;
    const phone_number = phone_number_input?.value;
    const country = country_input?.value;
    const state = state_input?.value;
    const city = city_input?.value;
    const observacao = observation_input?.value;

    let score = 0;

    // Checa se algum campo obrigatorio esta vazio e mostra uma notificação se sim
    if (!nome ||
      !cpf ||
      !data_nascimento ||
      !mother_name ||
      !responsible_name ||
      !cpf_responsible ||
      !phone_number ||
      !country ||
      !state ||
      !city) {
      trigger_notification_popup("Preencha os campos obrigatórios");
      return;
    }

    // Formulario do ZOD
    const dados_formulario = {
      nome: nome,
      cpf: cpf,
      data_nascimento: data_nascimento,
      mother_name: mother_name,
      responsible_name: responsible_name,
      cpf_responsible: cpf_responsible,
      phone_number: phone_number,
      country: country,
      state: state,
      city: city,
      observacao: observacao,
    };

    // Validação do Zod
    const resultado = cadastro_paciente_schema.safeParse(dados_formulario);

    if (!resultado.success) {
      const messages = resultado.error.issues.map(issue => issue.message);
      console.log(messages[0]);
      trigger_notification_popup(messages[0]);
      return;
    }

    // TODO: Função disso
    // Checagem se o CPF ja existe no sistema
    const { data: cpf_exists } = await supabase
      .from('paciente')
      .select('cpf')
      .eq('cpf', cpf)
      .single();

    if (cpf_exists) {
      trigger_notification_popup("CPF já cadastrado");
      return;
    }

    // Calculo do score e adiciona os ids dos sintomas ao array de ids de sintomas
    const sintomas_selecionados = Object.keys(temSintomas)

    for (let i = 0; i < sintomas_selecionados.length; i++) {

      if (is_male_ == true) {

        if (temSintomas[sintomas_selecionados[i]] == true) {

          score += sintomas_atuais_masculinas[sintomas_selecionados[i]];

          id_sintomas_selecionados.push(i)

        }

      } else {

        if (temSintomas[sintomas_selecionados[i]] == true) {

          score += sintomas_atuais_feminino[sintomas_selecionados[i]];

          id_sintomas_selecionados.push(i)

        }

      }

    }

    let sexo;

    if (is_male_ == true) {
      sexo = "masculino";
    }
    else {
      sexo = "feminino";
    }


    show_notification("Cadastrando paciente...")

    const id_medico = await get_user_id();

    // Cria id da avaliacao para criar a pasta do bucket com fotos
    const avaliacao_id = uuidv4();

    // Caminhos das fotos no bucket
    const front_path = `${id_medico}/${avaliacao_id}/front_view`;
    const three_four_path = `${id_medico}/${avaliacao_id}/three_four_view`;
    const profile_path = `${id_medico}/${avaliacao_id}/profile_view`;


    try {

      // Upload de fotos

      const { error: uploadFrontError } = await supabase.storage
        .from('fotos_pacientes')
        .upload(front_path, photo_inputs.at(0)?.files![0]);

      if (uploadFrontError) {
        throw uploadFrontError;
      }

      const { error: uploadThreeFourError } = await supabase.storage
        .from('fotos_pacientes')
        .upload(three_four_path, photo_inputs.at(1)?.files![0]);

      if (uploadThreeFourError) {
        throw uploadThreeFourError;
      }

      const { error: uploadProfileError } = await supabase.storage
        .from('fotos_pacientes')
        .upload(profile_path, photo_inputs.at(2)?.files![0]);

      if (uploadProfileError) {
        throw uploadProfileError;
      }

      // Dados para transação de criação de usuario
      const { data, error } = await supabase.rpc('cadastrar_paciente_transacao', {
        p_nome_paciente: nome,
        p_data_nascimento_paciente: data_nascimento,
        p_sexo_paciente: sexo,
        p_cpf_paciente: cpf,
        p_nome_mae_paciente: mother_name,
        p_responsavel_paciente: responsible_name,
        p_cpf_responsavel_paciente: cpf_responsible,
        p_pais_paciente: country,
        p_estado_paciente: state,
        p_cidade_paciente: city,
        p_telefone_paciente: phone_number,

        p_observacao_avaliacao: observacao,
        p_diagnostico_autismo_avaliacao: !has_autism_diagnosis,
        p_tem_irmaos_avaliacao: !has_siblings,
        p_familia_sintomas_mentais_avaliacao: !family_with_mental_symptoms,
        p_familiares_ataxia_avaliacao: !family_with_ataxia,
        p_avaliacao_sintomas: id_sintomas_selecionados,
        p_score_final_avaliacao: score,

        p_usuario_id: id_medico,
        p_avaliacao_id: avaliacao_id
      });

      console.log(data);

      if (error) {
        throw error;
      }

    } catch (error) {
      console.error('Erro no cadastro:', error instanceof Error ? error.message : error);
      trigger_notification_popup("Erro ao cadastrar paciente");
      return;
    }

    hide_notification()

    trigger_notification_popup("Paciente cadastrado com sucesso");

    // Quando usuario criado navega para pagina de relatorio que foi criado junto com ele
    navigate_to("/relatorio")
    window.history.pushState(null, '', "/relatorio/" + avaliacao_id);

    clear_symptoms(sintomas_botoes);

  }

}

// TODO: Refatorar
// Função que seta o input das fotos, adiciona e adiciona o preview delas
function photo_upload(container: HTMLDivElement, photo_inputs: HTMLInputElement[]) {

  let uploadFaceFrontContainer = container.querySelector<HTMLDivElement>('#face_front_container');
  let uploadFaceThreeFourContainer = container.querySelector<HTMLDivElement>('#face_three_four_container');
  let uploadFaceProfileContainer = container.querySelector<HTMLDivElement>('#face_profile_container');

  uploadFaceFrontContainer?.addEventListener('click', () => {
    photo_inputs.at(0)?.click();
  });

  uploadFaceThreeFourContainer?.addEventListener('click', () => {
    photo_inputs.at(1)?.click();
  });

  uploadFaceProfileContainer?.addEventListener('click', () => {
    photo_inputs.at(2)?.click();
  });

  let photo_face_front_preview: HTMLImageElement | null = null;
  let photo_face_three_four_preview: HTMLImageElement | null = null;
  let photo_face_profile_preview: HTMLImageElement | null = null;

  photo_inputs.at(0)?.addEventListener('change', (event) => {
    const file = event.target instanceof HTMLInputElement ? event.target.files?.[0] : null;
    if (!file) return;

    photo_face_front_preview = document.createElement('img');
    photo_face_front_preview.src = URL.createObjectURL(file);
    photo_face_front_preview.style.maxWidth = '100%';
    photo_face_front_preview.style.maxHeight = '100%';
    photo_face_front_preview.style.objectFit = 'cover';

    uploadFaceFrontContainer!.innerHTML = '';
    uploadFaceFrontContainer!.appendChild(photo_face_front_preview);
  });

  photo_inputs.at(1)?.addEventListener('change', (event) => {
    const file = event.target instanceof HTMLInputElement ? event.target.files?.[0] : null;
    if (!file) return;

    photo_face_three_four_preview = document.createElement('img');
    photo_face_three_four_preview.src = URL.createObjectURL(file);
    photo_face_three_four_preview.style.maxWidth = '100%';
    photo_face_three_four_preview.style.maxHeight = '100%';
    photo_face_three_four_preview.style.objectFit = 'cover';

    uploadFaceThreeFourContainer!.innerHTML = '';
    uploadFaceThreeFourContainer!.appendChild(photo_face_three_four_preview);
  });

  photo_inputs.at(2)?.addEventListener('change', (event) => {
    const file = event.target instanceof HTMLInputElement ? event.target.files?.[0] : null;
    if (!file) return;

    photo_face_profile_preview = document.createElement('img');
    photo_face_profile_preview.src = URL.createObjectURL(file);
    photo_face_profile_preview.style.maxWidth = '100%';
    photo_face_profile_preview.style.maxHeight = '100%';
    photo_face_profile_preview.style.objectFit = 'cover';

    uploadFaceProfileContainer!.innerHTML = '';
    uploadFaceProfileContainer!.appendChild(photo_face_profile_preview);
  });
}

// TODO: deixar generica para todos os botoes de toggle
// Função que faz toggle no botao de sintomas 
function toggle_symptom(chaveSintoma: string, botao: HTMLElement | null): void {
  if (!botao) return;

  const isSelected = botao.classList.toggle('is_active');

  if (chaveSintoma in temSintomas) {
    temSintomas[chaveSintoma] = isSelected;
  }
}

// Função que seta o evento de click do botão para a função de toggle dele
function setup_sintomas_buttons(buttons: HTMLButtonElement[], tem_sintomas: string[]) {

  for (let i = 0; i < tem_sintomas.length; i++) {
    let chave = tem_sintomas.at(i) as string
    buttons.at(i)!.addEventListener('click', () => {
      toggle_symptom(chave, buttons.at(i)!)
    })
  }

}

// Limpa sintomas selecionados
function clear_symptoms(buttons: HTMLButtonElement[]) {

  const chaves = Object.keys(temSintomas);

  for (let i = 0; i < chaves.length; i++) {
    temSintomas[chaves[i]] = false;
  }

  for (let i = 0; i < buttons.length; i++) {
    buttons.at(i)?.classList.remove("is_active");
  }

}

// Pega inputs de fotos 
function get_photo_inputs(container: HTMLDivElement) {
  return [
    container.querySelector<HTMLInputElement>('#face_front_input'),
    container.querySelector<HTMLInputElement>('#face_three_four_input'),
    container.querySelector<HTMLInputElement>('#face_profile_input')
  ].filter((input): input is HTMLInputElement => input !== null);
}

// Pega botoes de sintomas
function get_sintomas_buttons(container: HTMLDivElement): HTMLButtonElement[] {
  return [
    container.querySelector<HTMLButtonElement>('#symptom_button_deficiência_intelectual'),
    container.querySelector<HTMLButtonElement>('#symptom_button_face_orelhas_alongadas'),
    container.querySelector<HTMLButtonElement>('#symptom_button_macroorquidismo'),
    container.querySelector<HTMLButtonElement>('#symptom_button_hipermobilidade_articular'),
    container.querySelector<HTMLButtonElement>('#symptom_button_dificuldade_de_aprendizagem'),
    container.querySelector<HTMLButtonElement>('#symptom_button_deficit_de_atenção'),
    container.querySelector<HTMLButtonElement>('#symptom_button_movimentos_repetitivos'),
    container.querySelector<HTMLButtonElement>('#symptom_button_atraso_na_fala'),
    container.querySelector<HTMLButtonElement>('#symptom_button_hiperatividade'),
    container.querySelector<HTMLButtonElement>('#symptom_button_evita_contato_visual'),
    container.querySelector<HTMLButtonElement>('#symptom_button_evita_contato_fisico'),
    container.querySelector<HTMLButtonElement>('#symptom_button_agressividade')
  ].filter((button): button is HTMLButtonElement => button !== null);
}
