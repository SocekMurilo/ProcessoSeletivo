const Participante = require('../model/participante');


module.exports = {
    async pagParticipantesGet(req, res) {
        if (!req.session.EDV)
            return res.redirect('/Login')
        const participantes = await Participante.findAll({
            raw: true,
            attributes: ['IDParticipante', 'Nome'],
        });

        res.render('../views/participantes', { participantes });
    }
}