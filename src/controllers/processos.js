const Processos = require('../model/processos');
const Etapas = require('../model/etapas');
const Participante = require('../model/participante');
const ParticipanteProcesso = require('../model/participanteProcesso');


const { Op } = require('sequelize');

module.exports = {
    async pagProcessosGet(req, res) {
        try {
            const processos = await Processos.findAll({
                raw: true,
                attributes: ['IDProcesso', 'Nome', 'Data', 'NumEtapas'],
            });

            const etapas = await Etapas.findAll({
                raw: true,
                attributes: ['IDEtapa', 'Nome', 'Data', 'Turno', 'IDProcesso'],
            });

            const participantes = await Participante.findAll({
                raw: true,
                attributes: ['IDParticipante', 'Nome'],
            });

            const participantesProcessos = await ParticipanteProcesso.findAll({
                raw: true,
                attributes: ['IDParticipante', 'IDProcesso', 'Status'],
                where: {
                    Status: {
                        [Op.gte]: 1, // Apenas participantes com status maior ou igual a 1
                    },
                },
            });

            const processosComEtapas = processos.map((processo) => {
                const etapasDoProcesso = etapas.filter((etapa) => etapa.IDProcesso === processo.IDProcesso);
                const participantesDoProcesso = participantesProcessos
                    .filter((participante) => participante.IDProcesso === processo.IDProcesso)
                    .map((participante) => ({
                        ...participante,
                        Nome: participantes.find((p) => p.IDParticipante === participante.IDParticipante)?.Nome,
                    }));

                return { ...processo, etapas: etapasDoProcesso, participantes: participantesDoProcesso };
            });

            res.render('../views/processos', { processosComEtapas, participantes });
        } catch (error) {
            console.error('Erro ao obter os dados dos processos:', error);
            res.render('error'); // Renderiza uma página de erro caso ocorra uma exceção
        }
    }
}