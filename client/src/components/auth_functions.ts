
import { supabase } from "../lib/supabase";

export async function get_user_session() {

  const { data: user_session } = await supabase.auth.getSession();

  if (!user_session) {
    console.log("Usuario não autenticado")
    return;
  }

  return user_session;

}

export async function get_user_id() {

  const { data: user_session } = await supabase.auth.getSession();

  if (!user_session) {
    console.log("Usuario não autenticado")
    return "";
  }

  return String(user_session.session?.user.id);

}

// TODO: Função de get_acess_token
// TODO: Função de get_permissao