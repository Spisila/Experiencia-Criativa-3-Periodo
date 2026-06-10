import './perfil_usuario.css'
import "../../components/base_button.css"
import "../../components/input_boxes.css"

import { supabase } from "../../lib/supabase"
import { trigger_notification_popup } from '../../components/notification_popup';

import { cadastro_usuario_schema } from '../../schemas/cadastro_usuario_schema';
import { navigateTo } from '../../main';
import { get_auth_user } from '../../components/auth_functions';

export async function init_perfil_usuario_page() {

  const container = document.querySelector<HTMLDivElement>('#app');

  if (container === null) {
    return;
  }

  container.innerHTML = /* html */`
      
    <div class="paciente_perfil_container">

      <div class="paciente_perfil_inputs">

        <div> 
        
          <p> Nome: </p>
          <input type="text" class="base_small_input_text" placeholder="Nome" id="name"/>
          <p> CPF: </p>
          <input type="text" class="base_small_input_text" placeholder="CPF" id="cpf"/>
        
        </div>
        
      </div>
        
      <div class="paciente_perfil_buttons"> 
      
        <button id="edit_button" class="base_button">Editar</button>
        <button id="delete_button" class="base_button">Deletar</button>
        
      </div>

    </div>
  

  `

  const user_session = await get_auth_user()

  const permissao = user_session?.session?.user.user_metadata.perfil

  const edit_button = container.querySelector<HTMLButtonElement>('#edit_button');
  const delete_button = container.querySelector<HTMLButtonElement>('#delete_button');

  if (permissao == 'medico') {
    delete_button!.style.display == 'none'
    delete_button?.remove()
  }

  const usuario_id = window.location.pathname.replace("/perfil_usuario/", "")

  const { data: dadosUsuario, error: errorUsuario } = await supabase.from('usuario').select('*').eq('id', usuario_id).single();

  if (errorUsuario) {
    console.log(errorUsuario);
    trigger_notification_popup("Erro ao carregar dados do usuario");
    return;
  }

  const name_input = container.querySelector<HTMLInputElement>('#name');
  const cpf_input = container.querySelector<HTMLInputElement>('#cpf');


  toggle_editar(true);

  name_input!.value = dadosUsuario.nome;
  cpf_input!.value = dadosUsuario.cpf;


  let editando = false;

  function toggle_editar(ativo: boolean) {

    name_input!.disabled = ativo;
    cpf_input!.disabled = ativo;

  }

  edit_button?.addEventListener('click', async (_event) => {

    if (editando == false) {
      toggle_editar(false);
      edit_button.textContent = "Salvar";
      editando = true;
      delete_button!.style.display = "none";
    }
    else {
      toggle_editar(true);
      edit_button.textContent = "Editar";
      editando = false;
      delete_button!.style.display = "flex";

      const { error: erro_update_usuario } = await supabase.from("usuario").update({
        nome: name_input?.value,
        cpf: cpf_input?.value
      }).eq('id', usuario_id)

      if (erro_update_usuario) {
        console.log("Erro update usuario = " + erro_update_usuario);
        trigger_notification_popup("Erro ao atualizar usuario");
        return;
      }

      trigger_notification_popup("Usuario editado com sucesso");

    }

  });

  delete_button?.addEventListener('click', async (_event) => {

    const confirmar = confirm("Tem certeza que deseja deletar este usuario?");

    if (!confirmar) return;

    const { error } = await supabase
      .from("usuario")
      .delete()
      .eq("id", usuario_id);

    if (error) {
      trigger_notification_popup("Erro ao deletar usuario");
      console.error(error);
      return;
    }

    trigger_notification_popup("Usuario deletado com sucesso");

    navigateTo("/lista_usuarios");
  });


}