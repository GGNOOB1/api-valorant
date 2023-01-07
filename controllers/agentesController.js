const fs = require('fs');
const mongoose = require('mongoose');
const _ = require('lodash');

const { dirname } = require('path');
const appDir = dirname(require.main.filename);
const Agente = require('./../models/agentesModels');

// Middlewares functions
exports.checkEmpty = (req, res, next) => {
    if (_.isEmpty(req.body)) {
        return res.status(404).json({
            status: 'Falhou',
            message: 'Está faltando algo',
        });
    }
    next();
};

exports.checkPropriedades = (req, res, next) => {
    if (
        !req.body.nome &&
        !req.body.categoria &&
        !req.body.historia &&
        !req.body.habilidades
    ) {
        return res.status(404).json({
            status: 'Falhou',
            message: 'Faltando propriedades',
        });
    }

    next();
};

// Manipuladores de rotas
exports.obterTodosAgentes = async (req, res) => {
    try {
        const agentes = await Agente.find();

        res.status(200).json({
            status: 'Sucess',
            results: agentes.length,
            data: {
                agentes,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: 'Falhou, busca não encontrada',
            message: err,
        });
    }
};

exports.obterAgentePorID = async (req, res) => {
    try {
        // Retorna verdadeiro se for um ObjectId valido
        if (mongoose.Types.ObjectId.isValid(req.params)) {
            const agente = await Agente.findById(req.params.id);
            res.status(200).json({ status: 'Sucesso', data: agente });

            // Retorna falso se for um Object Id inválido
        } else {
            let id = _.kebabCase(req.params.id);
            id = _.startCase(id);

            const agente = await Agente.findOne({ nome: id });

            // Se não for encontrado nenhum agente com o parâmetro informado
            // é retornado um null, e se for null, ocorre um erro
            if (agente === null) {
                res.status(404).json({
                    status: 'Falhou',
                    message: 'Não encontrado',
                });
            } else {
                res.status(200).json({ status: 'Sucesso', data: agente });
            }
        }
    } catch (err) {
        res.status(404).json({
            status: 'Falhou, busca não encontrada',
            message: err,
        });
    }
};

exports.adicionarAgente = async (req, res) => {
    try {
        const agente = await Agente.create(req.body);

        res.status(201).json({
            status: 'Sucess',
            message: 'Dados inseridos com sucesso',
            data: agente,
        });
    } catch (err) {
        res.status(400).json({
            status: 'Falha',
            message: err.message,
        });
    }
};

exports.atualizarAgente = async (req, res) => {
    try {
        const agente = await Agente.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.status(200).json({ status: 'Sucesso', data: { agente } });
    } catch (err) {
        res.status(404).json({
            status: 'Falhou, busca não encontrada',
            message: err,
        });
    }
};

exports.deletarAgente = async (req, res) => {
    try {
        const agente = await Agente.findByIdAndDelete(req.params.id);
        res.status(204).json({ status: 'Sucesso', data: { agente } });
    } catch (err) {
        res.status(404).json({
            status: 'Falhou, ID não encontrado',
            message: err,
        });
    }
};