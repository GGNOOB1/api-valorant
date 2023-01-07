const mongoose = require('mongoose');

const armasSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: [true, 'Erro, uma arma precisa ter um nome'],
        unique: true,
    },
    categoria: {
        type: String,
        required: true,
    },
    descricao: {
        disparo: {
            type: String,
        },
        distanciaTiro: {
            type: String,
            required: true,
        },
        dano: {
            required: true,
            cabeca: {
                type: Number,
            },
            corpo: {
                type: Number,
            },
            perna: {
                type: Number,
            },
        },
    },
});

const Arma = mongoose.model('Arma', armasSchema);

module.exports = Arma;
