const express = require('express');

const armasController = require('../controllers/armasController');

const router = express.Router();

router
    .route('/')
    .get(armasController.obterTodasArmas)
    .post(armasController.adicionarArma);

router
    .route('/:id')
    .get(armasController.obterArma)
    .patch(armasController.atualizarArma)
    .delete(armasController.deletarArma);

module.exports = router;
