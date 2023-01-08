const Agente = require('./../models/agentesModels');
const Arma = require('./../models/armasModels');

exports.obterTudo = async (req, res) => {
    const todosAgentes = await Agente.find();
    const todasArmas = await Arma.find();

    res.status(200).json({
        status: 'Sucesso',
        results: todasArmas.length + todosAgentes.length,
        data: {
            agentes: todosAgentes,
            armas: todasArmas,
        },
    });
};
