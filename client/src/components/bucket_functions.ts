import { supabase } from "../lib/supabase";

export async function deletar_fotos_avaliacao(
  usuario_id: string,
  avaliacao_id: string
) {
  const pasta = `${usuario_id}/${avaliacao_id}`;

  const { data: arquivos, error: list_error } = await supabase.storage
    .from("fotos_pacientes")
    .list(pasta);

  if (list_error) {
    throw list_error;
  }

  
  if (!arquivos?.length) return;

  const caminhos = arquivos.map(
    arquivo => `${pasta}/${arquivo.name}`
  );

  console.log("Arquivos encontrados:", arquivos);
  console.log("Paths:", caminhos);

  const {data: delete_fotos_data, error: deleteError } = await supabase.storage
    .from("fotos_pacientes")
    .remove(caminhos);

  
  console.log("REMOVE DATA:", delete_fotos_data);
  console.log("REMOVE ERROR:", deleteError);

}