#!/bin/sh

# Aguardando o banco de dados estar pronto
until nc -z blogging-db-1 5432; do
  echo "Aguardando o banco de dados estar pronto..."
  sleep 1
done

# Inicia a aplicação
npm start