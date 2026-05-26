import './nova_avaliacao.css'
import "../../components/base_button.css"
import "../../components/input_boxes.css"

import { supabase } from "../../lib/supabase"
import { sintomas_atuais_masculinas, sintomas_atuais_feminino } from '../../lib/sintoma_pesos'

export async function init_nova_avaliacao_page() {

  const container = document.querySelector<HTMLDivElement>('#app');

  if (container === null) {
    return;
  }

  container.innerHTML = /* html */`
      
    <div class="card_container">

        <div class="patient_data_input_container">
          
          <div class="patient_input_container">

            <h5 id="patient_name"> Nome : Paciente</h5>
            <h5 id="patient_birthdate"> Data de nascimento : dd/mm/YYYY </h5>
            <h5 id="patient_sex"> Sexo : Masculino/Feminino </h5>
            <input class="base_input_text" placeholder="Observação" id="observation">

          </div>
        
          <button class="base_button" id="nova_avaliacao">
            Nova avaliação
          </button>
        
        </div>

        <div class="symptoms_checklist_container">
          <button class="toggle_base_button" id="symptom_button_deficiência_intelectual" aria-pressed="false">
            Deficiência Intelectual
          </button>
          <button class="toggle_base_button" id="symptom_button_face_orelhas_alongadas" aria-pressed="false">
            Face/orelhas alongadas
          </button>
          <div id="macroorquidismo_div">
        

          </div>
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

  // Pegar id do paciente na URL
  // Colocar informação do paciente nos campos de nome, data de nascimento e sexo
  // Colocar os sintomas atuais do paciente como ativos ou inativos de acordo com a base de dados


  const paciente_id = window.location.pathname.replace("/nova_avaliacao/", "")

  const { data: pacienteDados, error: getPacienteError } = await supabase.from("paciente").select("*").eq("id", paciente_id).single();

  console.log(pacienteDados)

  if (getPacienteError) {
    console.log("Erro ao buscar dados do paciente");
    console.log(getPacienteError);
    return;
  }

  // Preencher os campos do paciente
  const patientName = container.querySelector<HTMLHeadingElement>('#patient_name');
  const patientBirthdate = container.querySelector<HTMLHeadingElement>('#patient_birthdate');
  const patientSex = container.querySelector<HTMLHeadingElement>('#patient_sex');

  if (patientName) {
    patientName.textContent = `Nome : ${pacienteDados.nome}`;
  }

  if (patientBirthdate) {
    patientBirthdate.textContent = `Data de nascimento : ${new Date(pacienteDados.data_nascimento).toLocaleString('pt-BR')}`;
  }

  if (patientSex) {
    patientSex.textContent = `Sexo : ${pacienteDados.sexo}`;
  }

  const observation_input = container.querySelector<HTMLInputElement>('#observation');

  const nova_avaliacao_button = container.querySelector<HTMLButtonElement>('#nova_avaliacao');

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

    // Pegar dados do paciente

    const { data: pacienteDados, error: getPacienteError } = await supabase.from("paciente").select("*").eq("id", paciente_id).single();

    if (getPacienteError) {
      console.log("Erro ao buscar dados do paciente");
      console.log(getPacienteError);
      return;
    }

    // Pegar sintomas selecionados
    // Calcular score
    // Criar avaliação no banco de dados

    const nome = pacienteDados.nome;
    const sexo = pacienteDados.sexo;
    const cpf = pacienteDados.cpf;
    const data_nascimento = pacienteDados.data_nascimento;
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

    const id_medico = user?.id;

    interface Paciente {
      id: number,
      nome: string,
      cpf: string,
      sexo: string,
      id_usuario: number
    }


    const id_paciente = (pacienteDados as Paciente).id;

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
      console.log("Erro ao criar avaliação");
      console.log(insertAvaliacaoError);
      return;
    }

    if (!novaAvaliacao) {
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

    const { data: novoItemAvaliacao, error: insertItemAvaliacaoError } = await supabase
      .from("item_avaliacao").
      insert(
        sintomasAssociativos
      )

    if (insertItemAvaliacaoError) {
      console.log("Erro ao criar item avaliação");
      console.log(insertItemAvaliacaoError);
      return;
    }

    console.log("Item avaliação criados");

  }

}
