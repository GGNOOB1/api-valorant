const express = require('express');

// Importando manipuladores de rotas
const agentesController = require('../controllers/agentesController');

// Criado roteador para gerenciar as rotas
const router = express.Router();

// Atribuindo suas funções de manipulação de rotas e seus respectivos métodos de requisições
router
    .route('/')
    .get(agentesController.obterTodosAgentes)
    .post(
        agentesController.validarDadosAgente,
        agentesController.adicionarAgente,
    );

router
    .route('/:id')
    .get(agentesController.obterAgentePorID)
    .patch(
        agentesController.validarDadosAgente,
        agentesController.atualizarAgente,
    )
    .delete(agentesController.deletarAgente);

// Exportando roteador para o app principal
module.exports = router;
