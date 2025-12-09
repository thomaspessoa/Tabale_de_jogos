# Campeonato de Futebol da Cidade

Este é um site completo para gerenciar e exibir a tabela de um campeonato de futebol, com frontend, backend, banco de dados e rotas.

## Visão Geral do Projeto

O projeto é dividido em duas partes principais:

*   **Frontend:** Uma aplicação Next.js que exibe a tabela do campeonato, páginas individuais dos times e um painel administrativo.
*   **Backend:** Uma API Node.js/Express que se conecta a um banco de dados MongoDB para gerenciar os dados.

## Tecnologias Utilizadas

*   **Frontend:**
    *   React / Next.js
    *   Tailwind CSS
    *   TypeScript
    *   Axios
*   **Backend:**
    *   Node.js / Express.js
    *   MongoDB / Mongoose
    *   JSON Web Tokens (JWT) para autenticação
    *   bcryptjs para criptografia de senhas

## Pré-requisitos

*   Node.js e npm
*   MongoDB (local ou em um serviço como o MongoDB Atlas)

## Como Rodar o Projeto

1.  **Clone o repositório:**
    ```bash
    git clone <url-do-repositorio>
    cd <nome-do-repositorio>
    ```

2.  **Configure o Backend:**
    *   Navegue até a pasta `backend`: `cd backend`
    *   Instale as dependências: `npm install`
    *   Crie um arquivo `.env` na raiz da pasta `backend` e adicione as seguintes variáveis:
        ```
        MONGO_URI=<sua-string-de-conexao-com-o-mongodb>
        PORT=5001
        JWT_SECRET=<seu-segredo-jwt>
        ```
    *   Inicie o servidor do backend: `npm run dev`

3.  **Configure o Frontend:**
    *   Navegue até a pasta `frontend`: `cd ../frontend`
    *   Instale as dependências: `npm install`
    *   Inicie o servidor do frontend: `npm run dev`

## Rotas da API

*   `GET /teams`: Retorna todos os times.
*   `POST /teams/add`: Adiciona um novo time (requer autenticação).
*   `GET /teams/:id`: Retorna um time específico.
*   `POST /teams/update/:id`: Atualiza um time (requer autenticação).
*   `DELETE /teams/:id`: Deleta um time (requer autenticação).
*   `GET /players`: Retorna todos os jogadores.
*   `POST /players/add`: Adiciona um novo jogador (requer autenticação).
*   `GET /players/team/:teamId`: Retorna todos os jogadores de um time.
*   `POST /auth/register`: Registra um novo administrador.
*   `POST /auth/login`: Realiza o login de um administrador.

## Deploy

*   **Frontend (Vercel):**
    1.  Conecte seu repositório Git à Vercel.
    2.  Configure o projeto como um projeto Next.js.
    3.  A Vercel deve detectar e configurar o build automaticamente.
*   **Backend (Render):**
    1.  Crie um novo "Web Service" na Render e conecte seu repositório.
    2.  Configure o "Build Command" para `npm install` e o "Start Command" para `npm start`.
    3.  Adicione as variáveis de ambiente (`MONGO_URI`, `PORT`, `JWT_SECRET`) nas configurações do serviço.

Com isso, você terá o projeto rodando em produção.
