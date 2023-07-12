const Processos = require('../model/processos');
const Etapas = require('../model/etapas');
const Participante = require('../model/participante');
const ParticipanteProcesso = require('../model/participanteProcesso');

module.exports = {
    async pagInicialGet(req, res){
        res.render('../views/index');
    },

    async processosGet(req, res){
        const processos = await Processos.findAll({
            raw: true,
            attributes: ['IDProcesso', 'Nome', 'Data', 'NumEtapas']
        });
        const etapas = await Etapas.findAll({
            raw: true,
            attributes: ['IDEtapa', 'Nome', 'Data', 'Turno', 'IDProcesso'],
        });

        const processosComEtapas = processos.map((processo) => {
            const etapasDoProcesso = etapas.filter((etapa) => etapa.IDProcesso === processo.IDProcesso);
            return { ...processo, etapas: etapasDoProcesso };
        });
        
        res.render('../views/processos', { processosComEtapas });
    },

    async participantesGet(req, res) {
        const participantes = await Participante.findAll({
          raw: true,
          attributes: ['IDParticipante', 'Nome'],
        });
    
        res.render('../views/participantes', { participantes });
      },
    
      async participanteGet(req, res) {
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
      },

    async gruposGet(req, res){
        res.render('../views/grupos');
    }
}