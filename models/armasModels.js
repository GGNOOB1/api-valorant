const mongoose = require('mongoose');

const armasSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: [true, 'Uma arma precisa ter um nome'],
        unique: true,
    },
    categoria: {
        type: String,
        enum: [
            'Pistolas',
            'Sub-metralhadoras',
            'Escopetas',
            'Rifles',
            'Metralhadoras',
            'Armas brancas',
        ],
        required: [true, 'Uma arma precisa de uma categoria'],
    },
    descricao: {
        descricao: {
            type: String,
            required: [true, 'A arma precisa de uma descrição'],
        },
        disparo: {
            type: String,
            enum: ['Automático', 'Semi-automático', 'Corpo-a-corpo'],
            required: [true, 'Uma arma precisa de um tipo de disparo'],
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
    imagem: {
        type: String,
        default: '/',
    },
});

const Arma = mongoose.model('Arma', armasSchema);

module.exports = Arma;
