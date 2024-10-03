# Use a imagem oficial do Node.js
FROM node:22.3.0

# Atualizar o repositório de pacotes e instalar netcat
RUN apt-get update && apt-get upgrade -y && \
    apt-get install -y netcat-openbsd && \
    rm -rf /var/lib/apt/lists/*

# Definir o diretório de trabalho
WORKDIR /usr/app

COPY package.json ./

RUN npm install  

COPY . .  

# Copiar o script de inicialização
COPY start.sh /usr/local/bin/start.sh
RUN chmod +x /usr/local/bin/start.sh

# Definir as variáveis de ambiente (ou use um arquivo .env externo)
ARG JWT_SECRET

# Criar o arquivo .env com as variáveis ARG passadas durante o build
RUN echo "JWT_SECRET=${JWT_SECRET}" >> .env 

# Executar o build da aplicação
RUN npm install -g pnpm  
RUN pnpm build

# Expor a porta 3000
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["/usr/local/bin/start.sh"]