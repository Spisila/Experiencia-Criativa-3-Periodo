import './perfil_paciente.css'
import "../../components/base_button.css"
import "../../components/input_boxes.css"

import { supabase } from "../../lib/supabase"
import { trigger_notification_popup } from '../../components/notification_popup';

import { cadastro_usuario_schema } from '../../schemas/cadastro_usuario_schema';
import { navigateTo } from '../../main';
import { deletar_fotos_avaliacao } from '../../components/bucket_functions';

export async function init_perfil_paciente_page() {

  const container = document.querySelector<HTMLDivElement>('#app');

  if (container === null) {
    return;
  }

  container.innerHTML = /* html */`
      
    <div class="paciente_perfil_container">

      <div class="paciente_perfil_inputs">

        <div class="paciente_inputs"> 
        
          <p> Nome do paciente: </p>
          <input type="text" class="base_small_input_text" placeholder="Nome" id="name"/>
          <p> Data de Nascimento: </p>
          <input type="date" class="base_small_input_text" placeholder="Data de Nascimento" id="data_nascimento"/>
          <p> Sexo: </p>
          <input type="text" class="base_small_input_text" placeholder="Sexo" id="sexo"/>
          <p> CPF: </p>
          <input type="text" class="base_small_input_text" placeholder="CPF" id="cpf" maxlength="11"/>
        
        </div>

        <div class="responsavel_inputs"> 
        
          <p> Nome da mãe: </p>
          <input type="text" class="base_small_input_text" placeholder="Nome da mãe" id="nome_mae"/>
          <p> Nome do responsável: </p>
          <input type="text" class="base_small_input_text" placeholder="Nome do responsável" id="nome_responsavel"/>
          <p> CPF do responsável: </p>
          <input type="text" class="base_small_input_text" placeholder="CPF do responsável" id="cpf_responsavel" maxlength="11"/>
        
        </div>

        <div class="cidade_inputs"> 
        
          <p> País: </p>
          <input type="text" class="base_small_input_text" placeholder="País" id="pais"/>
          <p> Estado: </p>
          <input type="text" class="base_small_input_text" placeholder="Estado" id="estado"/>
          <p> Cidade: </p>
          <input type="text" class="base_small_input_text" placeholder="Cidade" id="cidade"/>
          <p> Telefone: </p>
          <input type="text" class="base_small_input_text" placeholder="Telefone" id="telefone" maxlength="10"/>
        
        </div>
        
      </div>
        
      <div class="paciente_perfil_buttons"> 
      
        <button id="edit_button" class="base_button">Editar</button>
        <button id="nova_avaliacao_button" class="base_button">Nova avaliação</button>
        <button id="delete_button" class="base_button">Deletar</button>
        
      </div>

    </div>
  

  `

  const paciente_id = window.location.pathname.replace("/perfil_paciente/", "")

  const { data: dadosPaciente, error: errorPaciente } = await supabase.from('paciente').select('*').eq('id', paciente_id).single();

  if (errorPaciente) {
    console.log(errorPaciente);
    trigger_notification_popup("Erro ao carregar dados do paciente");
    return;
  }

  const name_input = container.querySelector<HTMLInputElement>('#name');
  const data_nascimento_input = container.querySelector<HTMLInputElement>('#data_nascimento');
  const sexo_input = container.querySelector<HTMLInputElement>('#sexo');
  const cpf_input = container.querySelector<HTMLInputElement>('#cpf');
  const nome_mae_input = container.querySelector<HTMLInputElement>('#nome_mae');
  const nome_responsavel_input = container.querySelector<HTMLInputElement>('#nome_responsavel');
  const cpf_responsavel_input = container.querySelector<HTMLInputElement>('#cpf_responsavel');
  const pais_input = container.querySelector<HTMLInputElement>('#pais');
  const estado_input = container.querySelector<HTMLInputElement>('#estado');
  const cidade_input = container.querySelector<HTMLInputElement>('#cidade');
  const telefone_input = container.querySelector<HTMLInputElement>('#telefone');

  toggle_editar(true);

  name_input!.value = dadosPaciente.nome;
  data_nascimento_input!.value = dadosPaciente.data_nascimento;
  sexo_input!.value = dadosPaciente.sexo;
  cpf_input!.value = dadosPaciente.cpf;
  nome_mae_input!.value = dadosPaciente.nome_mae;
  nome_responsavel_input!.value = dadosPaciente.nome_responsavel;
  cpf_responsavel_input!.value = dadosPaciente.cpf_responsavel;
  pais_input!.value = dadosPaciente.pais;
  estado_input!.value = dadosPaciente.estado;
  cidade_input!.value = dadosPaciente.cidade;
  telefone_input!.value = dadosPaciente.telefone;

  const edit_button = container.querySelector<HTMLButtonElement>('#edit_button');
  const nova_avaliacao_button = container.querySelector<HTMLButtonElement>('#nova_avaliacao_button');
  const delete_button = container.querySelector<HTMLButtonElement>('#delete_button');

  let editando = false;

  function toggle_editar(ativo: boolean) {

    name_input!.disabled = ativo;
    data_nascimento_input!.disabled = ativo;
    sexo_input!.disabled = ativo;
    cpf_input!.disabled = ativo;
    nome_mae_input!.disabled = ativo;
    nome_responsavel_input!.disabled = ativo;
    cpf_responsavel_input!.disabled = ativo;
    pais_input!.disabled = ativo;
    estado_input!.disabled = ativo;
    cidade_input!.disabled = ativo;
    telefone_input!.disabled = ativo;

  }

  edit_button?.addEventListener('click', async (_event) => {

    if (editando == false) {
      toggle_editar(false);
      edit_button.textContent = "Salvar";
      editando = true;
      nova_avaliacao_button!.style.display = "none";
      delete_button!.style.display = "none";
    }
    else {
      toggle_editar(true);
      edit_button.textContent = "Editar";
      editando = false;
      nova_avaliacao_button!.style.display = "flex";
      delete_button!.style.display = "flex";

      const { error: erro_update_paciente } = await supabase.from("paciente").update({
        nome: name_input?.value,
        data_nascimento: data_nascimento_input?.value,
        sexo: sexo_input?.value,
        cpf: cpf_input?.value,
        nome_mae: nome_mae_input?.value,
        nome_responsavel: nome_responsavel_input?.value,
        cpf_responsavel: cpf_responsavel_input?.value,
        pais: pais_input?.value,
        estado: estado_input?.value,
        cidade: cidade_input?.value,
        telefone: telefone_input?.value,
      }).eq('id', paciente_id)

      if (erro_update_paciente) {
        console.log("Erro update paciente = " + erro_update_paciente);
        trigger_notification_popup("Erro ao atualizar paciente");
        return;
      }

      trigger_notification_popup("Paciente editado com sucesso");

    }

  });

  delete_button?.addEventListener('click', async (_event) => {

    const confirmar = confirm("Tem certeza que deseja deletar este paciente?");

    if (!confirmar) return;

    const { data: usuario_paciente } = await supabase
      .from("paciente")
      .select("usuario_id")
      .eq("id", paciente_id)
      .single();

    const { data: paciente_avaliacoes } = await supabase
      .from("avaliacao")
      .select("id")
      .eq("paciente_id", paciente_id);

    for (let i = 0; i < paciente_avaliacoes!.length; i++) {
      await deletar_fotos_avaliacao(usuario_paciente?.usuario_id, paciente_avaliacoes?.at(i)?.id)
    }

    const { error: delete_paciente_error } = await supabase
      .from("paciente")
      .delete()
      .eq("id", paciente_id);

    if (delete_paciente_error) {
      trigger_notification_popup("Erro ao deletar paciente");
      console.error(delete_paciente_error);
      return;
    }

    trigger_notification_popup("Paciente deletado com sucesso");

    await new Promise((resolve) => setTimeout(resolve, 2000));
    navigateTo("/lista_pacientes");
  });

  function criar_novo_atendimento(paciente_id: string) {

    navigateTo("/nova_avaliacao")
    window.history.pushState(null, '', "/nova_avaliacao/" + paciente_id);

  }

  nova_avaliacao_button?.addEventListener('click', () => criar_novo_atendimento(paciente_id));

}