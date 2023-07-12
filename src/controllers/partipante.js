const Processos = require('../model/processos');
const Participante = require('../model/participante');
const ParticipanteProcesso = require('../model/participantesProcesso');

module.exports = {
    async pagParticipanteGet(req, res) {
        try {
            const IDParticipante = req.params.IDParticipante;

            const participante = await Participante.findByPk(IDParticipante, {
                raw: true,
                attributes: ['IDParticipante', 'Nome', 'Telefone', 'Nascimento', 'Idade', 'Email', 'Cursos', 'Idiomas', 'Curriculo', 'Video']
            });

            const processosParticipante = await ParticipanteProcesso.findAll({
                raw: true,
                where: { IDParticipante },
                include: [{
                    model: Processos,
                    attributes: ['IDProcesso', 'Nome', 'Data', 'NumEtapas']
                }]
            });

            res.render('../views/participante', { participante, processosParticipante });
        } catch (error) {
            console.error('Erro ao obter os dados do participante:', error);
            res.render('error', { message: 'Erro ao obter os dados do participante' });
        }
    }
}