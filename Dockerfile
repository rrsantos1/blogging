# Use a imagem oficial do Node.js
FROM node:22.3.0

# Definir o diretório de trabalho
WORKDIR /usr/app

COPY package.json ./

RUN npm install  

COPY . .  

RUN npm install -g pnpm  

# Definir as variáveis de ambiente (ou use um arquivo .env externo)
ARG JWT_SECRET
ARG DATABASE_USER
ARG DATABASE_HOST
ARG DATABASE_NAME
ARG DATABASE_PASSWORD
ARG DATABASE_PORT

# Criar o arquivo .env com as variáveis ARG passadas durante o build
RUN echo "JWT_SECRET=${JWT_SECRET}" >> .env \
    && echo "DATABASE_USER=${DATABASE_USER}" >> .env \
    && echo "DATABASE_HOST=${DATABASE_HOST}" >> .env \
    && echo "DATABASE_NAME=${DATABASE_NAME}" >> .env \
    && echo "DATABASE_PASSWORD=${DATABASE_PASSWORD}" >> .env \
    && echo "DATABASE_PORT=${DATABASE_PORT}" >> .env

# Executar o build da aplicação
RUN pnpm build

# Expor a porta 3000
EXPOSE 3000

# Comando de execução da aplicação
CMD [ "node", "build/server" ]