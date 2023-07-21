const Participante = require('../model/participante');
const Notas = require('../model/notas')

const Processos = require("../model/processos");
const Etapas = require("../model/etapas");
const ParticipanteProcesso = require("../model/participanteProcesso");

const { Op } = require("sequelize");

module.exports = {
    async pagGruposGet(req, res) {
        try {
            if (!req.session.EDV)
                return res.redirect('/Login')

            const processos = await Processos.findAll({
                raw: true,
                attributes: ["IDProcesso", "Nome", "Data", "NumEtapas"],
            });

            const participantes = await Participante.findAll({
                raw: true,
                attributes: ['IDParticipante', 'Nome']
            });

            const nota = await Notas.findAll({
                raw: true,
                attributes: ['IDNota', 'Nota']
            });

            const etapas = await Etapas.findAll({
                raw: true,
                attributes: ["IDEtapa", "Nome", "Data", "Turno", "IDProcesso"],
            });
            

            const participantesProcessos = await ParticipanteProcesso.findAll({
                raw: true,
                attributes: ["IDParticipante", "IDProcesso", "Status"],
                where: {
                    Status: {
                        [Op.gte]: 1, // Apenas participantes com status maior ou igual a 1
                    },
                },
            });


            const processosComEtapas = processos.map((processo) => {
                const etapasDoProcesso = etapas.filter(
                    (etapa) => etapa.IDProcesso === processo.IDProcesso
                );
                const participantesDoProcesso = participantesProcessos
                    .filter(
                        (participante) => participante.IDProcesso === processo.IDProcesso
                    )
                    .map((participante) => ({
                        ...participante,
                        Nome: participantes.find(
                            (p) => p.IDParticipante === participante.IDParticipante
                        )?.Nome,
                    }));

                return {
                    ...processo,
                    etapas: etapasDoProcesso,
                    participantes: participantesDoProcesso
                };
            });
            res.render('../views/Grupos', { participantes, nota, processosComEtapas, participantesProcessos});
        } catch (error) {
            console.error('Erro ao obter os dados do participante:', error);
            res.render('error', { message: 'Erro ao obter os dados do participante' });
        }
    }
}