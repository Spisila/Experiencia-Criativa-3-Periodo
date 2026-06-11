import './nova_avaliacao.css'
import "../../components/base_button.css"
import "../../components/input_boxes.css"

import { supabase } from "../../lib/supabase"
import { sintomas_atuais_masculinas, sintomas_atuais_feminino } from '../../lib/sintoma_pesos'

import { switch_pair_button } from '../../components/switch_pair_button'

import { hideNotification, showNotification, trigger_notification_popup } from '../../components/notification_popup'

import { v4 as uuidv4 } from 'uuid';

export async function init_nova_avaliacao_page() {

  const container = document.querySelector<HTMLDivElement>('#app');

  if (container === null) {
    return;
  }

  container.innerHTML = /* html */`
      
    <div class="card_container">

        <div class="patient_data_input_container">
          
          <div class="patient_input_container">

          
          <h5 id="patient_name">Nome:</h5>
          <h5 id="patient_sex">Sexo:</h5>
          <h5 id="patient_cpf">CPF:</h5>
          <h5 id="patient_birthdate">Data de nascimento:</h5>
          <h5 id="patient_mother_name">Nome da mãe:</h5>
          <h5 id="patient_responsible_name">Responsável pelo paciente:</h5>
          <h5 id="patient_cpf_responsible">CPF do responsável:</h5>
          <h5 id="patient_phone_number">Telefone:</h5>
          <h5 id="patient_country">País:</h5>
          <h5 id="patient_state">Estado:</h5>
          <h5 id="patient_city">Cidade:</h5>

          <input class="base_input_text" placeholder="Observação" id="observation">

          </div>
        
          <button class="base_button" id="nova_avaliacao">
            Nova avaliação
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

  // Pega paciente_id da url
  const paciente_id = window.location.pathname.replace("/nova_avaliacao/", "")

  // Pega dados do paciente apartir do id da url
  const { data: pacienteDados, error: getPacienteError } = await supabase
  .from("paciente")
  .select("*")
  .eq("id", paciente_id)
  .single();

  if (getPacienteError) {
    console.log("Erro ao buscar dados do paciente");
    console.log(getPacienteError);
    return;
  }

  // Pega o texto que vai ser setado com as variaveis buscadas
  const patientName = container.querySelector<HTMLHeadingElement>('#patient_name');
  const patientCpf = container.querySelector<HTMLHeadingElement>('#patient_cpf');
  const patientBirthdate = container.querySelector<HTMLHeadingElement>('#patient_birthdate');
  const patientSex = container.querySelector<HTMLHeadingElement>('#patient_sex');
  const patientMotherName = container.querySelector<HTMLHeadingElement>('#patient_mother_name');
  const patientResponsibleName = container.querySelector<HTMLHeadingElement>('#patient_responsible_name');
  const patientCpfResponsible = container.querySelector<HTMLHeadingElement>('#patient_cpf_responsible');
  const patientPhoneNumber = container.querySelector<HTMLHeadingElement>('#patient_phone_number');
  const patientCountry = container.querySelector<HTMLHeadingElement>('#patient_country');
  const patientState = container.querySelector<HTMLHeadingElement>('#patient_state');
  const patientCity = container.querySelector<HTMLHeadingElement>('#patient_city');

  // TODO: botar isso em um loop
  // Seta as variaveis
  if (patientName) {
    patientName.textContent = `Nome: ${pacienteDados.nome}`;
  }

  if (patientCpf) {
    patientCpf.textContent = `CPF: ${pacienteDados.cpf}`;
  }

  if (patientBirthdate) {
    patientBirthdate.textContent =
      `Data de nascimento: ${new Date(pacienteDados.data_nascimento).toLocaleDateString('pt-BR')}`;
  }

  if (patientSex) {
    patientSex.textContent = `Sexo: ${pacienteDados.sexo}`;
  }

  if (patientMotherName) {
    patientMotherName.textContent = `Nome da mãe: ${pacienteDados.nome_mae}`;
  }

  if (patientResponsibleName) {
    patientResponsibleName.textContent =
      `Responsável pelo paciente: ${pacienteDados.nome_responsavel}`;
  }

  if (patientCpfResponsible) {
    patientCpfResponsible.textContent =
      `CPF do responsável: ${pacienteDados.cpf_responsavel}`;
  }

  if (patientPhoneNumber) {
    patientPhoneNumber.textContent =
      `Telefone: ${pacienteDados.telefone}`;
  }

  if (patientCountry) {
    patientCountry.textContent =
      `País: ${pacienteDados.pais}`;
  }

  if (patientState) {
    patientState.textContent =
      `Estado: ${pacienteDados.estado}`;
  }

  if (patientCity) {
    patientCity.textContent =
      `Cidade: ${pacienteDados.cidade}`;
  }

  const observation_input = container.querySelector<HTMLInputElement>('#observation');

  const nova_avaliacao_button = container.querySelector<HTMLButtonElement>('#nova_avaliacao');


  // TODO: refatorar tambem
  // Botoes de sim ou não
  const autismDiagnosisYesButton = container.querySelector<HTMLButtonElement>('#autism_diagnosis_yes');
  const autismDiagnosisNoButton = container.querySelector<HTMLButtonElement>('#autism_diagnosis_no');

  const hasSiblingsYesButton = container.querySelector<HTMLButtonElement>('#has_siblings_yes');
  const hasSiblingsNoButton = container.querySelector<HTMLButtonElement>('#has_siblings_no');

  const familyWithMentalSymptomsYesButton = container.querySelector<HTMLButtonElement>('#family_with_mental_symptoms_yes');
  const familyWithMentalSymptomsNoButton = container.querySelector<HTMLButtonElement>('#family_with_mental_symptoms_no');

  const familyWithAtaxiaYesButton = container.querySelector<HTMLButtonElement>('#family_with_ataxia_yes');
  const familyWithAtaxiaNoButton = container.querySelector<HTMLButtonElement>('#family_with_ataxia_no');

  let has_autism_diagnosis = switch_pair_button(autismDiagnosisNoButton!, autismDiagnosisYesButton!, false);
  let has_siblings = switch_pair_button(hasSiblingsNoButton!, hasSiblingsYesButton!, false);
  let family_with_mental_symptoms = switch_pair_button(familyWithMentalSymptomsNoButton!, familyWithMentalSymptomsYesButton!, false);
  let family_with_ataxia = switch_pair_button(familyWithAtaxiaNoButton!, familyWithAtaxiaYesButton!, false);


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


  // Refatorar também
  // Fotos
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

  // TODO: refatorar também
  // Botoes de sintomas
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

  if (pacienteDados.sexo == "feminino") {
    symptomButtonMacroorquidismo!.disabled = true;
  }

  nova_avaliacao_button?.addEventListener('click', (_event) => {
    nova_avaliacao_press();
  });

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

  const chaves = Object.keys(temSintomas);

  for (let i = 0; i < chaves.length; i++) {
    temSintomas[chaves[i]] = false;
  }

  function toggle_symptom(chaveSintoma: string, botao: HTMLElement | null): void {
    if (!botao) return;

    const isSelected = botao.classList.toggle('is_active');

    if (chaveSintoma in temSintomas) {
      temSintomas[chaveSintoma] = isSelected;
    }
  }

  const id_sintomas_selecionados: number[] = [];

  async function nova_avaliacao_press() {

    showNotification("Criando Avaliação...")

    const { data: pacienteDados, error: getPacienteError } = await supabase.from("paciente").select("*").eq("id", paciente_id).single();

    if (getPacienteError) {
      console.log("Erro ao buscar dados do paciente");
      console.log(getPacienteError);
      return;
    }


    const nome = pacienteDados.nome;
    const sexo = pacienteDados.sexo;
    const cpf = pacienteDados.cpf;
    const data_nascimento = pacienteDados.data_nascimento;
    const nome_mae = pacienteDados.nome_mae;
    const nome_responsavel = pacienteDados.nome_responsavel;
    const cpf_responsavel = pacienteDados.cpf_responsavel;
    const telefone = pacienteDados.telefone;
    const pais = pacienteDados.pais;
    const estado = pacienteDados.estado;
    const cidade = pacienteDados.cidade;

    const observacao = observation_input?.value;

    let is_male = true;

    if (sexo == "masculino") {
      is_male = true;
    }
    else if (sexo == "feminino") {
      is_male = false;
    }

    let score = 0;

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


    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError) {
      console.log("Erro de autenticação = " + authError)
      return;
    }

    if (!user) {
      console.log("Nenhum usuario")
      return;
    }

    const usuario_id = user?.id;
    const avaliacao_id = uuidv4();

    const front_path = `${usuario_id}/${avaliacao_id}/front_view`;
    const three_four_path = `${usuario_id}/${avaliacao_id}/three_four_view`;
    const profile_path = `${usuario_id}/${avaliacao_id}/profile_view`;

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

      const { error } = await supabase.rpc('nova_avaliacao_transacao', {
        p_observacao_avaliacao: observacao,
        p_diagnostico_autismo_avaliacao: !has_autism_diagnosis,
        p_tem_irmaos_avaliacao: !has_siblings,
        p_familia_sintomas_mentais_avaliacao: !family_with_mental_symptoms,
        p_familiares_ataxia_avaliacao: !family_with_ataxia,
        p_avaliacao_sintomas: id_sintomas_selecionados,
        p_score_final_avaliacao: score,

        p_usuario_id: usuario_id,
        p_avaliacao_id: avaliacao_id,
        p_paciente_id: paciente_id
      });

      if (error) {
        throw error;
      } else {
        hideNotification()
        trigger_notification_popup("Avaliação Criada")
      }

    } catch (error) {
      console.error('Erro no cadastro:', error instanceof Error ? error.message : error);
      trigger_notification_popup("Erro ao criar nova avaliação");
      return;
    }



  }

}
