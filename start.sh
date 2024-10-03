#!/bin/sh

# Aguardando o banco de dados estar pronto
echo "Aguardando o banco de dados estar pronto..."
until nc -z db 5432; do
  sleep 1
done

# Inicia a aplicação
npm start