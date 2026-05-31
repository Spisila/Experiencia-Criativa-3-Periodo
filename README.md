# SindromeX

Aplicação web SPA em TypeScript com Vite para gerenciamento de usuários, cadastro de pacientes, avaliações clínicas e geração de relatórios. A interface utiliza autenticação via Supabase, controle de rotas baseado em perfil e tema claro/escuro.

---

## Tecnologias

- TypeScript
- Vite
- Supabase
- Zod
- Lucide Static
- CSS puro

## Visão geral

A aplicação contém páginas de:

- Login
- Cadastro de paciente
- Cadastro de médico e administrador
- Opções de usuário e administrador
- Lista de pacientes
- Nova avaliação clínica
- Relatórios de usuário e administrador
- Visualização de relatório detalhado

A navegação é feita por rotas internas no front-end, com controle de acesso por perfil de usuário.

## Estrutura principal


```

Experiencia-Criativa-3-Periodo
├─ client
│  ├─ index.html                 - Unico HTML do projeto
│  ├─ src
│  │  ├─ main.ts - Script que inicializa o site e faz o roteamento
│  │  ├─ style.css - CSS usado na pagina base 
│  │  ├─ components - Componentes que são utilizados em várias paginas
│  │  │  ├─ base_button.css
│  │  │  ├─ big_ass_button.css
│  │  │  ├─ input_boxes.css
│  │  │  ├─ logout_button.ts
│  │  │  ├─ notification_popup.ts
│  │  │  ├─ return_to_options_button.ts
│  │  │  └─ tema_claro_escuro.ts
│  │  ├─ lib 
│  │  │  ├─ sintoma_pesos.ts - Script que pega os pesos do backend
│  │  │  └─ supabase.ts - Script que inicia a conexão com o Supabase
│  │  ├─ pages - Pasta que guarda as paginas do site
│  │  │  ├─ cadastro_admin - Pastas seguem esse padrão, um script ts e um script de CSS para estilos unicos para aquela pagina
│  │  │  │  ├─ cadastro_admin.css
│  │  │  │  └─ cadastro_admin.ts - Contem o HTML a ser injetado e a lógica da pagina
│  │  │  ├─ cadastro_medico
│  │  │  ├─ cadastro_paciente
│  │  │  ├─ lista_pacientes
│  │  │  ├─ login_total
│  │  │  ├─ nova_avaliacao
│  │  │  ├─ opcoes_admin
│  │  │  ├─ opcoes_usuario
│  │  │  ├─ relatorio
│  │  │  ├─ relatorios_admin
│  │  │  └─ relatorios_usuario
│  │  └─ schemas - Pasta que guarda as validações do zod
│  │     ├─ cadastro_pacientes_schema.ts
│  │     ├─ cadastro_usuario_schema.ts
│  │     └─ login_schema.ts
│  └─ tsconfig.json
├─ package-lock.json
├─ package.json
└─ README.md 

```

## Requisitos

- Node.js 18+ / npm
- Conta e projeto Supabase

## Configuração do ambiente

Crie um arquivo `.env` na pasta `client/` com as variáveis:

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anonima
```

## Instalação

No diretório raiz do repositório:

```bash
npm run setup
```

## Execução

Para rodar o front-end em modo de desenvolvimento:

```bash
npm run dev
```

Para gerar a build de produção:

```bash
npm run build 
```

Para pré-visualizar a build:

```bash
npm run preview 
```

## Rotas disponíveis

A aplicação suporta as seguintes rotas:

- `/login_total`
- `/cadastro_paciente`
- `/cadastro_medico`
- `/cadastro_admin`
- `/opcoes_usuario`
- `/opcoes_admin`
- `/lista_pacientes`
- `/relatorios_usuario`
- `/relatorios_admin`
- `/relatorio`
- `/nova_avaliacao`

## Observações

- A autenticação e o estado de sessão dependem do Supabase.
- O tema claro/escuro é inicializado em `client/src/components/tema_claro_escuro.ts`.
- O arquivo `client/src/lib/supabase.ts` lança erro se as variáveis de ambiente não forem definidas.

---

### Contato

Este README pode ser usado como base para documentar a aplicação e adicionar mais instruções sobre o uso de cada página e regras de perfil conforme o projeto evolui.

```
