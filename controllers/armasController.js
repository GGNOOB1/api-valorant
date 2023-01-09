const mongoose = require('mongoose');
const Arma = require('./../models/armasModels');

const _ = require('lodash');
const joi = require('joi');

// Middlewares functions

exports.validarDadosArmas = (req, res, next) => {
    // Schema utilizando o pacote joi para validar os dados recebidos no corpo das
    // requisições que utilizam desse middleware
    const armaSchema = joi.object({
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
            )
            .required(),
        descricao: joi.string(),
        disparo: joi
            .string()
            .valid('Automático', 'Semi-automático', 'Corpo-a-corpo')
            .required(),
        dano: joi.object({
            cabeca: joi.number(),
            corpo: joi.number(),
            perna: joi.number(),
        }),
    });

    // Valida os dados do corpo da requisição utilizando o esquema e verifica erros
    const result = armaSchema.validate(req.body);

    if (result.error) {
        return res.status(400).json({
            status: 'Falhou',
            message: result.error.message || 'Erro',
        });
    }

    next();
};

// Manipuladores de rotas

exports.obterTodasArmas = async (req, res) => {
    try {
        // Variavel com todos os dados do bd
        const todasArmas = await Arma.find();

        // Utilizo o método de validação do pacote lodash para conferir se possui dados no bd
        if (!_.isEmpty(todasArmas)) {
            return res.status(200).json({
                status: 'Sucesso',
                results: todasArmas.length,
                data: {
                    todasArmas,
                },
            });
        }
        return err;
    } catch (err) {
        res.status(404).json({
            status: 'Erro',
            message: 'Nenhuma arma foi encontrada',
        });
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
        //  Especificando que o nome único que será recebido na requisição terá que
        // ter suas letras iniciais maiúsculas
        req.body.nome = _.startCase(req.body.nome);

        // Utilizando o Schema de armas criado no models para criar um documento
        // com os dados do corpo da requisição, já validados nas middleware functions
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
        // Encontrando dados pelo id e atualizando com os dados recebidos na requisição patch
        const arma = await Arma.findByIdAndUpdate(req.params.id, req.body, {
            // A propriedade new:true, significa que será retornado o novo documento atualizado
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
        // Encontra os dados pelo Id e os deleta
        const arma = await Arma.findByIdAndDelete(req.params.id);
        res.status(204).json({ status: 'Sucesso', data: { arma } });
    } catch (err) {
        res.status(404).json({
            status: 'Falhou, ID não encontrado',
            message: err,
        });
    }
};
