
import { supabase } from "../lib/supabase";

export async function get_auth_user() {

  const { data: user_session } = await supabase.auth.getSession();

  if (!user_session) {
    console.log("Usuario não autenticado")
    return;
  }

  return user_session;

}