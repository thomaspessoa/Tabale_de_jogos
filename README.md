# Projeto Tabela de Campeonato de Futebol

Este é um projeto full-stack que cria uma tabela de classificação de futebol, incluindo um painel de administração para gerenciar times, jogadores e partidas.

---

## Como Rodar o Projeto (Guia Simplificado)

Siga estes 3 passos para ter a aplicação funcionando localmente.

### Pré-requisitos

1.  **Node.js**: [Instale a partir daqui](https://nodejs.org/en/).
2.  **Conta no MongoDB Atlas**: [Crie uma conta gratuita aqui](https://www.mongodb.com/cloud/atlas/register).

---

### Passo 1: Configurar o Backend e o Banco de Dados

1.  **Navegue até a pasta `backend`**:
    ```bash
    cd backend
    ```

2.  **Crie o arquivo de ambiente**: Crie um arquivo chamado `.env` dentro da pasta `backend`.

3.  **Preencha o arquivo `.env`**: Copie e cole o texto abaixo no seu arquivo `.env` e substitua os valores de exemplo.

    ```
    MONGO_URI=SUA_STRING_DE_CONEXAO_MONGODB
    PORT=5001
    JWT_SECRET=SUA_CHAVE_SECRETA_ALEATORIA
    ```

    *   **`MONGO_URI`**: Obtenha no site do MongoDB Atlas. Após criar seu cluster gratuito, clique em "Connect" -> "Connect your application" e copie a string. **Lembre-se de substituir `<username>` e `<password>`** na string pelos dados do usuário do banco de dados que você criou no Atlas.
    *   **`JWT_SECRET`**: Invente qualquer senha longa e segura. Ex: `segredo-do-meu-campeonato-123!`.

---

### Passo 2: Iniciar a Aplicação Completa

1.  **Volte para a pasta raiz do projeto**:
    ```bash
    cd ..
    ```

2.  **Execute o script de inicialização**:
    ```bash
    ./start.sh
    ```
    *Se você estiver no Windows, pode receber um erro. Nesse caso, você precisará abrir dois terminais: um para rodar `npm start` na pasta `backend` e outro para rodar `npm run dev` na pasta `frontend`.*

3.  **Mantenha este terminal aberto**. Ele está rodando os servidores. Na primeira vez que o backend iniciar, ele criará automaticamente um usuário administrador para você.

---

### Passo 3: Acessar o Painel de Administrador

1.  **Abra seu navegador de internet** (Chrome, Firefox, etc.).

2.  **Acesse a página de login** digitando o seguinte endereço na barra de URL:
    ```
    http://localhost:3003/admin/login
    ```

3.  **Faça o login** com as credenciais padrão:
    *   **Usuário:** `admin`
    *   **Senha:** `admsenha123`

4.  **Pronto!** Você será redirecionado para o painel de administração, onde poderá cadastrar times, jogadores e registrar partidas.

A tabela pública principal estará visível para todos em `http://localhost:3003`.

---

## Deploy (Produção)

Para colocar seu site no ar, você precisará hospedar o backend e o frontend separadamente. Recomendamos a seguinte combinação gratuita:

*   **Backend (API):** na **Render**.
*   **Frontend (Site):** na **Vercel**.

Siga os passos abaixo.

### Parte 1: Deploy do Backend na Render

1.  **Crie uma conta** na [Render](https://render.com/).
2.  No painel, clique em **"New +"** e selecione **"Web Service"**.
3.  Conecte sua conta do GitHub e selecione o repositório do projeto.
4.  **Configure o serviço** com as seguintes informações:
    *   **Name:** Dê um nome único (ex: `campeonato-api`).
    *   **Root Directory:** `backend`
    *   **Environment:** `Node`
    *   **Build Command:** `npm install`
    *   **Start Command:** `npm start`
5.  Clique em **"Advanced Settings"** para adicionar as **Variáveis de Ambiente (Environment Variables)**:
    *   Adicione uma variável com a chave `MONGO_URI` e o valor da sua string de conexão do MongoDB Atlas (a mesma que você usou localmente).
    *   Adicione outra variável com a chave `JWT_SECRET` e o valor da sua chave secreta (a mesma do `.env` local).
    *   **IMPORTANTE:** No seu MongoDB Atlas, vá em "Network Access" e adicione o IP `0.0.0.0/0` para permitir que a Render acesse seu banco de dados.
6.  Clique em **"Create Web Service"**. A Render fará o deploy.
7.  Após o deploy, copie a URL do seu serviço (algo como `https://seu-servico.onrender.com`). Você precisará dela para o próximo passo.

### Parte 2: Deploy do Frontend na Vercel

1.  **Crie uma conta** na [Vercel](https://vercel.com/) usando sua conta do GitHub.
2.  No painel, clique em **"Add New... -> Project"**.
3.  Selecione o repositório do projeto no GitHub.
4.  **Configure o projeto**:
    *   A Vercel deve detectar que é um projeto Next.js automaticamente.
    *   Expanda a seção **"Root Directory"** e selecione a pasta `frontend`.
5.  Expanda a seção **"Environment Variables"** e adicione a seguinte variável:
    *   **Key:** `NEXT_PUBLIC_API_URL`
    *   **Value:** Cole a URL do seu backend da Render que você copiou no passo anterior.
        *   *Exemplo:* `https://seu-servico.onrender.com`
6.  Clique em **"Deploy"**.
7.  Aguarde a finalização do processo. A Vercel fornecerá a URL do seu site, que agora estará funcionando online!
