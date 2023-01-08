const express = require('express');

const agentesController = require('../controllers/agentesController');

const router = express.Router();

//router.param('id', agentesController.checkID);

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

module.exports = router;
