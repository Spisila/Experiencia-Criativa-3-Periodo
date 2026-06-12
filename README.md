# SindromeX

Aplicação web SPA em TypeScript com Vite para gerenciamento de usuários, cadastro de pacientes, avaliações clínicas e geração de relatórios.

A interface usa autenticação Supabase, roteamento de páginas por perfil e suporte a tema claro/escuro.

---

## Visão geral

O projeto é composto por dois módulos principais:

- `client/` — front-end em Vite e TypeScript
- `server/` — backend em Express responsável pela criação de usuários com a chave de serviço do Supabase

A aplicação suporta funcionalidades de:

- login e controle de sessão
- cadastro de pacientes, médicos e administradores
- opções de usuário e administrador
- listagem de pacientes e usuários
- criação de nova avaliação clínica
- exibição de relatórios e relatórios detalhados
- tema claro/escuro e notificações de interface

## Tutoriais em vídeo

- **[Como instalar o projeto do GitHub](https://www.youtube.com/watch?v=fjbwkmoVXLQ)** — passo a passo de setup
- **[Como usar o site](https://www.youtube.com/watch?v=yug1R7DyS6Q)** — guia de navegação e funcionalidades

## Documentos do projeto

- **[Manual de instalação do projeto](Documento de instalação do projeto.pdf)** - passo a passo de setup

## Tecnologias usadas

- TypeScript
- Vite
- Express
- Supabase
- Zod
- Lucide Static
- CSS puro
- dotenv

## Requisitos

- **Node.js 18 ou superior** (recomendado: versão LTS mais recente)
- **npm** (instalado com Node.js)
- **Projeto Supabase ativo** com credenciais de API
- **Git** (para clonar o repositório)
- **VS Code** ou outra IDE de sua preferência

## Pré-requisitos de instalação

### 1. Instalar Node.js

1. Acesse [https://nodejs.org/](https://nodejs.org/) e baixe a versão LTS (18 ou superior)
2. Execute o instalador e siga as instruções
3. Verifique a instalação abrindo o terminal e digite:

```bash
node --version
npm --version
```

### 2. Instalar Git (opcional se clonar via interface)

1. Acesse [https://git-scm.com/install/windows](https://git-scm.com/install/windows)
2. Baixe e execute o instalador
3. Siga as instruções do instalador

### 3. IDE (Visual Studio Code recomendado)

1. Acesse [https://code.visualstudio.com/download](https://code.visualstudio.com/download)
2. Baixe a versão para seu sistema operacional
3. Execute o instalador e complete a configuração

## Clonando o repositório

1. Escolha a pasta onde deseja clonar o projeto
2. Abra o terminal nesta pasta (Shift + clique direito → "Abrir PowerShell aqui" no Windows)
3. Execute o comando:

```bash
git clone https://github.com/Spisila/Experiencia-Criativa-3-Periodo.git
```

4. Navegue até a pasta do projeto:

```bash
cd Experiencia-Criativa-3-Periodo
```

## Estrutura do projeto

```
Experiencia-Criativa-3-Periodo
├─ client
│  ├─ index.html
│  ├─ package.json
│  ├─ tsconfig.json
│  ├─ src
│  │  ├─ main.ts
│  │  ├─ style.css
│  │  ├─ components
│  │  │  ├─ auth_functions.ts
│  │  │  ├─ base_button.css
│  │  │  ├─ big_ass_button.css
│  │  │  ├─ bucket_functions.ts
│  │  │  ├─ input_boxes.css
│  │  │  ├─ logout_button.ts
│  │  │  ├─ notification_popup.ts
│  │  │  ├─ return_to_options_button.ts
│  │  │  ├─ switch_pair_button.ts
│  │  │  └─ tema_claro_escuro.ts
│  │  ├─ lib
│  │  │  ├─ sintoma_pesos.ts
│  │  │  └─ supabase.ts
│  │  ├─ pages
│  │  │  ├─ cadastro_admin
│  │  │  ├─ cadastro_medico
│  │  │  ├─ cadastro_paciente
│  │  │  ├─ lista_pacientes
│  │  │  ├─ lista_usuarios
│  │  │  ├─ login_total
│  │  │  ├─ nova_avaliacao
│  │  │  ├─ opcoes_admin
│  │  │  ├─ opcoes_usuario
│  │  │  ├─ perfil_paciente
│  │  │  ├─ perfil_usuario
│  │  │  ├─ relatorio
│  │  │  ├─ relatorios_admin
│  │  │  └─ relatorios_usuario
│  │  └─ schemas
│  │     ├─ cadastro_pacientes_schema.ts
│  │     ├─ cadastro_usuario_schema.ts
│  │     └─ login_schema.ts
├─ server
│  ├─ package.json
│  ├─ tsconfig.json
│  └─ src
│     └─ index.ts
├─ package.json
└─ README.md
```

## Configuração do ambiente

> ⚠️ **Importante**: As chaves de acesso devem ser mantidas em segredo. Nunca compartilhe o arquivo `.env`.

### 1. Renomear arquivos de configuração

Em cada pasta (`client/` e `server/`), existe um arquivo `.env.example`. Renomeie-o para `.env`:

### 2. Configurar credenciais do Supabase

#### Arquivo `client/.env`

Abra o arquivo e preencha com suas credenciais do Supabase:

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anonima
```

**Onde encontrar:**
- `VITE_SUPABASE_URL`: URL do seu projeto Supabase (enviada por email ou disponível no dashboard)
- `VITE_SUPABASE_ANON_KEY`: Chave ANON disponível em Settings → API → Project API keys

#### Arquivo `server/.env`

Abra o arquivo e preencha com suas credenciais do Supabase:

```env
PORT=3000
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_SERVICE_ROLE_KEY=sua-chave-service-role
```

**Onde encontrar:**
- `SUPABASE_URL`: Mesma URL do arquivo `client/.env`
- `SUPABASE_SERVICE_ROLE_KEY`: Chave Service Role disponível em Settings → API → Project API keys

## Instalação de dependências

> **Veja o [tutorial em vídeo de instalação](https://www.youtube.com/watch?v=fjbwkmoVXLQ)** para um guia visual passo a passo.

No diretório raiz do projeto, abra o terminal e execute:

```bash
npm run setup
```

Este comando instala todas as dependências de:

- raiz do projeto
- `client/`
- `server/`

O processo pode levar alguns minutos.

## Execução em desenvolvimento

> **Veja o [tutorial de uso do site](https://www.youtube.com/watch?v=yug1R7DyS6Q)** para saber como navegar e usar todas as funcionalidades.

### Iniciar o front-end e back-end

**Opção 1: Em dois terminais separados (recomendado)**

1. Abra um terminal na pasta `client/` e execute:

```bash
npm run dev
```

Você verá uma mensagem como:

```
VITE v8.0.11 ready in 325 ms

➜  Local:   http://localhost:5174/
```

Copie o link (ex: `http://localhost:5174/`) e abra em seu navegador.

2. Abra outro terminal na pasta `server/` e execute:

```bash
npm run dev
```

Você verá:

```
Servidor rodando em http://localhost:3000
```

**Opção 2: Em um único terminal (a partir da raiz)**

```bash
npm run dev
```

Isso inicia ambos os servidores simultaneamente.

### Rodar somente o front-end

```bash
npm run dev --prefix client
```

### Rodar somente o back-end

```bash
npm run dev --prefix server
```

## Rotas e permissões

### Rotas públicas

- `/login_total`

### Rotas para perfil `medico`

- `/cadastro_paciente`
- `/opcoes_usuario`
- `/lista_pacientes`
- `/relatorios_usuario`
- `/nova_avaliacao`
- `/perfil_paciente`

### Rotas para perfil `administrador`

- `/cadastro_medico`
- `/cadastro_admin`
- `/opcoes_admin`
- `/lista_usuarios`
- `/relatorios_admin`
- `/perfil_usuario`

### Rota de relatório detalhado

- `/relatorio` — disponível após autenticação e navegação interna

## Como o front-end funciona

- `client/src/main.ts` controla o roteamento interno e o acesso por perfil.
- `client/src/lib/supabase.ts` cria o cliente Supabase usando variáveis de ambiente.
- `client/src/components/tema_claro_escuro.ts` aplica o tema na página e salva a preferência em `localStorage`.
- As páginas em `client/src/pages/*` injetam o HTML no container principal e implementam a lógica de cada tela.
- Os schemas de validação Zod estão em `client/src/schemas/`.

## Como o back-end funciona

- `server/src/index.ts` expõe o endpoint `POST /api/usuarios`.
- O backend usa a chave `SUPABASE_SERVICE_ROLE_KEY` para criar novos usuários via Supabase Admin API.
- O servidor usa CORS e JSON body parser.

### Endpoint principal

`POST /api/usuarios`

Body esperado:

```json
{
  "email": "user@example.com",
  "password": "senha123",
  "perfil": "medico",
  "nome": "Nome do usuário",
  "cpf": "12345678901"
}
```

## Solução de problemas

### "Erro: variáveis de ambiente não encontradas"

- Verifique se os arquivos `.env` existem em `client/` e `server/`
- Confirme que as variáveis estão preenchidas com valores válidos
- Reinicie o servidor após editar o arquivo `.env`

### "Port 3000 already in use"

- A porta 3000 já está em uso por outro processo
- Mude o `PORT` no arquivo `server/.env` para outro valor (ex: 3001)

### "Cannot find module '@supabase/supabase-js'"

- Execute `npm run setup` novamente para instalar as dependências
- Ou rode `npm install` em cada pasta (`client/` e `server/`)

## Observações importantes

- A sessão do usuário é verificada em `client/src/main.ts` antes de carregar páginas restritas.
- O front-end depende das variáveis `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`.
- O back-end depende das variáveis `SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY`.
- O projeto é independente de sistema operacional (Windows, macOS, Linux).
- Sempre mantenha as variáveis de ambiente em segurança, especialmente `SUPABASE_SERVICE_ROLE_KEY`.

