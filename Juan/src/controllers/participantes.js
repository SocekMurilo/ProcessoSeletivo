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
    async pagParticipantesGet(req, res) {
        const participantes = await Participante.findAll({
          raw: true,
          attributes: ['IDParticipante', 'Nome'],
        });
    
        res.render('../views/participantes', { participantes });
    }
}