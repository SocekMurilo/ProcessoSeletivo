const Participante = require('../model/participante');

module.exports = {
    async pagParticipantesGet(req, res) {
        const participantes = await Participante.findAll({
            raw: true,
            attributes: ['IDParticipante', 'Nome'],
        });

        res.render('../views/participantes', { participantes });
    },
}