const Processos = require('../model/processos');
const Etapas = require('../model/etapas');
const Participante = require('../model/participante');

const { Op } = require('sequelize');

let ultimoIDProcessoAcessado = null;

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
}