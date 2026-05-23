import { navigateTo } from "../main";
import { supabase } from "../lib/supabase";

const hide_logout_button_path = [
  '/',
  '/login_total',
];

export function should_hide_logout_button(path: string) {
  if (hide_logout_button_path.includes(path)) {
    atualizar_botao_log_out("escondido");
  }
  else {
    atualizar_botao_log_out("visivel");
  }
}

export function atualizar_botao_log_out(estado: "escondido" | "visivel") {

  const botao_log_out = document.querySelector<HTMLButtonElement>('#btn-log-out');

  if (!botao_log_out) {
    console.log("Botão log out nao existe");
    return;
  }

  if (estado == "visivel") {
    botao_log_out.style.display = 'block';
  }
  else if (estado == "escondido") {
    botao_log_out.style.display = 'none';
  }
  else {
    console.log("estado de botao desconhecido");
  }

}

export async function log_out() {


  const { data: userAntes, error: userAntesError } = await supabase.auth.getUser();

  if (userAntesError) {
    console.log("Erro usuario nao achado em logout");
    console.log(userAntesError);
    return;
  }

  console.log(userAntes)

  const { error: logOutError } = await supabase.auth.signOut();

  if (logOutError) {
    console.log("Erro de log out")
    console.log(logOutError);
    return;
  }

  console.log("Log out");

  atualizar_botao_log_out("escondido")

  navigateTo('/login_total')

  const { data: userDepois } = await supabase.auth.getUser();

  console.log("User depois")
  console.log(userDepois)

}