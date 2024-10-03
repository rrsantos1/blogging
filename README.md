# FIAP---blogging
Para executar o projeto no Docker, é necessário criar o arquivo docker-compose.yml (conteúdo abaixo) e executar o comando docker-compose up

services:
  db:
    image: postgres:latest          # Imagem do PostgreSQL do Docker Hub    
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_DB=blogging
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=123456
    networks:
      - mynetwork

  app:
    image: rrsnaza/blogging:latest
    ports:
      - "3000:3000"                 # Mapeamento de portas
    environment:
      DATABASE_USER: postgres
      DATABASE_PASSWORD: 123456
      DATABASE_HOST: db  # Nome do serviço do banco de dados
      DATABASE_NAME: blogging
      DATABASE_PORT: 5432
    networks:
      - mynetwork
  
networks:
  mynetwork:
    driver: bridge
