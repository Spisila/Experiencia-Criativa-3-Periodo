import './relatorios_admin.css'
import "../../components/base_button.css"
import "../../components/input_boxes.css"

import { supabase } from "../../lib/supabase"
import { navigateTo } from '../../main';

export async function init_relatorios_admin_page() {

  const container = document.querySelector<HTMLDivElement>('#app');

  if (container === null) {
    return;
  }

  container.innerHTML = /* html */`
      
    <div class="center_container">

      <div class="title_container">

        <h1>Relatorios Administrador</h1>

      </div>
      
    </div>
  

  `

}