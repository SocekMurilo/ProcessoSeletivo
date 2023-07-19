const Participante = require('../model/participante');
const Notas = require('../model/notas')

module.exports = {
    async pagGruposGet(req, res) {
        try {
            if (!req.session.EDV)
                return res.redirect('/Login')
            const participantes = await Participante.findAll({
                raw: true,
                attributes: ['IDParticipante', 'Nome']
            });

            const nota = await Notas.findAll({
                raw: true,
                attributes: ['IDNota', 'Nota']
            });

            res.render('../views/Grupos', { participantes, nota });
        } catch (error) {
            console.error('Erro ao obter os dados do participante:', error);
            res.render('error', { message: 'Erro ao obter os dados do participante' });
        }
    }
}