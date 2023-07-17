const Participante = require('../model/participante');
const Grupos = require('../model/grupos')


module.exports = {
    async pagGruposGet(req, res) {
        try {
            const participantes = await Participante.findAll({
                raw: true,
                attributes: ['IDParticipante', 'Nome'],
            });

            res.render('../views/Grupos', { participantes });
        } catch (error) {
            console.error('Erro ao obter os dados do participante:', error);
            res.render('error', { message: 'Erro ao obter os dados do participante' });
        }
    }
}