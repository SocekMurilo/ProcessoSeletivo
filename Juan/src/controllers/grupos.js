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
    async pagGruposGet(req, res){
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