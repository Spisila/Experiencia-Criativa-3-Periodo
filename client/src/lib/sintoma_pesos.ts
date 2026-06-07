import { supabase } from "./supabase";

export const sintomas_atuais_masculinas: Record<string, number> = {
  'deficiencia_intelectual': 0.0,
  'face_orelhas_alongadas': 0,
  'macroorquidismo': 0,
  'hipermobilidade_articular': 0,
  'dificuldade_de_aprendizagem': 0,
  'deficit_de_atencao': 0,
  'movimentos_repetitivos': 0,
  'atraso_na_fala': 0,
  'hiperatividade': 0,
  'evita_contato_visual': 0,
  'evita_contato_fisico': 0,
  'agressividade': 0,
};

export const sintomas_atuais_feminino: Record<string, number> = {
  'deficiencia_intelectual': 0,
  'face_orelhas_alongadas': 0,
  'macroorquidismo': 0,
  'hipermobilidade_articular': 0,
  'dificuldade_de_aprendizagem': 0,
  'deficit_de_atencao': 0,
  'movimentos_repetitivos': 0,
  'atraso_na_fala': 0,
  'hiperatividade': 0,
  'evita_contato_visual': 0,
  'evita_contato_fisico': 0,
  'agressividade': 0
};

export async function carregar_pesos() {

  const { data, error } = await supabase.from("sintoma").select('*');

  if (error) {
    console.log("ERRO = " + error)
    return;
  }

  const chaves_masculino = Object.keys(sintomas_atuais_masculinas);
  const chaves_feminino = Object.keys(sintomas_atuais_feminino);

  for (let i = 0; i < data.length; i++) {

    sintomas_atuais_masculinas[chaves_masculino[i]] = data.at(i).peso_masculino;
    sintomas_atuais_feminino[chaves_feminino[i]] = data.at(i).peso_feminino;

  }

}

export function calcular_score_final(tem_sintomas: Record<string, boolean>, is_male: boolean) {

  const sintomas_selecionados = Object.keys(tem_sintomas)

  let score = 0;

  for (let i = 0; i < sintomas_selecionados.length; i++) {

    if (is_male == true) {

      if (tem_sintomas[sintomas_selecionados[i]] == true) {

        score += sintomas_atuais_masculinas[sintomas_selecionados[i]];

      }

    } else {

      if (tem_sintomas[sintomas_selecionados[i]] == true) {

        score += sintomas_atuais_feminino[sintomas_selecionados[i]];

      }

    }

  }

  return score;

}

export function retornar_sintomas_selecionados(tem_sintomas: Record<string, boolean>, is_male: boolean) {

  const sintomas_selecionados = Object.keys(tem_sintomas)

  let id_sintomas_selecionados = []

  for (let i = 0; i < sintomas_selecionados.length; i++) {

    if (is_male == true) {

      if (tem_sintomas[sintomas_selecionados[i]] == true) {

        id_sintomas_selecionados.push(i)

      }

    } else {

      if (tem_sintomas[sintomas_selecionados[i]] == true) {

        id_sintomas_selecionados.push(i)

      }

    }

  }

  return id_sintomas_selecionados;

}