const express = require('express');

// Importando manipuladores de rotas
const valorantController = require('../controllers/valorantController');

// Criado roteador para gerenciar as rotas
const router = express.Router();

// Atribuindo suas funções de manipulação de rotas e seus respectivos métodos de requisições
router.route('/').get(valorantController.obterTudo);

// Exportando roteador para o app principal
module.exports = router;
