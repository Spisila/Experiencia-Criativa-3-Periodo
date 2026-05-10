import './login_admin.css'

export function init_login_admin_page() {

  const container = document.querySelector<HTMLDivElement>('#app');

  if (container === null) {
    return;
  }

  container.innerHTML =  /* html */`
    <div class="center">
      <div class="login_with_credentials">
  
        <h1>LOGIN COM CREDENCIAIS </h1>
  
        <input type="text" placeholder="Email" />
        <input type="password" placeholder="Senha" />
        <button id="login_button">Login</button>
  
      </div>
  
      <div class="login_with_qr">
        <h1>SCAN QR CODE</h1>
  
        <div class="placeholder_QR">
  
          <p1>QR CODE PLACEHOLDER</p1>
  
        </div>
  
      </div>
  
    </div>
  `

}