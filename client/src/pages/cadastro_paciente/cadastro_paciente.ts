import './cadastro_paciente.css'
import "../../components/base_button.css"
import "../../components/input_boxes.css"

import { supabase } from "../../lib/supabase"
import { sintomas_atuais_masculinas, sintomas_atuais_feminino } from '../../lib/sintoma_pesos'

export async function init_cadastro_paciente_page() {

  const container = document.querySelector<HTMLDivElement>('#app');

  if (container === null) {
    return;
  }

  container.innerHTML = /* html */`
      
    <div class="card_container">

        <div class="patient_data_input_container">
          
          <div class="patient_input_container">
        
            <input class="base_input_text" placeholder="Nome" id="name">
            <input class="base_input_text" placeholder="Data nascimento" type="date" id="birth_date">
        
          </div>

          
          <div class="patient_sex_container">
        
            <button class="toggle_base_button" id="toggle_male">
              Masculino 
            </button> 
          
            <button class="toggle_base_button" id="toggle_female">
              Feminino
            </button>
          
          </div>
        
          <button class="base_button" id="cadastrar">
            Cadastrar
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

  const name_input = container.querySelector<HTMLInputElement>('#name');
  const birth_day_input = container.querySelector<HTMLInputElement>('#birth_date');

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
    symptomDeficienciaIntelectualPress();
  });
  symptomButtonFaceOrelhasAlongadas?.addEventListener('click', (_event) => {
    symptomFaceOrelhasAlongadasPress();
  });
  symptomButtonMacroorquidismo?.addEventListener('click', (_event) => {
    symptomMacroorquidismoPress();
  });
  symptomButtonHipermobilidadeArticular?.addEventListener('click', (_event) => {
    symptomHipermobilidadeArticularPress();
  });
  symptomButtonDificuldadeAprendizagem?.addEventListener('click', (_event) => {
    symptomDificuldadeAprendizagemPress();
  });
  symptomButtonDeficitAtencao?.addEventListener('click', (_event) => {
    symptomDeficitAtencaoPress();
  });
  symptomButtonMovimentosRepetitivos?.addEventListener('click', (_event) => {
    symptomMovimentosRepetitivosPress();
  });
  symptomButtonAtrasoFala?.addEventListener('click', (_event) => {
    symptomAtrasoFalaPress();
  });
  symptomButtonHiperatividade?.addEventListener('click', (_event) => {
    symptomHiperatividadePress();
  });
  symptomButtonEvitaContatoVisual?.addEventListener('click', (_event) => {
    symptomEvitaContatoVisualPress();
  });
  symptomButtonEvitaContatoFisico?.addEventListener('click', (_event) => {
    symptomEvitaContatoFisicoPress();
  });
  symptomButtonAgressividade?.addEventListener('click', (_event) => {
    symptomAgressividadePress();
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

    for (let i = 0; i < chaves.length; i++) 
    {
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

  function symptomDeficienciaIntelectualPress(): void {
    toggle_symptom('deficiencia_intelectual', symptomButtonDeficienciaIntelectual);
  }
  function symptomFaceOrelhasAlongadasPress(): void {
    toggle_symptom('face_orelhas_alongadas', symptomButtonFaceOrelhasAlongadas);
  }
  function symptomMacroorquidismoPress(): void {
    toggle_symptom('macroorquidismo', symptomButtonMacroorquidismo);
  }
  function symptomHipermobilidadeArticularPress(): void {
    toggle_symptom('hipermobilidade_articular', symptomButtonHipermobilidadeArticular);
  }
  function symptomDificuldadeAprendizagemPress(): void {
    toggle_symptom('dificuldade_de_aprendizagem', symptomButtonDificuldadeAprendizagem);
  }
  function symptomDeficitAtencaoPress(): void {
    toggle_symptom('deficit_de_atencao', symptomButtonDeficitAtencao);
  }
  function symptomMovimentosRepetitivosPress(): void {
    toggle_symptom('movimentos_repetitivos', symptomButtonMovimentosRepetitivos);
  }
  function symptomAtrasoFalaPress(): void {
    toggle_symptom('atraso_na_fala', symptomButtonAtrasoFala);
  }
  function symptomHiperatividadePress(): void {
    toggle_symptom('hiperatividade', symptomButtonHiperatividade);
  }
  function symptomEvitaContatoVisualPress(): void {
    toggle_symptom('evita_contato_visual', symptomButtonEvitaContatoVisual);
  }
  function symptomEvitaContatoFisicoPress(): void {
    toggle_symptom('evita_contato_fisico', symptomButtonEvitaContatoFisico);
  }
  function symptomAgressividadePress(): void {
    toggle_symptom('evita_contato_fisico', symptomButtonAgressividade);
  }

  // Inverti os pesos
  function cadastrarButtonPress(): void {

    const nome = name_input?.value;
    const data_nascimento = birth_day_input?.value;

    let score = 0;

    if (nome && data_nascimento) {
      const sintomas_selecionados = Object.keys(temSintomas)

      console.log(is_male);

      for (let i = 0; i < sintomas_selecionados.length; i++) {

        if (is_male == true) {
          console.log("Homeme");
          if (temSintomas[sintomas_selecionados[i]] == true) {

            score += sintomas_atuais_masculinas[sintomas_selecionados[i]];

          }

        } else {

          if (temSintomas[sintomas_selecionados[i]] == true) {

            score += sintomas_atuais_feminino[sintomas_selecionados[i]];

          }

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

    console.log(score);

    // supabase.from("paciente").insert({nome: nome, data_nascimento: data_nascimento, sexo: sexo, id_usuario: 1});

    // supabase.from("avaliacao").insert({score_final: score, resultado_final: "Teste", id_usuario: 1, id_paciente: 2});


  }

}