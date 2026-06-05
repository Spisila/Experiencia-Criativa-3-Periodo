import './cadastro_paciente.css'
import "../../components/base_button.css"
import "../../components/input_boxes.css"

import { supabase } from "../../lib/supabase"
import { sintomas_atuais_masculinas, sintomas_atuais_feminino } from '../../lib/sintoma_pesos'
import { trigger_notification_popup } from '../../components/notification_popup'

import { cadastro_paciente_schema } from '../../schemas/cadastro_pacientes_schema';

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
            
              <p>Possui diagnostico de autismo</p>

              <div class="yes_no_button_container">
            
                <button class="toggle_small_base_button" id="toggle_male" >
                  Sim
                </button> 
              
                <button class="toggle_small_base_button" id="toggle_female">
                  Não
                </button>
              
              </div>
            
            </div>


            <div class="yes_no_container"> 
            
              <p>Possui diagnostico de autismo</p>

              <div class="yes_no_button_container">
            
                <button class="toggle_small_base_button" id="toggle_male" >
                  Sim
                </button> 
              
                <button class="toggle_small_base_button" id="toggle_female">
                  Não
                </button>
              
              </div>
            
            </div>

            <div class="yes_no_container"> 
            
              <p>Possui diagnostico de autismo</p>

              <div class="yes_no_button_container">
            
                <button class="toggle_small_base_button" id="toggle_male" >
                  Sim
                </button> 
              
                <button class="toggle_small_base_button" id="toggle_female">
                  Não
                </button>
              
              </div>
            
            </div>

            <div class="yes_no_container"> 
            
              <p>Possui diagnostico de autismo</p>

              <div class="yes_no_button_container">
            
                <button class="toggle_small_base_button" id="toggle_male" >
                  Sim
                </button> 
              
                <button class="toggle_small_base_button" id="toggle_female">
                  Não
                </button>
              
              </div>
            
            </div>

          </div>

          <div class="photo_upload_container"> 
          
            <div class="photo_container">
              Rosto frente
            </div>

            <div class="photo_container">
              Rosto 3/4
            </div>

            <div class="photo_container">
              Rosto Perfil
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
  const observation_input = container.querySelector<HTMLInputElement>('#observation');

  const toggleMaleButton = container.querySelector<HTMLButtonElement>('#toggle_male');
  const toggleFemaleButton = container.querySelector<HTMLButtonElement>('#toggle_female');
  const cadastrarButton = container.querySelector<HTMLButtonElement>('#cadastrar');

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

  toggleMaleButton?.addEventListener('click', (_event) => {
    toggleMaleButtonPress();
  });
  toggleFemaleButton?.addEventListener('click', (_event) => {
    toggleFemaleButtonPress();
  });
  cadastrarButton?.addEventListener('click', (_event) => {
    cadastrarButtonPress();
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

  let is_male = true;

  function toggleMaleButtonPress(): void { toggle_sex() }
  function toggleFemaleButtonPress(): void { toggle_sex() }

  function init_sex() {
    if (toggleMaleButton && toggleFemaleButton && symptomButtonMacroorquidismo) {
      is_male = true;
      toggleMaleButton.classList.add('is_active');
      toggleFemaleButton.classList.remove('is_active');
      symptomButtonMacroorquidismo.disabled = false;
    }
  }

  function toggle_sex() {
    if (toggleMaleButton && toggleFemaleButton && symptomButtonMacroorquidismo) {
      if (is_male == true) {
        is_male = false;
        toggleMaleButton.classList.remove('is_active');
        toggleFemaleButton.classList.add('is_active');
        symptomButtonMacroorquidismo.disabled = true;
      }
      else {
        is_male = true;
        toggleMaleButton.classList.add('is_active');
        toggleFemaleButton.classList.remove('is_active');
        symptomButtonMacroorquidismo.disabled = false;
      }
    }

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

  init_sex();

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
    const observacao = observation_input?.value;

    let score = 0;

    if (!nome || !cpf || !data_nascimento) {
      trigger_notification_popup("Preencha os campos obrigatórios");
      return;
    }

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

    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError) {
      console.log("Erro de autenticação = " + authError)
      return;
    }

    if (!user) {
      console.log("Nenhum usuario")
      return;
    }

    const id_medico = user?.id;

    interface Paciente {
      id: number,
      nome: string,
      cpf: string,
      sexo: string,
      id_usuario: number
    }

    const { data: novoPaciente, error: insertPacienteError } = await supabase
      .from("paciente")
      .insert({
        nome: nome,
        data_nascimento: data_nascimento,
        cpf: cpf,
        sexo: sexo,
        usuario_id: id_medico
      })
      .select()
      .single();

    if (insertPacienteError) {
      trigger_notification_popup("Erro ao cadastrar paciente");
      console.log("Erro ao criar paciente");
      console.log(insertPacienteError);
      return;
    }

    if (!novoPaciente) {
      console.log("Paciente não criado?");
      return;
    }

    console.log("Paciente criado");

    const id_paciente = (novoPaciente as Paciente).id;

    const { data: novaAvaliacao, error: insertAvaliacaoError } = await supabase
      .from("avaliacao")
      .insert({
        usuario_id: id_medico,
        paciente_id: id_paciente,
        resultado_final: observacao,
        score_final: score
      })
      .select()
      .single()

    if (insertAvaliacaoError) {
      trigger_notification_popup("Erro ao criar avaliação");
      console.log("Erro ao criar avaliação");
      console.log(insertAvaliacaoError);
      return;
    }

    if (!novaAvaliacao) {
      trigger_notification_popup("Erro ao criar avaliação");
      console.log("Avaliação não criada?");
      return;
    }

    console.log("Avaliação criada");

    interface Avaliacao {
      id: number,
      usuario_id: number,
      paciente_id: number,
      resultado_final: string,
      score_final: number
    }

    const id_avaliacao = (novaAvaliacao as Avaliacao).id;

    const sintomasAssociativos = id_sintomas_selecionados.map((sintomaId) => ({
      avaliacao_id: id_avaliacao,
      sintoma_id: sintomaId
    }));

    const { error: insertItemAvaliacaoError } = await supabase
      .from("item_avaliacao").
      insert(
        sintomasAssociativos
      )

    if (insertItemAvaliacaoError) {
      trigger_notification_popup("Erro ao criar item avaliação");
      console.log("Erro ao criar item avaliação");
      console.log(insertItemAvaliacaoError);
      return;
    }

    console.log("Item avaliação criados");

    trigger_notification_popup("Paciente cadastrado com sucesso");

    const chaves = Object.keys(temSintomas);

    for (let i = 0; i < chaves.length; i++) {
      temSintomas[chaves[i]] = false;
    }

    id_sintomas_selecionados.length = 0;

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

}