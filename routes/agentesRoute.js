const express = require('express');

const agentesController = require('../controllers/agentesController');

const router = express.Router();

//router.param('id', agentesController.checkID);

router
    .route('/')
    .get(agentesController.obterTodosAgentes)
    .post(agentesController.adicionarAgente);

router
    .route('/:id')
    .get(agentesController.obterAgentePorID)
    .patch(
        agentesController.checkEmpty,
        agentesController.checkPropriedades,
        agentesController.atualizarAgente,
    )
    .delete(agentesController.deletarAgente);

module.exports = router;
