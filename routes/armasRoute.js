const express = require('express');

// Importando manipuladores de rotas
const armasController = require('../controllers/armasController');

// Criado roteador para gerenciar as rotas
const router = express.Router();

// Atribuindo suas funções de manipulação de rotas e seus respectivos métodos de requisições
router
    .route('/')
    .get(armasController.obterTodasArmas)
    .post(armasController.validarDadosArmas, armasController.adicionarArma);

router
    .route('/:id')
    .get(armasController.obterArma)
    .patch(armasController.validarDadosArmas, armasController.atualizarArma)
    .delete(armasController.deletarArma);

// Exportando roteador para o app principal
module.exports = router;
