const express = require('express');

// Importando rotas de armas,
const armasRoute = require('./routes/armasRoute');
const agentesRoute = require('./routes/agentesRoute');
const valorantRoute = require('./routes/valorantRoute');

// Criando app express
const app = express();

// O app usa a middleware funcion que analisa solicitações recebidas com cargas JSON
app.use(express.json());

// Funções middlewares que serão executadas quando o usuário fazer uma
//solicitação http para as rotas especificadas
app.use('/api/v1/valorant', valorantRoute);
app.use('/api/v1/agentes', agentesRoute);
app.use('/api/v1/armas', armasRoute);

// Exportando app para o server.js, onde será gerenciado o servidor e banco de dados
module.exports = app;
