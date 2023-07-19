// Importe os modelos e os módulos necessários
const Processo = require('../model/processos');
const Etapa = require('../model/etapas');

// Processa a edição do processo
const editarProcesso = async (req, res) => {
  try {
    const processo = await Processo.findByPk(req.params.IDProcesso);

    // Atualize os campos do processo com os dados enviados pelo formulário
    processo.Nome = req.body.nome;
    processo.Data = req.body.data;
    processo.NumEtapas = req.body.etapa;

    // Salve as alterações no processo
    await processo.save();

    const etapas = await Etapa.findAll({ where: { IDProcesso: processo.IDProcesso } });

    // Atualize as etapas existentes com os dados enviados pelo formulário
    for (let i = 0; i < req.body.etapa; i++) {
      const etapa = etapas[i];
      if (etapa) {
        const nomeEtapa = req.body[`etapa${i+1}`];
        etapa.Nome = nomeEtapa;
        await etapa.save();
      }
    }
    
    // Remova as etapas excedentes do banco de dados
    for (let i = req.body.etapa; i < etapas.length; i++) {
      const etapa = etapas[i];
      if (etapa) {
        await etapa.destroy();
      }
    }
    
    // Adicione novas etapas se o número fornecido for maior do que o número de etapas existentes
    if (req.body.etapa > etapas.length) {
      for (let i = etapas.length + 1; i <= req.body.etapa; i++) {
        const nomeEtapa = req.body[`etapa${i}`];
        await Etapa.create({
          IDProcesso: processo.IDProcesso,
          Nome: nomeEtapa,
          Data: processo.Data,
          Turno: processo.IDProcesso
        });
      }
    }

    // Redirecione o usuário para a página de exibição do processo atualizado
    res.redirect(`/${processo.IDProcesso}`);
  } catch (error) {
    console.error('Erro ao editar processo:', error);
    res.render('error', { message: 'Erro ao editar processo' });
  }
};

module.exports = editarProcesso;