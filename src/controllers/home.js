const Processos = require('../model/processos');

let ultimoIDProcessoAcessado = null;

module.exports = {
  async pagInicialGet(req, res) {
    try {
      if (!req.session.EDV)
        return res.redirect('/Login')

      if (ultimoIDProcessoAcessado) {
        // Se o último ID de processo acessado existir, redireciona para ele
        res.redirect(`/${ultimoIDProcessoAcessado}`);
      } else {
        // Caso contrário, obtenha o IDProcesso mais alto
        const highestIDProcesso = await Processos.max('IDProcesso');
        ultimoIDProcessoAcessado = highestIDProcesso;

        if (highestIDProcesso == null){
          res.redirect('/Processos')
        } else {
          res.redirect(`/${ultimoIDProcessoAcessado}`);
        }
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
  }
}