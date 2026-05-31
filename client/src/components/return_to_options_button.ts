import { supabase } from "../lib/supabase";
import { navigateTo } from "../main";

const show_options_button_path = [
  '/cadastro_paciente',
  '/cadastro_medico',
  '/cadastro_admin',
  '/lista_usuarios',
  '/lista_pacientes',
  '/relatorios_usuario',
  '/relatorios_admin',
  '/relatorio',
  '/nova_avaliacao'
];

export async function return_to_options() {

  const { data: user_session, error } = await supabase.auth.getSession();

  if (error) {
    console.log("Erro em retornar a opçoes = ");
    console.log(error);
    return;
  }

  if (!user_session.session) {
    return;
  }

  const role = user_session.session?.user.user_metadata.perfil

  if (role == "administrador") {
    navigateTo("/opcoes_admin");
  }
  else if (role == "medico") {
    navigateTo('/opcoes_usuario');
  }
  else {
    console.log("Role nao conhecida");
  }
}

function atualizar_botao_voltar(estado: "escondido" | "visivel") {

  const return_button = document.querySelector<HTMLButtonElement>('#btn-back');

  if (!return_button) {
    console.log("Botão voltar nao existe");
    return;
  }

  if (estado == "visivel") {
    return_button.style.display = 'block';
  }
  else if (estado == "escondido") {
    return_button.style.display = 'none';
  }
  else {
    console.log("estado de botao desconhecido");
  }

}

export function should_hide_return_button(path: string) {

  if (show_options_button_path.includes(path)
    || path.startsWith("/relatorio/")
    || path.startsWith("/nova_avaliacao/")) {
    atualizar_botao_voltar("visivel");
  }
  else {
    atualizar_botao_voltar("escondido");
  }

}