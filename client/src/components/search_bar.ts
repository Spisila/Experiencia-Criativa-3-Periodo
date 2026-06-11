
import { supabase } from "../lib/supabase";
import { navigate_to } from "../main";
import type { Usuario } from "./table_functions";

export function search_users(container: HTMLElement, table: HTMLTableElement) {

  const search_input = container.querySelector<HTMLButtonElement>('#search_bar');
  const search_button = container.querySelector<HTMLButtonElement>('#search_button');

  search_button?.addEventListener('click', async (_MouseEvent) => {

    if (search_input?.value) {

      console.log("Pesquisando por: " + search_input.value)

      const { data: usuariosBuscados, error: pegarPacienteBuscadoError } = await supabase
        .from('usuario').select('id').or(`nome.ilike.${search_input.value}%, cpf.ilike.${search_input.value}%`);

      if (pegarPacienteBuscadoError) {
        console.log("Erro ao pesquisar paciente")
        console.log(pegarPacienteBuscadoError)
        return;
      }

      if (!usuariosBuscados || usuariosBuscados.length === 0) {
        console.log("Nenhum usuario encontrado com esse nome ou cpf")
        return;
      }

      const linhas = container.querySelectorAll('.reports_table_row')

      linhas.forEach(linha => {
        linha.remove();
      })

      console.log(usuariosBuscados)

      for (let i = 0; i < usuariosBuscados.length; i++) {

        const { data: usuarioEncontrado, error: pegarUsuarioEncontradoError } = await supabase
          .from('usuario').select('*').eq('id', usuariosBuscados.at(i)!.id).eq('permissao', 'medico').single();

        if (pegarUsuarioEncontradoError) {
          console.log("Erro ao pegar usuario encontrado")
          console.log(pegarUsuarioEncontradoError)
          continue;
        }

        if (usuarioEncontrado) {
          const usuarioArray: Usuario[] = [{
            id: usuarioEncontrado.id,
            nome: usuarioEncontrado.nome,
            cpf: usuarioEncontrado.cpf
          }]

        }
      }

    }

  })

}

function go_to_user_page(user_id: string) {

  navigate_to("/perfil_usuario/" + user_id)

}
