import './cadastro_medico.css'
import "../../components/base_button.css"
import "../../components/input_boxes.css"

import { supabase } from "../../../../server/src/lib/supabase"

export async function init_cadastro_medico_page() 
{

  const container = document.querySelector<HTMLDivElement>('#app');

  if (container === null) 
  {
    return;
  }

  container.innerHTML = /* html */`
      
    <div class="center_container">

      <div class="title_container">

        <h1>Cadastro</h1>

      </div>

      <div class="cadastro_container">

        <h2>Cadastro de Usuário</h2>

        <input type="text" class="base_input_text" placeholder="Nome" id="name" />
        <input type="email" class="base_input_text" placeholder="Email" id="email" />
        <input type="password" class="base_input_text" placeholder="Senha" id="password" />
        <button id="register" class="base_button">Registrar</button>

      </div>

    </div>
  

  `

  const { data, error } = await supabase.from("usuario").insert({nome : "Socorro", email : "Meudeus", senha: "DoCeu", perfil:"Ajuda"})


  if (error) 
  {
    console.log("ERRO = ", error)
    return;
  }

  console.log("CADASTRO");


}