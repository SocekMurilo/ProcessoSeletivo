const Processos = require('../model/processos');
const Etapas = require('../model/etapas');
const Participante = require('../model/participante');
const ParticipanteProcesso = require('../model/participanteProcesso');


const { Op } = require('sequelize');

let ultimoIDProcessoAcessado = null;

module.exports = {
    async pagProcessoGet(req, res) {
        const processoID = req.params.IDProcesso;

      ultimoIDProcessoAcessado = processoID;
    
      try {
        const processo = await Processos.findByPk(processoID, {
          raw: true,
          attributes: ['IDProcesso', 'Nome', 'Data', 'NumEtapas'],
        });
      
        const etapas = await Etapas.findAll({
          raw: true,
          attributes: ['IDEtapa', 'Nome', 'Data', 'Turno'],
          where: { IDProcesso: processo.IDProcesso },
        });
    
        if (!processo) {
          return res.render('error', { message: 'Processo não encontrado' });
        }
    
        const participantesProcesso = await ParticipanteProcesso.findAll({
          raw: true,
          attributes: ['IDParticipante', 'IDProcesso', 'Status'],
          where: {
            IDProcesso: processoID,
            Status: {
              [Op.gte]: 1,
            },
          },
        });
    
        const participantesIDs = participantesProcesso.map((participante) => participante.IDParticipante);
    
        const participantes = await Participante.findAll({
          raw: true,
          attributes: ['IDParticipante', 'Nome'],
          where: {
            IDParticipante: {
              [Op.in]: participantesIDs,
            },
          },
        });
    
        const participantesDoProcesso = participantesProcesso.map((participante) => ({
          ...participante,
          Nome: participantes.find((p) => p.IDParticipante === participante.IDParticipante)?.Nome,
        }));
    
        res.render('../views/index.ejs', { processo, participantes: participantesDoProcesso, etapas });
      } catch (error) {
        console.error('Erro ao obter os dados do processo:', error);
        res.render('error', { message: 'Erro ao obter os dados do processo' });
      }
    }
}