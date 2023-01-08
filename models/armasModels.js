const { string } = require('joi');
const mongoose = require('mongoose');

const armasSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: [true, 'Uma arma precisa ter um nome'],
        unique: true,
    },
    categoria: {
        type: String,
    },
    descricao: {
        descricao: {
            type: String,
            required: [true, 'A arma precisa de uma descrição'],
        },
        disparo: {
            type: String,
        },
        distanciaTiro: {
            type: String,
        },
        dano: {
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
