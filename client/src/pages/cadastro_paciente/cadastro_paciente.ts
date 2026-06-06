import './cadastro_paciente.css'
import "../../components/base_button.css"
import "../../components/input_boxes.css"

import { supabase } from "../../lib/supabase"
import { sintomas_atuais_masculinas, sintomas_atuais_feminino } from '../../lib/sintoma_pesos'
import { trigger_notification_popup } from '../../components/notification_popup'

import { get_auth_user } from '../../components/auth_functions';

import { cadastro_paciente_schema } from '../../schemas/cadastro_pacientes_schema';

import { switch_pair_button } from '../../components/switch_pair_button';


import { v4 as uuidv4 } from 'uuid';

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
            <input class="base_small_input_text" placeholder="CPF do paciente" id="cpf">
            <input class="base_small_input_text" placeholder="Data nascimento do paciente" type="date" id="birth_date">
            <input class="base_small_input_text" placeholder="Nome da mãe" id="mother_name">
            <input class="base_small_input_text" placeholder="Responsavel pelo paciente" id="responsible_name">
            <input class="base_small_input_text" placeholder="CPF do responsavel" id="cpf_responsible">
            <input class="base_small_input_text" placeholder="Telefone" id="phone_number">
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
            
              <p>Possui diagnostico de autismo?</p>

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
            
              <p>Tem irmãos?</p>

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
            
              <p>Familiares com sintomas mentais?</p>

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
            
              <p>Familiares com ataxia?</p>

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

  //#region Yes no buttons

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

  let has_autism_diagnosis = false;
  let has_siblings = false;
  let family_with_mental_symptoms = false;
  let family_with_ataxia = false;

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


  toggleMaleButton?.addEventListener('click', (_event) => {
    toggle_sex();
  });
  toggleFemaleButton?.addEventListener('click', (_event) => {
    toggle_sex();
  });

  const cadastrarButton = container.querySelector<HTMLButtonElement>('#cadastrar');
  cadastrarButton?.addEventListener('click', (_event) => {
    cadastrarButtonPress();
  });

  //#endregion

  //#region Symptoms buttons

  const symptomButtonDeficienciaIntelectual = container.querySelector<HTMLButtonElement>('#symptom_button_deficiência_intelectual');
  const symptomButtonFaceOrelhasAlongadas = container.querySelector<HTMLButtonElement>('#symptom_button_face_orelhas_alongadas');
  const symptomButtonMacroorquidismo = container.querySelector<HTMLButtonElement>('#symptom_button_macroorquidismo');
  const symptomButtonHipermobilidadeArticular = container.querySelector<HTMLButtonElement>('#symptom_button_hipermobilidade_articular');
  const symptomButtonDificuldadeAprendizagem = container.querySelector<HTMLButtonElement>('#symptom_button_dificuldade_de_aprendizagem');
  const symptomButtonDeficitAtencao = container.querySelector<HTMLButtonElement>('#symptom_button_deficit_de_atenção');
  const symptomButtonMovimentosRepetitivos = container.querySelector<HTMLButtonElement>('#symptom_button_movimentos_repetitivos');
  const symptomButtonAtrasoFala = container.querySelector<HTMLButtonElement>('#symptom_button_atraso_na_fala');
  const symptomButtonHiperatividade = container.querySelector<HTMLButtonElement>('#symptom_button_hiperatividade');
  const symptomButtonEvitaContatoVisual = container.querySelector<HTMLButtonElement>('#symptom_button_evita_contato_visual');
  const symptomButtonEvitaContatoFisico = container.querySelector<HTMLButtonElement>('#symptom_button_evita_contato_fisico');
  const symptomButtonAgressividade = container.querySelector<HTMLButtonElement>('#symptom_button_agressividade');

  symptomButtonDeficienciaIntelectual?.addEventListener('click', (_event) => {
    toggle_symptom('deficiencia_intelectual', symptomButtonDeficienciaIntelectual);
  });
  symptomButtonFaceOrelhasAlongadas?.addEventListener('click', (_event) => {
    toggle_symptom('face_orelhas_alongadas', symptomButtonFaceOrelhasAlongadas);
  });
  symptomButtonMacroorquidismo?.addEventListener('click', (_event) => {
    toggle_symptom('macroorquidismo', symptomButtonMacroorquidismo);
  });
  symptomButtonHipermobilidadeArticular?.addEventListener('click', (_event) => {
    toggle_symptom('hipermobilidade_articular', symptomButtonHipermobilidadeArticular);
  });
  symptomButtonDificuldadeAprendizagem?.addEventListener('click', (_event) => {
    toggle_symptom('dificuldade_de_aprendizagem', symptomButtonDificuldadeAprendizagem);
  });
  symptomButtonDeficitAtencao?.addEventListener('click', (_event) => {
    toggle_symptom('deficit_de_atencao', symptomButtonDeficitAtencao);
  });
  symptomButtonMovimentosRepetitivos?.addEventListener('click', (_event) => {
    toggle_symptom('movimentos_repetitivos', symptomButtonMovimentosRepetitivos);
  });
  symptomButtonAtrasoFala?.addEventListener('click', (_event) => {
    toggle_symptom('atraso_na_fala', symptomButtonAtrasoFala);
  });
  symptomButtonHiperatividade?.addEventListener('click', (_event) => {
    toggle_symptom('hiperatividade', symptomButtonHiperatividade);
  });
  symptomButtonEvitaContatoVisual?.addEventListener('click', (_event) => {
    toggle_symptom('evita_contato_visual', symptomButtonEvitaContatoVisual);
  });
  symptomButtonEvitaContatoFisico?.addEventListener('click', (_event) => {
    toggle_symptom('evita_contato_fisico', symptomButtonEvitaContatoFisico);
  });
  symptomButtonAgressividade?.addEventListener('click', (_event) => {
    toggle_symptom('agressividade', symptomButtonAgressividade);
  });

  //#endregion

  const uploadFaceFrontInput = container.querySelector<HTMLInputElement>('#face_front_input');
  const uploadFaceThreeFourInput = container.querySelector<HTMLInputElement>('#face_three_four_input');
  const uploadFaceProfileInput = container.querySelector<HTMLInputElement>('#face_profile_input');

  let uploadFaceFrontContainer = container.querySelector<HTMLDivElement>('#face_front_container');
  let uploadFaceThreeFourContainer = container.querySelector<HTMLDivElement>('#face_three_four_container');
  let uploadFaceProfileContainer = container.querySelector<HTMLDivElement>('#face_profile_container');

  uploadFaceFrontContainer?.addEventListener('click', () => {
    uploadFaceFrontInput?.click();
  });

  uploadFaceThreeFourContainer?.addEventListener('click', () => {
    uploadFaceThreeFourInput?.click();
  });

  uploadFaceProfileContainer?.addEventListener('click', () => {
    uploadFaceProfileInput?.click();
  });

  let photo_face_front_preview: HTMLImageElement | null = null;
  let photo_face_three_four_preview: HTMLImageElement | null = null;
  let photo_face_profile_preview: HTMLImageElement | null = null;

  uploadFaceFrontInput?.addEventListener('change', (event) => {
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

  uploadFaceThreeFourContainer?.addEventListener('change', (event) => {
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

  uploadFaceProfileContainer?.addEventListener('change', (event) => {
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

  let is_male = true;

  function init_sex() {
    if (toggleMaleButton && toggleFemaleButton && symptomButtonMacroorquidismo) {
      is_male = true;
      switch_pair_button(toggleMaleButton, toggleFemaleButton, is_male);
      symptomButtonMacroorquidismo.disabled = false;
    }
  }

  function toggle_sex() {

    if (toggleMaleButton && toggleFemaleButton && symptomButtonMacroorquidismo) {
      if (is_male == true) {
        is_male = false;
        switch_pair_button(toggleMaleButton, toggleFemaleButton, is_male);
        symptomButtonMacroorquidismo.disabled = true;
      }
      else {
        is_male = true;
        switch_pair_button(toggleMaleButton, toggleFemaleButton, is_male);
        symptomButtonMacroorquidismo.disabled = false;
      }
    }

    clear_symptoms();
  }

  function clear_symptoms() {

    const chaves = Object.keys(temSintomas);

    for (let i = 0; i < chaves.length; i++) {
      temSintomas[chaves[i]] = false;
    }

    symptomButtonDeficienciaIntelectual?.classList.remove("is_active");
    symptomButtonFaceOrelhasAlongadas?.classList.remove("is_active");
    symptomButtonMacroorquidismo?.classList.remove("is_active");
    symptomButtonHipermobilidadeArticular?.classList.remove("is_active");
    symptomButtonDificuldadeAprendizagem?.classList.remove("is_active");
    symptomButtonDeficitAtencao?.classList.remove("is_active");
    symptomButtonMovimentosRepetitivos?.classList.remove("is_active");
    symptomButtonAtrasoFala?.classList.remove("is_active");
    symptomButtonHiperatividade?.classList.remove("is_active");
    symptomButtonEvitaContatoVisual?.classList.remove("is_active");
    symptomButtonEvitaContatoFisico?.classList.remove("is_active");
    symptomButtonAgressividade?.classList.remove("is_active");

  }

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

  function toggle_symptom(chaveSintoma: string, botao: HTMLElement | null): void {
    if (!botao) return;

    const isSelected = botao.classList.toggle('is_active');

    if (chaveSintoma in temSintomas) {
      temSintomas[chaveSintoma] = isSelected;
    }
  }

  const id_sintomas_selecionados: number[] = [];

  async function cadastrarButtonPress() {

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

    // TODO: validar cpf, telefone, data de nascimento e outros campos
    const dadosFormulario = {
      nome: nome,
      cpf: cpf,
      data_nascimento: data_nascimento,
      observacao: observacao
    }

    const resultado = cadastro_paciente_schema.safeParse(dadosFormulario);

    if (!resultado.success) {
      const messages = resultado.error.issues.map(issue => issue.message);
      console.log(messages[0]);
      trigger_notification_popup(messages[0]);
      return;
    }

    const { data: cpf_exists } = await supabase.from('paciente').select('cpf').eq('cpf', cpf).single();

    if (cpf_exists) {
      trigger_notification_popup("CPF já cadastrado");
      return;
    }

    const sintomas_selecionados = Object.keys(temSintomas)

    for (let i = 0; i < sintomas_selecionados.length; i++) {

      if (is_male == true) {

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

    if (is_male == true) {
      sexo = "masculino";
    }
    else {
      sexo = "feminino";
    }


    const user = await get_auth_user();

    const id_medico = user!.session!.user.id;

    const avaliacao_id = uuidv4();

    const front_path = `${id_medico}/${avaliacao_id}/front_view`;
    const three_four_path = `${id_medico}/${avaliacao_id}/three_four_view`;
    const profile_path = `${id_medico}/${avaliacao_id}/profile_view`;


    try {
      const { error: uploadFrontError } = await supabase.storage
        .from('fotos_pacientes')
        .upload(front_path, uploadFaceFrontInput?.files![0]);

      if (uploadFrontError) {
        throw uploadFrontError;
      }

      const { error: uploadThreeFourError } = await supabase.storage
        .from('fotos_pacientes')
        .upload(three_four_path, uploadFaceThreeFourInput?.files![0]);

      if (uploadThreeFourError) {
        throw uploadThreeFourError;
      }

      const { error: uploadProfileError } = await supabase.storage
        .from('fotos_pacientes')
        .upload(profile_path, uploadFaceProfileInput?.files![0]);

      if (uploadProfileError) {
        throw uploadProfileError;
      }

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
        p_diagnostico_autismo_avaliacao: has_autism_diagnosis,
        p_tem_irmaos_avaliacao: has_siblings,
        p_familia_sintomas_mentais_avaliacao: family_with_mental_symptoms,
        p_familiares_ataxia_avaliacao: family_with_ataxia,
        p_avaliacao_sintomas: id_sintomas_selecionados,
        p_score_final_avaliacao: score,

        p_usuario_id: id_medico,
        p_avaliacao_id: avaliacao_id
      });

      console.log(data);

      if (error) {
        throw error;
      } else {
        console.log('Paciente, avaliação e itens cadastrados com sucesso!');
      }

    } catch (error) {
      console.error('Erro no cadastro:', error instanceof Error ? error.message : error);
      trigger_notification_popup("Erro ao cadastrar paciente");
      return;
    }




    trigger_notification_popup("Paciente cadastrado com sucesso");

    clear_symptoms();

  }

  init_sex();

}