#!/bin/bash

# Define cores para as mensagens
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}### Iniciando o ambiente do Campeonato de Futebol ###${NC}"

# --- Verificação do Backend ---
echo -e "\n${YELLOW}--> Configurando o Backend...${NC}"

# 1. Checar se o arquivo .env existe
if [ ! -f "backend/.env" ]; then
    echo -e "${YELLOW}AVISO: O arquivo 'backend/.env' não foi encontrado.${NC}"
    echo "Por favor, crie este arquivo antes de continuar."
    echo "Ele deve conter as seguintes variáveis:"
    echo "MONGO_URI=<sua-string-de-conexao-com-o-mongodb>"
    echo "PORT=5001"
    echo "JWT_SECRET=<seu-segredo-jwt-super-secreto>"
    exit 1
fi

# 2. Instalar dependências e iniciar o backend em segundo plano
cd backend
echo "Instalando dependências do backend (npm install)..."
npm install
echo "Iniciando servidor do backend em segundo plano (na porta 5001)..."
npm start &
BACKEND_PID=$!
cd ..

# --- Verificação do Frontend ---
echo -e "\n${YELLOW}--> Configurando o Frontend...${NC}"

# 3. Instalar dependências e iniciar o frontend
cd frontend
echo "Instalando dependências do frontend (npm install)..."
npm install
echo "Iniciando a aplicação frontend (na porta 3003)..."
npm run dev

# --- Finalização ---
# Se o script do frontend for interrompido (Ctrl+C), parar o processo do backend também
kill $BACKEND_PID
echo -e "\n${GREEN}### Ambiente finalizado. ###${NC}"
