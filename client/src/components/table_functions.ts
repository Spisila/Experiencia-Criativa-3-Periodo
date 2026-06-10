export interface sort_table_options<T> {
  button: HTMLButtonElement | null;
  fetch_data: (ascendente: boolean) => Promise<T[] | null>;
  render_data: (data: T[]) => void;
}


export function setup_table_sorting<T extends object>(
  container: HTMLDivElement,
  button: HTMLButtonElement | null,
  fetch_data: (ascendente: boolean) => Promise<T[] | null>,
  render_data: (data: T[]) => void,
) {

  if (!button) {

    return;

  }

  let ascendente = true;

  button.addEventListener('click', async () => {

    clear_table(container);

    const dados = await fetch_data(ascendente);

    if (dados && dados.length > 0) {
      render_data(dados);
    }

    ascendente = !ascendente;
  });
}

export function setup_fill_table<T extends object>(row: T[], table: HTMLTableElement, botao_callback: (id: string) => void) {

  for (let i = 0; i < row.length; i++) {

    const current_item = row[i];
    const column = Object.keys(current_item);
    const column_count = column.length;

    const linha = document.createElement('tr');

    if (i % 2 == 0) {
      linha.className = "reports_table_row"
    }
    else {
      linha.className = "reports_table_row_darker"
    }


    table.appendChild(linha)

    for (let j = 0; j < column_count; j++) {

      const current_key = column[j];
      let current_value = (current_item as Record<string, any>)[current_key];

      if (current_key === 'data_nascimento') {
        current_value = new Date(current_value).toLocaleDateString('pt-BR');
      }

      if (current_key === 'data_avaliacao') {
        current_value = new Date(current_value).toLocaleString('pt-BR');
      }

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

export function update_page<T extends object>(
  container: HTMLDivElement,
  current_page_number: number,
  max_page: number,
  fetch_data: (p: number) => Promise<T[] | null>,
  render_data: (data: object[]) => void) {

  const pagina_anterior_button = container.querySelector<HTMLButtonElement>('#pagina_anterior');
  const pagina_proxima_button = container.querySelector<HTMLButtonElement>('#pagina_proxima');

  const current_page = container.querySelector<HTMLParagraphElement>('#current_page');

  pagina_anterior_button!.style.display = "none";
  pagina_proxima_button!.style.display = "none";

  if (max_page != 1) {
    pagina_proxima_button!.style.display = "flex";
  }

  pagina_anterior_button?.addEventListener('click', async () => {

    console.log(current_page_number)
    current_page_number--;

    if (current_page_number === 1) {
      pagina_anterior_button!.style.display = "none";
      pagina_proxima_button!.style.display = "flex";
    }
    else if (current_page_number > 1) {
      pagina_anterior_button!.style.display = "flex";
      pagina_proxima_button!.style.display = "flex";
    }
    else {
      pagina_anterior_button!.style.display = "none";
      pagina_proxima_button!.style.display = "flex";
    }

    current_page!.textContent = current_page_number.toString();

    clear_table(container);

    const dados = await fetch_data(current_page_number)

    if (dados) {
      render_data(dados);
    }

  });

  pagina_proxima_button?.addEventListener('click', async () => {

    console.log(current_page_number)

    current_page_number++;

    if (current_page_number < max_page) {
      pagina_proxima_button!.style.display = "flex";
      if (current_page_number > 1) {
        pagina_anterior_button!.style.display = "flex";
      }
    }
    else {
      pagina_proxima_button!.style.display = "none";
      pagina_anterior_button!.style.display = "flex";
    }

    current_page!.textContent = current_page_number.toString();

    clear_table(container);

    const dados = await fetch_data(current_page_number)

    if (dados) {
      render_data(dados);
    }

  });

}

export function get_max_pages(entradas: number, entradas_por_pagina: number): number {

  if (entradas == null) {
    return 0;
  }

  return Math.ceil(entradas / entradas_por_pagina)

}

export function clear_table(container: HTMLDivElement) {

  const linhas = container.querySelectorAll('.reports_table_row')
  const linhas_2 = container.querySelectorAll('.reports_table_row_darker')

  linhas.forEach(linha => {
    linha.remove();
  })

  linhas_2.forEach(linha => {
    linha.remove();
  })
}