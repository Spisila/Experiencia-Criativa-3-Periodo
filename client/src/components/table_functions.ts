import { supabase } from "../lib/supabase";
import { navigateTo } from "../main";

export interface Usuario {
  id: string,
  nome: string,
  cpf: string
}

export function encher_tabela_usuarios(usuarios: Usuario[], table: HTMLTableElement, botao_callback: (id: string) => void) {

  console.log(usuarios);

  for (let i = 0; i < usuarios.length; i++) {

    const linha = document.createElement('tr');
    linha.className = "reports_table_row"

    const nome = document.createElement('td');
    nome.textContent = usuarios.at(i)!.nome;
    nome.className = "reports_table_cell"

    const cpf = document.createElement('td');
    cpf.textContent = usuarios.at(i)!.cpf;
    cpf.className = "reports_table_cell"

    const botao_container = document.createElement('td');
    botao_container.className = "reports_table_cell"

    const botao_abrir_perfil_usuario = document.createElement("button");
    botao_abrir_perfil_usuario.textContent = "Abrir"
    botao_abrir_perfil_usuario.className = "base_table_button"

    botao_abrir_perfil_usuario.addEventListener('click', () => {
      botao_callback(usuarios.at(i)!.id)
    })

    table.appendChild(linha)

    linha.appendChild(nome)
    linha.appendChild(cpf)

    botao_container.appendChild(botao_abrir_perfil_usuario)
    linha.appendChild(botao_container)


  }


}

function go_to_user_page(user_id: string) {

  navigateTo("/perfil_usuario/" + user_id)

}

export function sort_table_by_name(container: HTMLElement, table: HTMLTableElement, ascendente: boolean) {

  const sort_by_user_name_button = container.querySelector<HTMLButtonElement>('#sort_by_user_name_button');

  sort_by_user_name_button?.addEventListener('click', async () => {

    const linhas = container.querySelectorAll('.reports_table_row')

    linhas.forEach(linha => {
      linha.remove();
    })

    const { data: usuarios, error: pegarUsuariosError } = await supabase
      .rpc('obter_usuarios_ordenados', {
        ascendente: ascendente
      });



    if (pegarUsuariosError) {
      console.log("Erro usuarios em ordem de nome");
      console.log(pegarUsuariosError)
    }

    if (usuarios) {
      encher_tabela_usuarios(usuarios, table, go_to_user_page)
    }

    ascendente = !ascendente;
  });
}

export interface Paciente {
  paciente_id: string,
  nome_paciente: string,
  data_nascimento: string,
  sexo: string,
  paciente_cpf: string
}

export function encher_tabela_pacientes(paciente: Paciente[], table: HTMLTableElement, botao_callback: (id: string) => void) {

  console.log(paciente)

  for (let i = 0; i < paciente.length; i++) {

    const linha = document.createElement('tr');
    linha.className = "reports_table_row"

    const nome_paciente = document.createElement('td');
    nome_paciente.textContent = paciente.at(i)!.nome_paciente;
    nome_paciente.className = "reports_table_cell"

    const data_nascimento = document.createElement('td');
    data_nascimento.textContent = new Date(paciente.at(i)!.data_nascimento).toLocaleString('pt-BR');
    data_nascimento.className = "reports_table_cell"

    const sexo = document.createElement('td');
    sexo.textContent = paciente.at(i)!.sexo;
    sexo.className = "reports_table_cell"

    const cpf = document.createElement('td');
    cpf.textContent = paciente.at(i)!.paciente_cpf;
    cpf.className = "reports_table_cell"

    const botao_container = document.createElement('td');
    botao_container.className = "reports_table_cell"

    const botao_criar_novo_relatorio = document.createElement("button");
    botao_criar_novo_relatorio.textContent = "Abrir"
    botao_criar_novo_relatorio.className = "base_table_button"

    botao_criar_novo_relatorio.addEventListener('click', (_MouseEvent) => {
      botao_callback(paciente.at(i)!.paciente_id)
    })

    table.appendChild(linha)

    linha.appendChild(nome_paciente)
    linha.appendChild(data_nascimento)
    linha.appendChild(sexo)
    linha.appendChild(cpf)

    botao_container.appendChild(botao_criar_novo_relatorio)
    linha.appendChild(botao_container)


  }

}

export interface sort_table_options<T> {
  button: HTMLButtonElement | null;
  fetch_data: (ascendente: boolean) => Promise<T[] | null>;
  render_data: (data: T[]) => void;
}


export function setup_table_sorting<T extends object>({
  button,
  fetch_data,
  render_data
}: sort_table_options<T>) {

  if (!button) {

    return;

  }

  let ascendente = true;

  button.addEventListener('click', async () => {

    const linhas = document.querySelectorAll('.reports_table_row');

    linhas.forEach(linha => {
      linha.remove()
    });

    const dados = await fetch_data(ascendente);

    if (dados && dados.length > 0) {
      render_data(dados);
    }

    ascendente = !ascendente;
  });
}

// Recebe os dados e enche a tabela
export function setup_fill_table<T extends object>(row: T[], table: HTMLTableElement, botao_callback: (id: string) => void) {

  for (let i = 0; i < row.length; i++) {

    const current_item = row[i];
    const column = Object.keys(current_item);
    const column_count = column.length;

    const linha = document.createElement('tr');
    linha.className = "reports_table_row"

    table.appendChild(linha)

    for (let j = 0; j < column_count; j++) {

      const current_key = column[j];
      const current_value = (current_item as Record<string, any>)[current_key];

      if (j == column_count - 1) {

        const botao_container = document.createElement('td');
        botao_container.className = "reports_table_cell"

        const botao_criar_novo_relatorio = document.createElement("button");
        botao_criar_novo_relatorio.textContent = "Abrir"
        botao_criar_novo_relatorio.className = "base_table_button"

        botao_criar_novo_relatorio.addEventListener('click', (_MouseEvent) => {
          botao_callback(current_value)
        })

        botao_container.appendChild(botao_criar_novo_relatorio)
        linha.appendChild(botao_container)

        continue;

      }

      let cell = document.createElement('td');
      cell.textContent = current_value;
      cell.className = "reports_table_cell"

      linha.appendChild(cell)

    }

  }

}

// export async function setup_pages<T extends object>(
//   container : HTMLDivElement,
//   fetch_data : () => Promise<T[] | null>,
//   render_data : () => void
// ) {

//   const pagina_anterior_button = container.querySelector<HTMLButtonElement>('#pagina_anterior');
//   const pagina_proxima_button = container.querySelector<HTMLButtonElement>('#pagina_proxima');
  
//   const current_page = container.querySelector<HTMLParagraphElement>('#current_page');
  
//   let pagina = 1;

//   let current_from;
//   let current_to;
  
//   pagina_anterior_button!.style.display = "none";
  
//   pagina_anterior_button?.addEventListener('click', async () => {
  
//     if (pagina === 1) {
//       pagina_anterior_button!.style.display = "block";
//     }
//     else if (pagina > 1) {
//       pagina--;
//       pagina_anterior_button!.style.display = "none";
//       pagina_proxima_button!.style.display = "block";
//     }
//     else {
//       pagina_anterior_button!.style.display = "none";
//       pagina_proxima_button!.style.display = "block";
//     }
  
//     current_page!.textContent = pagina.toString();
  
//     current_from = (pagina - 1) * 24;
//     current_to = (pagina * 24) - 1
  
//     const data = await get_pacientes('nome', true, user_id, current_from, current_to);
  
//     clear_table(container)
  
//     setup_fill_table(data, table, criar_novo_atendimento)
  
  
//   });
  
//   pagina_proxima_button?.addEventListener('click', async () => {
  
//     pagina++;
//     console.log("pagina: " + pagina)
  
//     if (pacientes_entradas > 24) {
//       pagina_proxima_button!.style.display = "block";
//     }
//     else {
//       pagina_proxima_button!.style.display = "none";
//       pagina_anterior_button!.style.display = "block";
//     }
  
//     current_page!.textContent = pagina.toString();
  
//     current_from = (pagina - 1) * 24;
//     current_to = (pagina * 24) - 1
  
//     const data = await get_pacientes('nome', true, user_id, current_from, current_to);
  
//     clear_table(container)
  
//     setup_fill_table(data, table, criar_novo_atendimento)
  
//   });
  
// }




// Tem que retornar um valor pro limite que vai ser passado pra outra função la
export function switch_page(
  container: HTMLDivElement,
  entries_per_page: number) {

  const contador_pagina = container.querySelector<HTMLParagraphElement>('#current_page')
  const antes_button = container.querySelector<HTMLButtonElement>('#pagina_anterior')
  const proxima_button = container.querySelector<HTMLButtonElement>('#pagina_proxima')

  let pagina = 1;

  if (!contador_pagina) { return 0; }

  antes_button?.addEventListener('click', () => {
    if (pagina > 1) {
      pagina = pagina - 1;
      contador_pagina.textContent = pagina.toString();
    }
  });

  proxima_button?.addEventListener('click', () => {
    pagina = pagina + 1;
    contador_pagina.textContent = pagina.toString();
  });

  const pagina_atual = parseInt(contador_pagina.textContent || "1");

  const nova_pagina = pagina_atual + pagina;

  if (nova_pagina === 1) {
    antes_button!.style.display = "none";
  }
  else {
    antes_button!.style.display = "block";
  }

  if (nova_pagina < 1) {
    contador_pagina.textContent = "1";
    return 0;
  }
  contador_pagina.textContent = (nova_pagina).toString();

  const linhas = container.querySelectorAll('.reports_table_row')

  linhas.forEach(linha => {
    linha.remove();
  })

  // if (data.length < entries_per_page) {
  //   proxima_button!.style.display = "none";
  // }
  // else {
  //   proxima_button!.style.display = "block";
  // }

  return nova_pagina * entries_per_page;
}

export function clear_table(container: HTMLDivElement) {

  const linhas = container.querySelectorAll('.reports_table_row')

  linhas.forEach(linha => {
    linha.remove();
  })
}