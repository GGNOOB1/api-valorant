const mongoose = require('mongoose');
const Agente = require('./../models/agentesModels');

const _ = require('lodash');
const joi = require('joi');

// Middlewares functions

exports.validarDadosAgente = (req, res, next) => {
    // Schema utilizando o pacote joi para validar os dados recebidos no corpo das
    // requisições que utilizam desse middleware
    const agenteSchema = joi.object({
        nome: joi.string().min(3).max(30).required(),
        categoria: joi
            .string()
            .valid('Duelista', 'Controlador', 'Iniciador', 'Sentinela'),
        historia: joi.string().min(10).required(),
        habilidades: joi
            .array()
            .min(4)
            .max(4)
            .items(
                joi.object({
                    nome: joi.string(),
                    descricao: joi.string(),
                    tempoDeRecarga: joi.string(),
                }),
            ),
    });

    // Valida os dados do corpo da requisição utilizando o esquema e verifica erros
    const result = agenteSchema.validate(req.body);

    if (result.error) {
        return res.status(400).json({
            status: 'Falhou',
            message: result.error.message || 'Erro',
        });
    }

    next();
};

// Manipuladores de rotas

exports.obterTodosAgentes = async (req, res) => {
    try {
        // Variavel com todos os dados do bd
        const agentes = await Agente.find();

        // Utilizo o método de validação do pacote lodash para conferir se possui dados no bd
        if (!_.isEmpty(agentes)) {
            return res.status(200).json({
                status: 'Sucesso',
                results: agentes.length,
                data: {
                    agentes,
                },
            });
        }

        return err;
    } catch (err) {
        res.status(404).json({
            status: 'Falhou, busca não encontrada',
            message: 'Não há agentes disponiveis',
        });
    }
};

exports.obterAgentePorID = async (req, res) => {
    try {
        // Retorna verdadeiro se for um ObjectId valido, se for, busca no bd o agente com o id inserido
        if (mongoose.isObjectIdOrHexString(req.params.id)) {
            const agente = await Agente.findById(req.params.id);
            res.status(200).json({ status: 'Sucesso', data: agente });

            // Retorna falso se for um Object Id inválido, e se for falso quer dizer que pode ser um
            // nome de agente, então utilizo o pacote lodash para formatar a string com o padrão de nome
            // estabelecido, e após isso a procura no bd.
        } else {
            let id = _.kebabCase(req.params.id);
            id = _.startCase(id);

            const agente = await Agente.findOne({ nome: id });

            // Se não for encontrado nenhum agente com o parâmetro/nome informado
            // é retornado um null, e se for null, ocorre um erro
            if (agente === null) {
                res.status(404).json({
                    status: 'Falhou',
                    message: 'Agente não encontrado',
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
        //  Especificando que o nome único que será recebido na requisição terá que
        // ter suas letras iniciais maiúsculas
        req.body.nome = _.startCase(req.body.nome);

        // Utilizando o Schema de agente criado no models para criar um documento
        // com os dados do corpo da requisição, já validados nas middleware functions
        const agente = await Agente.create(req.body);

        res.status(201).json({
            status: 'Sucesso',
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
        // Encontrando dados pelo id e atualizando com os dados recebidos na requisição patch
        const agente = await Agente.findByIdAndUpdate(req.params.id, req.body, {
            // A propriedade new:true, significa que será retornado o novo documento atualizado
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
        // Encontra os dados pelo Id e os deleta
        const agente = await Agente.findByIdAndDelete(req.params.id);
        res.status(204).json({ status: 'Sucesso', data: { agente } });
    } catch (err) {
        res.status(404).json({
            status: 'Falhou, ID não encontrado',
            message: err,
        });
    }
};
