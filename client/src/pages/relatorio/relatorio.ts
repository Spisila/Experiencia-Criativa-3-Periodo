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
            
            <p>Nome Paciente : Paciente Teste</p>
            <p>Data Nascimento : dd/mm/YYYY</p>
            <p>Sexo : Masculino/Feminino </p>

          </div>

          <div class="doctor_info">

            <p>Nome medico : Medico Teste </p>
            <p>Data avaliação : dd/mm/YYYY </p>
            <p>Indicação : Fazer teste genetico </p>

          </div>


        </div>

        <div class="report_data_container">

          <div class="report_conclusion_container">

            <div class="report_conclusion"">
              
              <p>Observações :</p>

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
                  Sintoma 1
                </td>
                <td class="symptoms_table_cell">
                  Sim/Nao
                </td>
              </tr>

              <tr class="symptoms_table_row">
                <td class="symptoms_table_cell">
                  Sintoma 2
                </td>
                <td class="symptoms_table_cell">
                  Sim/Nao
                </td>
              </tr>

              <tr class="symptoms_table_row">
                <td class="symptoms_table_cell">
                  Sintoma 3
                </td>
                <td class="symptoms_table_cell">
                  Sim/Nao
                </td>
              </tr>

              <tr class="symptoms_table_row">
                <td class="symptoms_table_cell">
                  Sintoma 4
                </td>
                <td class="symptoms_table_cell">
                  Sim/Nao
                </td>
              </tr>

              <tr class="symptoms_table_row">
                <td class="symptoms_table_cell">
                  Sintoma 5
                </td> 
                <td class="symptoms_table_cell">
                  Sim/Nao
                </td>
              </tr>

              <tr class="symptoms_table_row">
                <td class="symptoms_table_cell">
                  Sintoma 6
                </td>
                <td class="symptoms_table_cell">
                  Sim/Nao
                </td>
              </tr>

              <tr class="symptoms_table_row">
                <td class="symptoms_table_cell">
                  Sintoma 7
                </td>
                <td class="symptoms_table_cell">
                  Sim/Nao
                </td>
              </tr>

              <tr class="symptoms_table_row">
                <td class="symptoms_table_cell">
                  Sintoma 8
                </td>
                <td class="symptoms_table_cell">
                  Sim/Nao
                </td>
              </tr>

              <tr class="symptoms_table_row">
                <td class="symptoms_table_cell">
                  Sintoma 9
                </td>
                <td class="symptoms_table_cell">
                  Sim/Nao
                </td>
              </tr>

              <tr class="symptoms_table_row">
                <td class="symptoms_table_cell">
                  Sintoma 10
                </td>
                <td class="symptoms_table_cell">
                  Sim/Nao
                </td>
              </tr>

              <tr class="symptoms_table_row">
                <td class="symptoms_table_cell">
                  Sintoma 11
                </td>
                <td class="symptoms_table_cell">
                  Sim/Nao
                </td>
              </tr>

              <tr class="symptoms_table_row">
                <td class="symptoms_table_cell">
                  Sintoma 12
                </td>
                <td class="symptoms_table_cell">
                  Sim/Nao
                </td>
              </tr>

            </table>

          </div>

        </div>

        <button class="base_button" style="margin-top: 15px;">

          Imprimir

        </button>

      </div>
  

  `

}