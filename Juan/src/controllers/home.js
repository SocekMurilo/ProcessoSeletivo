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

module.exports = {
    async pagInicialGet(req, res){
      try {
        if (ultimoIDProcessoAcessado) {
          // Se o último ID de processo acessado existir, redireciona para ele
          res.redirect(`/${ultimoIDProcessoAcessado}`);
        } else {
          // Caso contrário, obtenha o IDProcesso mais alto
          const highestIDProcesso = await Processos.max('IDProcesso');
          ultimoIDProcessoAcessado = highestIDProcesso;
    
          // Redireciona para o último ID de processo acessado
          res.redirect(`/${ultimoIDProcessoAcessado}`);
        }
      } catch (error) {
        console.error('Erro ao obter o IDProcesso mais alto:', error);
        res.render('error', { message: 'Erro ao obter o IDProcesso mais alto' });
      }
    },

    async indiceIDEtapa(req, res) {
      const { indiceEtapa, idEtapa } = req.body;

      indiceEtapaAtual = indiceEtapa;
      idEtapaAtual = idEtapa;
    },

    async processosGet(req, res) {
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
    },

    async processoGet(req, res) {
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
      try {
        const participantes = await Participante.findAll({
          raw: true,
          attributes: ['IDParticipante', 'Nome']
      });

      const nota = await Notas.findAll({
        raw: true,
        attributes: ['IDNota', 'Nota']
      });
      
      res.render('../views/Grupos', { participantes, nota});
      } catch (error) {
          console.error('Erro ao obter os dados do participante:', error);
          res.render('error', { message: 'Erro ao obter os dados do participante' });
      }
  }
}