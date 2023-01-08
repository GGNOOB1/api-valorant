const express = require('express');

const armasRoute = require('./routes/armasRoute');
const campeoesRoute = require('./routes/agentesRoute');
const valorantRoute = require('./routes/valorantRoute');

const app = express();
app.use(express.json());

app.use('/api/v1/valorant', valorantRoute);
app.use('/api/v1/agentes', campeoesRoute);
app.use('/api/v1/armas', armasRoute);

module.exports = app;
