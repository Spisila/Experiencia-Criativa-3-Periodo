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

- Node.js 18 ou superior
- npm
- Projeto Supabase ativo com credenciais de API

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

### 1. Front-end

Edite o arquivo `.env.example` em `client/` com estas variáveis:

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anonima
```

### 2. Back-end

Edite o arquivo `.env.example` em `server/` com estas variáveis:

```env
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_SERVICE_ROLE_KEY=sua-chave-service-role
PORT=3000
```

> `SUPABASE_SERVICE_ROLE_KEY` deve ser mantada em segredo e só usada no servidor.

## Instalação

> **Veja o [tutorial em vídeo de instalação](https://www.youtube.com/watch?v=fjbwkmoVXLQ)** para um guia visual passo a passo.

No diretório raiz do repositório, execute:

```bash
npm run setup
```

Esse comando instala as dependências de:

- raiz do projeto
- `client/`
- `server/`

## Execução em desenvolvimento

> **Veja o [tutorial de uso do site](https://www.youtube.com/watch?v=yug1R7DyS6Q)** para saber como navegar e usar todas as funcionalidades.

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

## Observações importantes

- A sessão do usuário é verificada em `client/src/main.ts` antes de carregar páginas restritas.
- O front-end depende das variáveis `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`.
- O back-end depende das variáveis `SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY`.


```
