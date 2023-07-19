const Processos = require('../model/processos');
const Etapas = require('../model/etapas');
const Participante = require('../model/participante');
const ParticipanteProcesso = require('../model/participanteProcesso');
const Grupos = require('../model/grupos');
const Notas = require('../model/notas')


const { Op } = require('sequelize');

let ultimoIDProcessoAcessado = null;
let indiceEtapaAtual = 0;;
let idEtapaAtual;



module.exports = { async pagProcessoGet(req, res) {
    const indiceEtapaAtual = 0;

    const processoID = req.params.IDProcesso;

    const primeiraEtapa  = await Etapas.findOne({
      where: { IDProcesso: processoID },
      order: [['IDEtapa', 'ASC']],
      attributes: ['IDEtapa']
    });

    const idEtapaAtual = primeiraEtapa ? primeiraEtapa.IDEtapa : null;

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
  
      console.log('Índice da etapa atual:', indiceEtapaAtual);
      console.log('ID da etapa atual:', idEtapaAtual);

      res.render('../views/index', { processo, participantes: participantesDoProcesso, etapas, indiceEtapaAtual, idEtapaAtual});
    } catch (error) {
      console.error('Erro ao obter os dados do processo:', error);
      res.render('error', { message: 'Erro ao obter os dados do processo' });
    }
  }
}