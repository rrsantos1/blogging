﻿# FIAP---blogging
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

Descrição das rotas:
Person: Todas as rotas estão liberadas para todos os perfis;

app.post('/person', create): Criação de usuários. O campo perfil pode ser admin, para o papel de administrador, ou qualquer outra coisa para os não admins. Os outros campos que serão usados na aplicação são somente o id (que é automático), username e password (que serão usados no signin);

app.get('/person/:id', findUser): Pesquisa um user pelo id;

app.post('/person/signin', signin): Faz o signin do usuário, utilizando o username e password. Automaticamente carrega o perfil do usuário para liberação de acesso às rotas;

app.get('/person', findAllPerson): Lista todos os usuários cadastrados.


Category: Manipula as categorias dos posts, necessário para a criação de um post. Também estão liberadas para todos os perfis;

app.post('/category', create): Criação das categorias.

app.get('/category', findAllCategory): Pesquisa todas as categorias cadastradas;


Blog (posts): Manipulação dos posts do blog. As rotas do crud e a pesquisa por admin estão liberadas somente para os usuários com perfil admin;

app.post('/posts', create): Criação dos posts. O usuário não precisa ser informado, porque será pego automaticamente da classe de signin e a categoria deve existir.

app.put('/posts/:id', update): Faz o update dos posts através do id fornecido. O usuário não precisa ser informado, porque será pego automaticamente da classe de signin. O campo create_date não precisa ser informado, pois não deve ser alterado;

app.delete('/posts/:id', deleteBlog): Deleta um post através do id fornecido;

app.get('/posts', findAllBlog): Lista todos os posts;

app.get('/posts/:id', findBlog): Exibe o post através do id;

app.get('/posts/search', findByKeyWord): Pesquisa posts que tenham no campo title ou description a palavra ou expressão informadas na key keyword;

app.get('/posts/admin', { preHandler: [validateJwt] }, findAllByAdmin): Lista todos os posts criados pelo usuário logado (se ele for admin).

Outras informações:

A aplicação utiliza um script de inicialização (start.sh) que fica lendo o serviço do banco de dados através do netcat, até que o banco de dados esteja apto a receber conexões. Isso para evitar que a aplicação tente se conectar antes de o banco estar pronto.
