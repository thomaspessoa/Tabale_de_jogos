# Projeto Tabela de Campeonato de Futebol

Este é um projeto full-stack que cria uma tabela de classificação de futebol, incluindo um painel de administração para gerenciar times, jogadores e partidas.

---

## Como Rodar o Projeto (Guia Completo)

Siga estes 4 passos para ter a aplicação funcionando localmente.

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

### Passo 2: Criar seu Usuário Administrador

1.  **Ainda no terminal, dentro da pasta `backend`**, execute o comando abaixo. Troque `admin` e `senha123` pelo usuário e senha que você desejar.

    ```bash
    node scripts/create-admin.js admin senha123
    ```

2.  Aguarde a mensagem de sucesso no terminal. Se tudo deu certo, seu usuário foi criado no banco de dados.

---

### Passo 3: Iniciar a Aplicação Completa

1.  **Volte para a pasta raiz do projeto**:
    ```bash
    cd ..
    ```

2.  **Execute o script de inicialização**:
    ```bash
    ./start.sh
    ```
    *Se você estiver no Windows, pode receber um erro. Nesse caso, você precisará abrir dois terminais: um para rodar `npm start` na pasta `backend` e outro para rodar `npm run dev` na pasta `frontend`.*

3.  **Mantenha este terminal aberto**. Ele está rodando os servidores.

---

### Passo 4: Acessar e Usar o Painel de Administrador

1.  **Abra seu navegador de internet** (Chrome, Firefox, etc.).

2.  **Acesse a página de login** digitando o seguinte endereço na barra de URL:
    ```
    http://localhost:3003/admin/login
    ```

3.  **Faça o login** com o usuário e senha que você criou no **Passo 2**.

4.  **Pronto!** Você será redirecionado para o painel de administração, onde poderá:
    *   Cadastrar novos times.
    *   Cadastrar jogadores para esses times.
    *   Registrar os resultados das partidas.

A tabela pública principal estará visível para todos em `http://localhost:3003`.
