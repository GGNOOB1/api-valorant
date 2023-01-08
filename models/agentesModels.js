const mongoose = require('mongoose');

const agenteSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: [true, 'Erro, um agente precisa ter um nome'],
        unique: true,
    },
    categoria: {
        type: String,
        enum: ['Duelista', 'Controlador', 'Iniciador', 'Sentinela'],
        required: [true, 'Um agente precisa de uma categoria'],
    },
    historia: {
        type: String,
        required: [true, 'Erro, um agente precisa ter uma história'],
    },
    habilidades: [
        {
            nome: {
                type: String,
                required: [
                    true,
                    'Erro, Um agente precisa ter pelo menos uma habilidade',
                ],
            },
            descricao: {
                type: String,
                required: [true, 'Uma habilidade precisa de uma descrição'],
            },
            tempoDeRecarga: {
                type: String,
                required: [
                    true,
                    'Erro, o tempo de recarga precisa de um valor',
                ],
            },
        },
    ],
    imagem: {
        type: String,
        default: '/',
    },
});

const Agente = mongoose.model('Agente', agenteSchema);

module.exports = Agente;
