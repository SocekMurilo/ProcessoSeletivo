const XLSX = require('xlsx');

const ParticipanteProcesso = require('../model/participanteProcesso');
const Participante = require('../model/participante');


const atualizarProcesso = async (req, res) => {
  try {
    if (!req.session.EDV)
      return res.redirect('/Login')

    const arquivo = req.files.arquivo;
    const workbook = XLSX.read(arquivo.data, { type: 'buffer' });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const dados = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    const IDProcesso = req.params.IDProcesso; // Obtendo o ID do processo a partir dos parâmetros da rota

    // Percorra os dados da planilha e atualize o status dos participantes
    for (const linha of dados.slice(1)) {
      const [Nome, status] = linha;

      // Verifique se o nome do participante está definido
      if (Nome) {
        // Encontre o participante pelo nome e IDProcesso
        const participante = await Participante.findOne({
          where: {
            Nome: Nome
          }
        });

        // Verifique se o participante foi encontrado
        if (participante) {
          // Atualize o status do participante no processo desejado
          await ParticipanteProcesso.update(
            { Status: status },
            { where: { IDParticipante: participante.IDParticipante, IDProcesso: IDProcesso } }
          );
        }
      }
    }

    // Redirecione para a página do processo após a atualização
    res.redirect(`/${IDProcesso}`);
  } catch (error) {
    console.error('Erro ao atualizar o status dos participantes:', error);
    res.render('error', { message: 'Erro ao atualizar o status dos participantes' });
  }
};

module.exports = atualizarProcesso;