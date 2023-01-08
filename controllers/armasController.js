const mongoose = require('mongoose');
const _ = require('lodash');
const joi = require('joi');

const Arma = require('./../models/armasModels');

exports.validarDadosArmas = (req, res, next) => {
    const armaSchema = joi
        .object({
            nome: joi.string().min(3).max(30).required(),
            categoria: joi
                .string()
                .valid(
                    'Pistolas',
                    'Sub-metralhadoras',
                    'Escopetas',
                    'Rifles',
                    'Metralhadoras',
                    'Armas brancas',
                ),

            descricao: joi
                .object()
                .min(4)
                .max(4)
                .items(
                    joi.object({
                        descricao: joi.string(),
                        disparo: joi
                            .string()
                            .valid(
                                'Automático',
                                'Semi-automático',
                                'Corpo-a-corpo',
                            ),
                        dano: joi.object({
                            cabeca: joi.number(),
                            corpo: joi.number,
                            perna: joi.number(),
                        }),
                    }),
                ),
        })
        .options({ abortEarly: false });

    const result = armaSchema.validate(req.body);

    if (result.error) {
        return res.status(400).json({
            status: 'Falhou',
            message: result.error.message || 'Erro',
        });
    }

    next();
};

exports.obterTodasArmas = async (req, res) => {
    try {
        const todasArmas = await Arma.find();

        res.status(200).json({
            status: 'Sucesso',
            results: todasArmas.length,
            data: todasArmas,
        });
    } catch (err) {
        res.status(404).json({ status: 'Erro', message: 'Não encontrado' });
    }
};

exports.obterArma = async (req, res) => {
    try {
        // Retorna verdadeiro se for um ObjectId valido, se for, busca no bd a arma com o id inserido
        if (mongoose.isObjectIdOrHexString(req.params.id)) {
            const arma = await Arma.findById(req.params.id);
            res.status(200).json({ status: 'Sucesso', data: arma });

            // Retorna falso se for um Object Id inválido, e se for falso quer dizer que pode ser um
            // nome de arma, então utilizo o pacote lodash para formatar a string com o padrão de nome
            // estabelecido, e após isso a procura no bd.
        } else {
            let id = _.kebabCase(req.params.id);
            id = _.startCase(id);

            const arma = await Arma.findOne({ nome: id });

            // Se não for encontrada nenhuma arma com o parâmetro/nome informado
            // é retornado um null, e se for null, ocorre um erro
            if (arma === null) {
                res.status(404).json({
                    status: 'Falhou',
                    message: 'Arma não encontrada',
                });
            } else {
                res.status(200).json({ status: 'Sucesso', data: arma });
            }
        }
    } catch (err) {
        res.status(404).json({
            status: 'Falhou, busca não encontrada',
            message: err,
        });
    }
};

exports.adicionarArma = async (req, res) => {
    try {
        req.body.nome = _.startCase(req.body.nome);

        const arma = await Arma.create(req.body);

        res.status(201).json({
            status: 'Sucess',
            message: 'Dados inseridos com sucesso',
            data: arma,
        });
    } catch (err) {
        res.status(400).json({
            status: 'Falha',
            message: err.message,
        });
    }
};

exports.atualizarArma = async (req, res) => {
    try {
        const arma = await Arma.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.status(200).json({ status: 'Sucesso', data: { arma } });
    } catch (err) {
        res.status(404).json({
            status: 'Falhou, busca não encontrada',
            message: err,
        });
    }
};

exports.deletarArma = async (req, res) => {
    try {
        const arma = await Arma.findByIdAndDelete(req.params.id);
        res.status(204).json({ status: 'Sucesso', data: { arma } });
    } catch (err) {
        res.status(404).json({
            status: 'Falhou, ID não encontrado',
            message: err,
        });
    }
};
