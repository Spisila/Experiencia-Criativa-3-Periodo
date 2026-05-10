import './style.css'

import { init_principal_page } from './pages/principal/principal.ts';
import { init_login_normal_page } from './pages/login_normal/login_normal.ts'
import { init_login_admin_page } from './pages/login_admin/login_admin.ts';
import { init_cadastro_medico_page } from './pages/cadastro_medico/cadastro_medico.ts';

type RenderFunction = (container: HTMLElement) => void;

const routes: Record<string, RenderFunction> = {
    '/': init_principal_page,
    '/login_medico': init_login_normal_page,
    '/login_admin': init_login_admin_page,
    '/cadastro_medico': init_cadastro_medico_page
};

export function navigateTo(url: string) {
    window.history.pushState(null, '', url);
    handleRouting();
}

function handleRouting() {
    const path = window.location.pathname;
    const render = routes[path] || routes['/'];
    const app = document.querySelector<HTMLDivElement>('#app')!;
    
    app.innerHTML = ''; 
    render(app);       
}

window.addEventListener('popstate', handleRouting);
window.addEventListener('DOMContentLoaded', handleRouting);
